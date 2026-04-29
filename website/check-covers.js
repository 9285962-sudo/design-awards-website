const d=require('./data/articles.json');
const remaining=d.articles.filter(a=>a.cover&&a.cover.includes('mmbiz'));
console.log('剩余公众号封面:', remaining.length);
remaining.forEach(a=>console.log(a.title.substring(0,30)));
