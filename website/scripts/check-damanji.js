const path = require('path');
const j = require(path.join(__dirname, '..', 'data', 'strategy.json'));
const a = j.articles.find(x => x.title.includes('大满贯'));
console.log('封面:', a.cover);
const imgMatches = a.content.match(/<img/g) || [];
console.log('正文图片数量:', imgMatches.length);
console.log('--- 前500字符 ---');
console.log(a.content.substring(0, 500));
