const fs = require('fs');
const path = require('path');

// 读取桌面上的新MD文件
const desktopDir = 'C:\\Users\\Administrator\\Desktop';
const files = fs.readdirSync(desktopDir).filter(n => n.includes('大满贯') && n.endsWith('.md'));
const srcPath = path.join(desktopDir, files[0]);
console.log('源文件:', srcPath);
const content = fs.readFileSync(srcPath, 'utf8');

// 解析frontmatter
const parts = content.split('---');
const frontmatter = parts[1].trim();
const body = parts.slice(2).join('---').trim();

// 添加cover字段
const newFrontmatter = frontmatter + '\ncover: /images/articles/ae8b120657984a0c950ff6b24af0014e/cover.webp';

// 组合新内容
const newContent = '---\n' + newFrontmatter + '\n---\n\n' + body;

// 目标路径
const destPath = path.join(__dirname, '..', 'content', 'strategy', '2026-04-27-中国设计大满贯背后四个信号.md');

// 写入文件
fs.writeFileSync(destPath, newContent, 'utf8');
console.log('文件已保存到:', destPath);

// 统计外链图片
const imgRegex = /!\[图片\]\(https:\/\/[^\)]+\)/g;
const imgMatches = body.match(imgRegex) || [];
console.log('外链图片数量:', imgMatches.length);
