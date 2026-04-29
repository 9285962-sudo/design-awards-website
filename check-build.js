const fs = require('fs');
const html = fs.readFileSync('./website/out/awards.html', 'utf8');

console.log('awards.html 文件大小:', html.length, '字符');
console.log('');

// 检查是否包含某些奖项名称
const awards = ['伦敦国际广告奖', 'AHEAD', 'AZ Awards', 'DNA', 'LIA'];
awards.forEach(name => {
  const found = html.includes(name);
  console.log(`${name}: ${found ? '✓ 存在' : '✗ 不存在'}`);
});

console.log('');
console.log('包含"综合设计":', html.includes('综合设计'));
console.log('包含"建筑设计":', html.includes('建筑设计'));
