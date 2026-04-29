var fs = require('fs');
var dir = 'c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/奖项数据/_scrape_raw';
var files = fs.readdirSync(dir).filter(function(f) { return f.endsWith('_deep.json'); });
var results = [];
files.forEach(function(f) {
  var d = JSON.parse(fs.readFileSync(dir + '/' + f, 'utf-8'));
  var totalLen = 0;
  var pageCount = 0;
  if (d.pages && typeof d.pages === 'object') {
    pageCount = Object.keys(d.pages).length;
    Object.values(d.pages).forEach(function(p) { totalLen += (p.text || '').length; });
  }
  results.push({file: f, pages: pageCount, chars: totalLen});
});
results.sort(function(a, b) { return b.chars - a.chars; });
console.log('Top 20 by text length:');
results.slice(0, 20).forEach(function(r, i) {
  console.log((i+1) + '. ' + r.file + ' | ' + r.pages + ' pages | ' + r.chars + ' chars');
});
