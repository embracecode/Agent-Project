const OpenAI = require('openai');
const { apiKey, systemContent } = require('../config/default').aliyun;

const Validate = require('../validate/index');

const tools = require('../config/tools')

const { formatTrainResultToMarkdown, handleChatStream } = require('../utils/formatter');

const typeFunction = require('../config/toolsFunctions');
const openai = new OpenAI(
    {
        // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
        apiKey,
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
);




class ChatController {
    // 对话流式输出
    async chatMessage(ctx) {
        const { chatMessage } = ctx.request.body
        // 校验
        await Validate.isArrayCheck(chatMessage, 'chatMessage字段不能为空', 'chatMessage');


        let messages = [
            { 
                role: "system", content: systemContent,
            },
            ...chatMessage
        ]
        const res = ctx.res; 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 【关键技巧】立即写入一个空行或注释，强制 Node.js 发送 Headers 到客户端
        // 这能确保后续的 write 不会被缓冲等待 headers
        res.write(': connected\n\n'); 

        // 【核心逻辑】循环处理，直到不再产生工具调用为止
        // 防止死循环，设置最大递归次数
        let maxIterations = 5; 
        let iterationCount = 0;
        let hasToolCall = true;

        try {
            mainLoop: while (hasToolCall && iterationCount < maxIterations) {
                iterationCount++;
                hasToolCall = false; // 假设本次没有工具调用，除非检测到

                console.log(`[第 ${iterationCount} 轮] 开始请求 AI...`);
                console.log(messages, 'message------------');
                // 1. 生成 ChatCompletion
                const completion = await openai.chat.completions.create({
                    model: "qwen-plus",
                    messages,
                    tools,
                    stream: true
                });
                // 用于累积流式数据的变量
                const toolCallsMap = new Map(); // 使用 Map 按 index 存储，防止乱序
                // 2. 用于累积普通文本回复的变量
                let fullTextResponse = "";
                // 流式输出 不用这个
                // console.log(JSON.stringify(completion))
                for await (const chunk of completion) {
                    const delta = chunk.choices[0]?.delta
                    if (delta?.content) {
                        console.log(`delta.content`,delta.content);
                        // 构造 SSE 格式
                        const sseData = `data: ${JSON.stringify({ choices: [{ delta: { content: delta.content } }] })}\n\n`;
                        
                        // 【关键】直接写入原生流，不要用 ctx.body
                        const canContinue = res.write(sseData);
                        if (!canContinue) {
                            await new Promise(resolve => res.once('drain', resolve));
                        }

                    }
                    // 检查是否有 tool_calls
                    if (delta?.tool_calls) {
                        hasToolCall = true; // 标记本轮有工具调用
                        for (const toolCallChunk of delta.tool_calls) {
                            const index = toolCallChunk.index;
                            
                            // 初始化该位置的 tool_call 对象（如果不存在）
                            if (!toolCallsMap.has(index)) {
                                toolCallsMap.set(index, {
                                    id: toolCallChunk.id || "",
                                    name: toolCallChunk.function?.name || "",
                                    arguments: "", // 初始化为空字符串
                                });
                            }

                            const currentToolCall = toolCallsMap.get(index);

                            // 更新 ID (通常在第一个包里有)
                            if (toolCallChunk.id) {
                                currentToolCall.id = toolCallChunk.id;
                            }

                            // 更新函数名 (通常在早期包里有)
                            if (toolCallChunk.function?.name) {
                                currentToolCall.name = toolCallChunk.function.name;
                            }

                            // 【关键步骤】累加参数字符串
                            if (toolCallChunk.function?.arguments) {
                                currentToolCall.arguments += toolCallChunk.function.arguments;
                            }
                        }
                    }
                }
                // 流式结束后，处理累积的数据
                if (hasToolCall) {
                    const finalToolCalls = [];
                    for (const [, toolCall] of toolCallsMap) {
                        try {
                            // 将拼接好的字符串解析为 JSON 对象
                            const parsedArguments = JSON.parse(toolCall.arguments);
                            
                            finalToolCalls.push({
                                id: toolCall.id,
                                name: toolCall.name,
                                arguments: parsedArguments, // 这里就是你想要的完整参数对象
                            });
                            
                            console.log(`获取到工具调用: ${toolCall.name}`);
                            console.log(`参数对象:`, parsedArguments);
                            // 输出示例: { location: "杭州" }
                            
                        } catch (e) {
                            console.error("解析参数失败:", e, "原始字符串:", toolCall.arguments);
                        }
                    }

                    // 现在你可以使用 finalToolCalls 进行后续逻辑了
                    if (finalToolCalls.length > 0) {

                        for (const call of finalToolCalls) {
                            console.log(`执行工具: ${call.name}`, call.arguments);
                            // 调用你的业务逻辑函数
                            const result = await typeFunction(call.name, call.arguments);
                            console.log('工具返回结果:', result);
                            // 3. 将工具结果作为 "tool" 角色追加到消息历史中

                            
                            // 1. 构造 assistant 消息 (修复 content: null 问题)
                            const assistantMessage = {
                                role: "assistant",
                                content: "", // 【关键】必须是空字符串，不能是 null
                                tool_calls: [{
                                    id: call.id,
                                    type: "function", // 显式指定类型
                                    function: {
                                        name: call.name,
                                        arguments: JSON.stringify(call.arguments)
                                    }
                                }]
                            };

                            // 2. 构造 tool 消息
                            const toolMessage = {
                                role: "tool",
                                content: typeof result === 'string' ? result : JSON.stringify(result),
                                tool_call_id: call.id
                            };

                            // 3. 推送到历史
                            messages.push(assistantMessage);
                            messages.push(toolMessage);
                            // 【关键】因为添加了 tool 结果，需要再次进入 while 循环
                            // 让模型基于这个 result 生成最终的自然语言回复
                            console.log("--- 准备进行下一轮递归以生成最终回复 ---");
                            continue mainLoop;

                        }
                    }
                }
                break;
            }
            // 5. 发送结束标记
            res.write('data: [DONE]\n\n');
            res.end();
            console.log("✅ 响应流已关闭");
        } catch(error) {
            console.error("❌ 发生错误:", error);
            // 如果还没发送 headers，可以发个 JSON 错误；如果已经发了，只能发 SSE 错误
            if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message }));
            } else {
                res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
                res.end();
            }
        }
    }
}
module.exports = new ChatController();