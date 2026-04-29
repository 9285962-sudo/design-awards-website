const fs = require('fs');
const path = require('path');

const imgDir = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/public/images';
const dirs = fs.readdirSync(imgDir);

// 找到包含双引号的目录
const target = dirs.find(d => d.includes('"'));
console.log('Found target dir:', target);

if (target) {
  const oldPath = path.join(imgDir, target);
  const newName = target.replace(/"/g, '');
  const newPath = path.join(imgDir, newName);
  
  fs.renameSync(oldPath, newPath);
  console.log('Renamed to:', newName);
  
  // 同时更新 news.json 中的路径
  const newsPath = 'C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/news.json';
  const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  news.articles.forEach(a => {
    if (a.cover && a.cover.includes('"')) {
      a.cover = a.cover.replace(/"/g, '');
      console.log('Updated cover:', a.title.substring(0, 20));
    }
  });
  fs.writeFileSync(newsPath, JSON.stringify(news, null, 2));
  console.log('news.json updated');
}
