// utils/formatter.js (或者直接在路由文件中)

/**
 * 通用函数：将列车查询结果转换为 Markdown 表格
 * @param {Object} data - 工具返回的原始 JSON 数据
 * @returns {string} - 格式化后的 Markdown 字符串
 */
function formatTrainResultToMarkdown(data) {
    if (!data.success || !data.trains || data.trains.length === 0) {
        return "❌ 未查询到相关车次信息，请尝试更换日期或出发地。";
    }

    const { from, to, date } = data.query_info;
    const trains = data.trains;

    // 1. 动态构建标题
    let markdown = `### 🚄 ${from} -> ${to} (${date}) 车次查询结果\n\n`;
    markdown += `共找到 **${data.total_count}** 趟列车，以下是详细信息：\n\n`;

    // 2. 定义我们想展示的列 (可以根据实际需求动态调整)
    // 这里我们手动定义表头，因为 JSON 结构是固定的，但内容动态
    const headers = ["车次", "出发站", "到达站", "出发时间", "到达时间", "耗时", "二等座", "一等座", "商务座"];
    
    // 3. 构建表格头部
    markdown += `| ${headers.join(" | ")} |\n`;
    markdown += `| ${headers.map(() => "---").join(" | ")} |\n`;

    // 4. 动态构建每一行数据
    trains.forEach(train => {
        // 辅助函数：处理座位信息，有票显示价格，无票显示状态
        const getSeatInfo = (seatType) => {
            const info = train.seats[seatType];
            if (!info) return "-";
            if (info.status === "有票" || info.status === "余票紧张") {
                return `¥${info.price} (${info.status === '余票紧张' ? '🔥' : '✅'})`;
            }
            return `❌ ${info.status}`;
        };

        const row = [
            `**${train.train_number}**`, // 车次加粗
            train.station_from,
            train.station_to,
            train.departure_time,
            train.arrival_time,
            train.duration,
            getSeatInfo('second_class'),
            getSeatInfo('first_class'),
            getSeatInfo('business')
        ];

        // 确保行数据中的管道符 | 被转义，防止破坏表格格式 (虽然车次时间通常不会有，但为了健壮性)
        const safeRow = row.map(cell => cell.replace(/\|/g, '\\|'));
        
        markdown += `| ${safeRow.join(" | ")} |\n`;
    });

    // 5. 添加底部提示
    markdown += `\n> 💡 **温馨提示**：以上票价和余票信息仅供参考，具体以 12306 官网实时数据为准。点击车次可查看详情。`;

    return markdown;
}

// --- 在你的流式响应逻辑中调用 ---

async function handleChatStream(req, res) {
    // ... 前面的逻辑 (调用 LLM, 检测 tool_calls) ...

    // 假设这里是拿到 tool 执行结果后的逻辑
    if (message.role === 'tool') {
        const toolData = JSON.parse(message.content); // 解析工具返回的 JSON
        
        // 【关键】调用通用函数生成 Markdown
        const markdownContent = formatTrainResultToMarkdown(toolData);

        // 将生成的 Markdown 分块流式发送 (模拟打字机效果)
        // 注意：这里不要一次性 res.write 整个字符串，否则前端没有打字机效果
        const chunkSize = 30; // 每次发送的字符数
        for (let i = 0; i < markdownContent.length; i += chunkSize) {
            const chunk = markdownContent.slice(i, i + chunkSize);
            
            const sseData = `data: ${JSON.stringify({ 
                choices: [{ 
                    delta: { content: chunk } 
                }] 
            })}\n\n`;
            
            const canContinue = res.write(sseData);
            if (!canContinue) {
                await new Promise(resolve => res.once('drain', resolve));
            }
            
            // 可选：添加微小延迟让效果更自然
            // await new Promise(r => setTimeout(r, 10)); 
        }
        
        // 发送结束标记
        res.write(`data: [DONE]\n\n`);
        res.end();
        return;
    }
}

module.exports = {
    formatTrainResultToMarkdown,
    handleChatStream
}