const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/articles.json', 'utf8'));

// 定义封面图映射（根据文章标题关键字匹配）
const coverMap = [
  { keywords: ['中国设计', '大满贯'], localPath: '/images/articles/covers/cover_1.jpg' },
  { keywords: ['缪斯', 'MUSE'], localPath: '/images/articles/MUSE设计奖/img5.jpg' },
  { keywords: ['南沙邮轮码头'], localPath: '/images/articles/covers/cover_3.jpg' },
  { keywords: ['小红书', '20.4亿', '居住趋势', '适我'], localPath: '/images/articles/covers/cover_2.jpg' },
  { keywords: ['把床放在客厅', '小红书里'], localPath: '/images/articles/covers/cover_4.png' },
  { keywords: ['那些看起来不惊艳'], localPath: '/images/articles/那些看起来不惊艳的设计，为什么反而拿走了最高奖？/xbox-adaptive-controller.jpg' },
  { keywords: ['设计公司', '真正的竞争力'], localPath: '/images/articles/covers/cover_5.jpg' },
  { keywords: ['自我感动', '设计师最容易'], localPath: '/images/articles/covers/cover_6.jpg' },
  { keywords: ['三大奖', '进化', '评审逻辑'], localPath: '/images/articles/covers/cover_7.jpg' },
  { keywords: ['本土国际大奖', '对标红点'], localPath: '/images/articles/covers/cover_8.jpg' },
  { keywords: ['iF排名', '被排名', '游戏规则'], localPath: '/images/articles/covers/cover_9.jpg' },
  { keywords: ['不再奖励好看', '好看'], localPath: '/images/articles/为什么越来越多国际设计大奖不再奖励好看/Transformation_of_G__H__I_Buildings__Grand_Parc_1_Photo_courtesy_of_Philippe_Ruault.jpg' },
  { keywords: ['iF奖凭什么', '齿边胶带', '凭什么拿iF'], localPath: '/images/articles/covers/cover_10.jpg' },
  { keywords: ['设计新势力', '高校师生'], localPath: '/images/articles/covers/cover_11.jpg' },
  { keywords: ['绿色设计指南', '环境影响', '80%'], localPath: '/images/articles/covers/cover_12.jpg' },
];

let updated = 0;
data.articles.forEach(article => {
  if (article.cover && article.cover.includes('mmbiz.qpic.cn')) {
    let newCover = article.cover;
    for (const m of coverMap) {
      if (m.keywords.some(kw => article.title.includes(kw))) {
        newCover = m.localPath;
        break;
      }
    }
    if (newCover !== article.cover) {
      console.log('更新: ' + article.title.substring(0, 30) + ' -> ' + newCover);
      article.cover = newCover;
      updated++;
    }
  }
});

console.log('\n共更新 ' + updated + ' 篇文章的封面图');
fs.writeFileSync('./data/articles.json', JSON.stringify(data, null, 2));
console.log('articles.json 已保存');
