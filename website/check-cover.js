const fs = require('fs');
const html = fs.readFileSync('public/articles/2026-04-23-设计师最容易自我感动的3个瞬间.html', 'utf8');
// 找到所有 src 属性
const matches = html.match(/src="([^"]+)"/g);
console.log('All src attributes:');
matches && matches.forEach(m => console.log(m));
// 找到 img 标签
const imgMatch = html.match(/<img[^>]*class="article-cover"[^>]*>/);
console.log('\nArticle cover img:', imgMatch ? imgMatch[0] : 'not found');
