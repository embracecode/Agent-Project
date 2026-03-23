const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // 用于生成随机字符串


// 定义本地保存目录
const IMAGES_DIR = path.join(__dirname, 'images');

/**
 * 生成随机字符串作为文件名
 */
function generateRandomFileName(extension = 'png') {
    const randomStr = crypto.randomBytes(16).toString('hex'); // 生成32位随机十六进制字符串
    const timestamp = Date.now();
    return `${randomStr.slice(0, 10)}.${extension}`;
}
/**
 * 确保 images 文件夹存在
 */
function ensureImagesDir() {
    if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
        console.log(`📁 已创建目录: ${IMAGES_DIR}`);
    }
}

module.exports = { generateRandomFileName, ensureImagesDir, IMAGES_DIR };