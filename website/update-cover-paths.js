const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));

let updated = 0;
data.articles.forEach(article => {
  if (article.cover && article.cover.includes('/images/articles/covers/cover_')) {
    // 替换 .jpg 为 .png
    article.cover = article.cover.replace('.jpg', '.png');
    console.log(`更新: ${article.title.substring(0, 25)} -> ${article.cover}`);
    updated++;
  }
});

console.log(`\n共更新 ${updated} 篇文章的封面图路径`);
fs.writeFileSync('./data/articles.json', JSON.stringify(data, null, 2));
console.log('articles.json 已保存');
