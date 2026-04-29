const fs = require('fs');
const path = require('path');

// 读取原始文章
const src = 'C:/Users/Administrator/Documents/公众号发文';
const files = fs.readdirSync(src);
const art = files.find(f => f.includes('iF奖'));
let content = fs.readFileSync(src + '/' + art, 'utf8');

// 替换本地路径为网站相对路径
content = content.replace(/C:\\Users\\Administrator\\Desktop\\640 \(1\)\.webp/g, '/images/640 (1).webp');
content = content.replace(/C:\\Users\\Administrator\\Desktop\\640 \(2\)\.webp/g, '/images/640 (2).webp');

// 写入项目目录
const target = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/content/articles/' + art;
fs.writeFileSync(target, content);

console.log('Done!');
console.log('Images:', content.match(/!\[.*?\]\(.*?\)/g));