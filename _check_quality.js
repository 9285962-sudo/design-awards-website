var d = require('./website/data/award-details.json');
// 只看新增的条目（跳过前6个手写的），抽查几个看内容质量
var samples = ['dna巴黎设计奖_2026', 'award_49_2026', 'fx国际设计奖_2026', 'win_awards_2026', '世界建筑节奖_2026', 'award_21_2026'];
samples.forEach(function(id) {
  var a = d.find(function(x) { return x.award_id === id; });
  if (!a) return;
  console.log('=== ' + a.name + ' ===');
  ['contact', 'fee_timeline', 'timeline', 'category', 'award_intro'].forEach(function(f) {
    if (a[f]) {
      var v = typeof a[f] === 'string' ? a[f].substring(0, 200) : JSON.stringify(a[f]).substring(0, 200);
      console.log(f + ': ' + v);
    }
  });
  console.log('');
});
