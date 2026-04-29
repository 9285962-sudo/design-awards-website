const fs = require('fs');
const src = 'C:/Users/Administrator/Documents/公众号发文';
const files = fs.readdirSync(src);
const art = files.find(f => f.includes('iF奖'));
let content = fs.readFileSync(src + '/' + art, 'utf8');
// 使用无括号的路径
content = content.replace(/C:\\Users\\Administrator\\Desktop\\640 \(1\)\.webp/g, '/images/img-if-1.webp');
content = content.replace(/C:\\Users\\Administrator\\Desktop\\640 \(2\)\.webp/g, '/images/img-if-2.webp');
const target = 'website/content/articles/' + art;
fs.writeFileSync(target, content);
console.log('Done!');