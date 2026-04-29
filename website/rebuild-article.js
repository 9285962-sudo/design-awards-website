const fs = require('fs');
const path = require('path');

const articlesDir = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/content/articles';
const outDir = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/out/articles';

// 1. 重新生成
require('child_process').execSync('node scripts/build-articles.js', { cwd: 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website' });

// 2. 删除旧的带引号的 HTML
const files = fs.readdirSync(outDir);
files.forEach(f => {
  if (f.includes('\u201c') || f.includes('\u201d') || f.includes('"')) {
    fs.unlinkSync(path.join(outDir, f));
    console.log('Deleted old HTML:', f);
  }
});

console.log('Done! New files:');
fs.readdirSync(outDir).filter(f => f.includes('中国') || f.includes('对标')).forEach(f => console.log(f));
