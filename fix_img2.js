const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/content/articles';
const files = fs.readdirSync(dir);
const target = files.find(f => f.includes('iF奖'));

const fullPath = path.join(dir, target);
let content = fs.readFileSync(fullPath, 'utf8');

const lines = content.split('\n');
const fixed = [];
let imgCount = 1;
let skipNext = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line === '![]( ' && !skipNext) {
    // 替换为正确的图片标签
    fixed.push(`### ![](/images/640 (${imgCount}).webp)`);
    imgCount++;
    // 跳过下一行空行
    skipNext = true;
    continue;
  }
  if (skipNext) {
    skipNext = false;
    continue;
  }
  // 跳过已经是空行或者单独的 ![](
  if (line === '![]( ' || line.trim() === '') {
    continue;
  }
  fixed.push(line);
}

const result = fixed.join('\n');
fs.writeFileSync(fullPath, result);
console.log('Done!');
console.log('Images:', result.match(/!\[\]\(\/images/g));