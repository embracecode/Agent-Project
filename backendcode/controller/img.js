const OpenAI = require('openai');
const { apiKey, systemContent } = require('../config/default').aliyun;

const openai = new OpenAI(
    {
        // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
        apiKey,
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
);

class imgController {
    async upload(ctx) {
        const response = await openai.chat.completions.create({
            model: "qwen3.5-plus",  // 此处以qwen3.5-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/models
            messages: [
                {
                    role: "user",
                    content: [{
                        type: "image_url",
                        image_url: {
                            "url": "https://qcloud.dpfile.com/pc/_LZ9lVLS1bkRbFEf7Y3hYy3VI12fvdcRkWnobSWNCyIDArrUn4DxRhE1TKOijrP5.jpg"
                        }
                    },
                    {
                        type: "text",
                        text: "这是哪里，图中描绘的是什么景象?"
                    }]
                }
            ],
            stream: true,
            // 目的：在最后一个chunk中获取本次请求的Token用量。
            stream_options: { include_usage: true },
        });
        // 3. 处理流式响应
        const contentParts = [];
        process.stdout.write("AI: ");
        
        for await (const chunk of response) {
            // 最后一个chunk不包含choices，但包含usage信息。
            if (chunk.choices && chunk.choices.length > 0) {
                const content = chunk.choices[0]?.delta?.content || "";
                process.stdout.write(content);
                contentParts.push(content);
            } else if (chunk.usage) {
                // 请求结束，打印Token用量。
                console.log("\n--- 请求用量 ---");
                console.log(`输入 Tokens: ${chunk.usage.prompt_tokens}`);
                console.log(`输出 Tokens: ${chunk.usage.completion_tokens}`);
                console.log(`总计 Tokens: ${chunk.usage.total_tokens}`);
            }
        }
        const fullResponse = contentParts.join("");
        // console.log(`\n--- 完整回复 ---\n${fullResponse}`);
    }
}

module.exports = new imgController();