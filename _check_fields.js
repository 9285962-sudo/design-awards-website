var d = require('c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/awards.json');

// 核心展示字段
var keyFields = ['award_name_cn', 'award_name_en', 'country', 'organizer', 'category_main', 'prestige_level',
  'deadline_early', 'deadline_regular', 'deadline_final', 'fee_early_bird', 'fee_regular', 'website'];

// 统计空字段情况
var emptyCount = {};
var emptyItems = {};

keyFields.forEach(function(f) {
  var count = 0;
  d.forEach(function(a, i) {
    if (!a[f] || a[f] === '—' || a[f] === '官方未公布' || a[f] === null || 
        (Array.isArray(a[f]) && a[f].length === 0)) {
      count++;
      if (count <= 3) {
        if (!emptyItems[f]) emptyItems[f] = [];
        emptyItems[f].push((a.award_name_cn || a.award_name_en || '#'+i));
      }
    }
  });
  emptyCount[f] = count;
});

console.log('=== 核心字段空缺统计 (共' + d.length + '个奖项) ===');
keyFields.forEach(function(f) {
  var pct = (emptyCount[f] / d.length * 100).toFixed(1);
  var items = emptyItems[f] ? emptyItems[f].join(', ') : '';
  console.log(f + ': ' + emptyCount[f] + '/' + d.length + ' (' + pct + '%)' + (items ? '  例: ' + items : ''));
});

// 看看哪些奖项空字段最多
console.log('\n=== 空字段最多的10个奖项 ===');
var ranked = d.map(function(a, i) {
  var empty = 0;
  keyFields.forEach(function(f) {
    if (!a[f] || a[f] === '—' || a[f] === '官方未公布' || a[f] === null ||
        (Array.isArray(a[f]) && a[f].length === 0)) empty++;
  });
  return { name: a.award_name_cn || a.award_name_en || '#'+i, empty: empty, total: keyFields.length };
});
ranked.sort(function(a, b) { return b.empty - a.empty; });
ranked.slice(0, 10).forEach(function(r) {
  console.log(r.name + ': ' + r.empty + '/' + r.total + ' 个核心字段为空');
});
