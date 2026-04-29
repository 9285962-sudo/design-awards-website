const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/content/articles';
const files = fs.readdirSync(dir);
const target = files.find(f => f.includes('iF奖'));

if (!target) {
  console.log('File not found');
  process.exit(1);
}

const fullPath = path.join(dir, target);
let content = fs.readFileSync(fullPath, 'utf8');

// 替换破碎的图片标签为正确的格式
content = content.replace(/\!\[\]\(\n([\s\S]*?)###\s+/g, '### ![](/images/640 (1).webp)\n### ');
content = content.replace(/\!\[\]\(\n([\s\S]*?)$/gm, '### ![](/images/640 (2).webp)');

fs.writeFileSync(fullPath, content);
console.log('Fixed! File:', target);
console.log('Images:', content.match(/!\[\]\(\/images/g));