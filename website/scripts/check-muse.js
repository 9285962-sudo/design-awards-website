const path = require('path');
const j = require(path.join(__dirname, '..', 'data', 'news.json'));
const a = j.articles.find(x => x.title.includes('缪斯') || x.title.includes('MUSE'));
console.log('文章:', a.title);
console.log('封面:', a.cover);
const imgRegex = /src="([^"]+)"/g;
const imgs = [];
let m;
while ((m = imgRegex.exec(a.content)) !== null) {
  imgs.push(m[1]);
}
console.log('正文图片数量:', imgs.length);
console.log('--- 图片URL ---');
imgs.slice(0, 5).forEach((url, i) => console.log(i+1, url));
