const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./website/data/awards.json', 'utf8'));

console.log('总奖项数:', data.length);
console.log('');
console.log('category_main分布:');
const dist = {};
data.forEach(a => {
  dist[a.category_main] = (dist[a.category_main] || 0) + 1;
});
Object.entries(dist).forEach(([k,v]) => console.log(' ', k, ':', v));

console.log('');
console.log('前5个奖项:');
data.slice(0, 5).forEach(a => console.log(' -', a.award_name_cn, '|', a.category_main));

console.log('');
console.log('综合设计类奖项:');
data.filter(a => a.category_main === '综合设计').slice(0, 10).forEach(a => console.log(' -', a.award_name_cn));
