const path = require('path');
const fs = require('fs');
const { generateRandomFileName, ensureImagesDir, IMAGES_DIR } = require('../utils/fs');
const { apiKey, systemContent } = require('../config/default').aliyun;
const URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';



async function generateImageDirect(ctx) {
    ensureImagesDir(); // 确保保存图片的目录存在
    const payload = {
        model: 'wan2.6-t2i', // 确认可用的模型
        input: {
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "text": ctx.request.body.text
                        }
                    ]
                }
            ]
        },
        "parameters": {
            "prompt_extend": true,
            "watermark": false,
            "n": 1,
            "negative_prompt": "",
            "size": "1280*1280"
        }
    };

    console.log('正在调用万相 (Wanx) 专属接口...');
    console.log('模型:', payload.model);

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error('❌ HTTP 错误:', response.status);
            console.error('❌ 详细报错:', responseText);
            throw new Error(`API 调用失败: ${response.status}`);
        }

        const data = JSON.parse(responseText);

        // 解析返回结果
        if (data?.output?.choices?.length > 0) {
            const imgUrl = data.output.choices[0].message.content[0];
            console.log('✅ 生成成功!');
            console.log('🖼️ 图片 URL:', imgUrl.image);
            const imageResponse = await fetch(imgUrl.image);
            if (!imageResponse.ok) {
                throw new Error('Failed to download the generated image');
            }
            // 2. 【关键修正】使用 .arrayBuffer() 获取二进制数据
            const arrayBuffer = await imageResponse.arrayBuffer();
            
            // 3. 将 ArrayBuffer 转换为 Node.js 的 Buffer
            const imageBuffer = Buffer.from(arrayBuffer);
            const fileName = generateRandomFileName('png');
            const filePath = path.join(IMAGES_DIR, fileName);

            fs.writeFileSync(filePath, imageBuffer);

            console.log(`📂 文件路径: ${filePath}`);
            console.log(`🔗 相对路径: ./images/${fileName}`);
            // await previewImageInNode(imageBuffer); // 在 Node.js 环境中预览图片
            console.log('✅ 图片已成功下载并返回给前端');
            return `/${fileName}`;
        } else {
            console.error('⚠️ 接口返回成功但无图片数据:', data);
            throw new Error('生成成功但未返回图片链接');
        }

    } catch (error) {
        console.error('💥 发生异常:', error.message);
    }
}





class textgenimgController {
    async textgenimg(ctx) {
        console.log('收到文本生图请求', ctx.request.body);
        try {
            const imagePath = await generateImageDirect(ctx);
            // 打印结果
            ctx.body = { imagePath: `http://localhost:3000${imagePath}` };
            console.log('返回给前端的图片路径:', imagePath);
        } catch (error) {
            console.error('调用失败:', error.message);
            if (error.response) {
                console.error('错误详情:', error.response.data);
            }
        }

    }
}

module.exports = new textgenimgController();