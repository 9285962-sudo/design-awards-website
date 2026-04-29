const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'out', 'articles', '2026-04-27-MUSE设计奖第一季获奖名单公布.html'), 'utf8');

const imgRegex = /src="([^"]+)"/g;
const imgs = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  imgs.push(m[1]);
}

console.log('HTML中的图片数量:', imgs.length);
imgs.forEach((url, i) => console.log(i + 1, url));
