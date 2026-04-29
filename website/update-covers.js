// ================================
// ⚠️ 此脚本已禁用
// 微信图片有CDN加速，直接使用原URL更可靠
// 如需启用替换逻辑，请删除此文件并重新创建
// ================================

// const fs = require('fs');

// const data = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));

// // 定义封面图映射
// const coverMap = [
//   {pattern: 'sz_mmbiz_jpg/...', localPath: '/images/articles/covers/cover_1.jpg'},
//   {pattern: 'sz_mmbiz_png/...', localPath: '/images/articles/covers/cover_4.png'},
// ];

// let updated = 0;
// data.articles.forEach(article => {
//   if (article.cover && article.cover.includes('mmbiz.qpic.cn')) {
//     let newCover = article.cover;
//     coverMap.forEach(m => {
//       if (article.cover.includes(m.pattern)) {
//         newCover = m.localPath;
//       }
//     });
//     if (newCover !== article.cover) {
//       console.log('更新: ' + article.title.substring(0, 25) + ' -> ' + newCover);
//       article.cover = newCover;
//       updated++;
//     }
//   }
// });

// console.log('\n共更新 ' + updated + ' 篇文章的封面图');
// fs.writeFileSync('./data/articles.json', JSON.stringify(data, null, 2));
// console.log('articles.json 已保存');
