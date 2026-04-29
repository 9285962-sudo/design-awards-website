const d = require('./data/news.json');
const a = d.articles.find(x => x.title.includes('对标'));
const c = a.cover;
console.log('cover:', c);
for (let i = 0; i < c.length; i++) {
  const code = c.charCodeAt(i);
  if (code === 34 || code > 8000) {
    console.log(i, code, JSON.stringify(c[i]));
  }
}
