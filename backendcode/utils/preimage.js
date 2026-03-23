const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // 用于执行系统命令
const os = require('os');

// ... 在你获取到 imageBuffer 之后 ...

async function previewImageInNode(imageBuffer) {
    // 1. 定义一个临时文件路径
    const tempDir = os.tmpdir(); // 获取系统临时目录
    const fileName = `preview_${Date.now()}.png`;
    const filePath = path.join(tempDir, fileName);

    try {
        // 2. 将 Buffer 写入临时文件
        fs.writeFileSync(filePath, imageBuffer);
        console.log(`✅ 图片已保存到临时文件: ${filePath}`);

        // 3. 根据操作系统调用默认查看器打开
        let command;
        const platform = os.platform();

        if (platform === 'win32') {
            // Windows: 使用 start 命令
            command = `start "" "${filePath}"`;
        } else if (platform === 'darwin') {
            // macOS: 使用 open 命令
            command = `open "${filePath}"`;
        } else {
            // Linux: 尝试使用 xdg-open (大多数桌面环境通用)
            command = `xdg-open "${filePath}"`;
        }

        console.log(`🖼️ 正在调用系统默认查看器打开图片...`);
        
        exec(command, (error) => {
            if (error) {
                console.error(`❌ 打开图片失败: ${error.message}`);
                console.log(`💡 请手动打开文件查看: ${filePath}`);
            } else {
                console.log('✅ 图片查看器已启动');
                // 可选：几秒后自动删除临时文件，避免堆积
                setTimeout(() => {
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('删除临时文件失败', err);
                    });
                }, 5000); 
            }
        });

    } catch (err) {
        console.error('💥 保存或打开图片时发生错误:', err.message);
    }
}

exports.previewImageInNode = previewImageInNode;
// 在你的主逻辑中调用：
// await previewImageInNode(imageBuffer);