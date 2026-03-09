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
                }
                ]
            }
            ]
        });
        ctx.body = response.choices[0].message;
    }
}

module.exports = new imgController();