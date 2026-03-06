/**
 * 调用聊天接口并处理流式响应
 * @param {Array} messages - 对话历史消息数组
 * @param {Function} onChunk - 收到每个文本片段时的回调（用于打字机效果）
 * @param {Function} onComplete - 流式结束时的回调（可选，用于获取完整回复或状态）
 */

export interface MessageType {
  role: string;
  content: string;
}


export async function streamChat(messages: MessageType[], onChunk: (...args: any) => void, onComplete:(...args: any) => void) {
  try {
    const response = await fetch('http://127.0.0.1:3000/chatmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatMessage: messages }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取读取器
    const reader = (response.body!).getReader();
    const decoder = new TextDecoder('utf-8');
    
    let buffer = ''; // 用于处理粘包（一个 chunk 里可能有多行数据）
    let fullText = ''; // 累积完整回复
    let isToolResultMode = false; // 标记是否正在处理工具结果
    let toolJsonBuffer = ''; // 专门用于拼接可能被打散的 JSON 字符串

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
          // 处理最后剩余的缓冲
          if (toolJsonBuffer && isToolResultMode) {
              processToolResult(toolJsonBuffer, onChunk);
          }
          if (onComplete) onComplete(fullText, done);
          break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; 

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith(':')) continue;
        if (trimmedLine === 'data: [DONE]') {
            if (toolJsonBuffer && isToolResultMode) processToolResult(toolJsonBuffer, onChunk);
            if (onComplete) onComplete(fullText);
            return;
        }

        if (trimmedLine.startsWith('data: ')) {
          const jsonStr = trimmedLine.slice(6);
          try {
            const data = JSON.parse(jsonStr);
            const content = data.choices?.[0]?.delta?.content;
            
            if (content) {
              // 【核心逻辑】检测是否进入了工具结果模式
              // 假设工具返回的 JSON 总是以 {"success": 开头
              if (!isToolResultMode && content.includes('{"success":')) {
                  isToolResultMode = true;
                  // 如果 content 只是 JSON 的一部分（流式截断），先存入 buffer
                  toolJsonBuffer = content; 
                  // 此时不直接 onChunk(content)，因为那是乱码
              } else if (isToolResultMode) {
                  // 继续拼接 JSON
                  toolJsonBuffer += content;
                  
                  // 尝试解析看看是否完整 (简单的判断：以 } 结尾且能 parse)
                  // 注意：流式传输中 JSON 可能被切分在多个 chunk 里，需要更严谨的判断
                  // 这里简化处理：假设后端一次性发完了 JSON，或者我们等到流结束再处理
                  // 更好的方式是：后端不要流式发 JSON，而是一次性发格式化后的文本（回到方案一）
                  
                  // 如果确定后端是把整个 JSON 拆散了发的，这里很难完美实时渲染表格
                  // 建议：如果是这种情况，只能在 onComplete 时统一处理，或者强制要求后端改方案一
              } else {
                  // 普通文本模式
                  fullText += content;
                  onChunk(content);
              }
            }
          } catch (e) {
            console.error('解析流数据失败:', e);
          }
        }
      } 
    }
    // 辅助函数：将 JSON 转为 Markdown 表格并输出
    function processToolResult(jsonStr: string, callback: (...args: any) => void) {
        try {
            // 清理可能存在的多余字符，确保是合法 JSON
            // 如果流式导致 JSON 不完整，这里会报错，需要更复杂的缓冲逻辑
            const data = JSON.parse(jsonStr); 
            
            if (data.success && data.trains) {
                let md = `\n### 🚄 车次查询结果\n\n`;
                md += `| 车次 | 时间 | 耗时 | 二等座 |\n|---|---|---|---|\n`;
                data.trains.forEach((t: any) => {
                    md += `| ${t.train_number} | ${t.departure_time}-${t.arrival_time} | ${t.duration} | ¥${t.seats.second_class.price} |\n`;
                });
                md += `\n`;
                // 将格式化好的 Markdown 一次性推给 UI
                callback(md); 
                fullText += md; // 更新全文本用于后续可能的上下文
                isToolResultMode = false;
                toolJsonBuffer = '';
            }
        } catch (e) {
            console.warn("JSON 尚未完整或解析失败，等待后续流...", e);
            // 如果是因为流没结束导致的解析失败，这里暂时不处理，等 done 时再试
        }
    }
   } catch (error: any) {
    console.error('聊天请求失败:', error);
    // 错误处理：可以在 UI 上显示错误提示
    onChunk(`\n[系统错误: ${error.message}]`);
    if (onComplete) onComplete(null, error);
  }
}

