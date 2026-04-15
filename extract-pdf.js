const fs = require('fs');

// 直接读取二进制文件
const src = 'C:/Users/Administrator/Documents/国际奖项报奖服务介绍（2025-10-28版）.pdf';
const data = fs.readFileSync(src);

console.log('文件大小:', data.length);

// 尝试提取文本
// 使用简单的模式匹配来找到文本内容
const str = data.toString('latin1');
const matches = str.match(/\(([^\)]+)\)/g);

if (matches) {
    console.log('找到文本片段:', matches.length);
    let text = '';
    for (const m of matches.slice(0, 100)) {
        const clean = m.slice(1, -1);
        // 只保留可打印字符
        if (/^[\x20-\x7E]+$/.test(clean) && clean.length > 3) {
            text += clean + ' ';
        }
    }
    console.log('\n提取的文本:');
    console.log(text);
} else {
    console.log('未找到文本内容（可能是扫描版）');
}
