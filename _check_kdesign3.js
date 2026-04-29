var a = require('c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/awards.json');
var k = a.find(function(x) { return x.award_id === 'k_design_award_2026'; });

var keys = Object.keys(k);
keys.forEach(function(key) {
  var v = k[key];
  var isEmpty = (v === null) || (v === undefined) || (v === '') || (Array.isArray(v) && v.length === 0);
  if (isEmpty) {
    console.log('EMPTY: ' + key);
  }
});

console.log('');
console.log('--- Checking what normalizeAward would produce ---');

// Simulate normalizeAward for the key fields the miniprogram renders
console.log('');
console.log('timeline (array):', Array.isArray(k.timeline) ? k.timeline.length + ' items' : 'NO');
if (Array.isArray(k.timeline)) k.timeline.forEach(function(t) { console.log('  ' + (t['阶段'] || t.phase) + ': ' + (t['时间'] || t.time)); });

console.log('');
console.log('_timeline fallback (deadline fields):');
var tl = [];
if (k.submission_open) tl.push({phase:'投稿开始',time:k.submission_open});
if (k.deadline_early) tl.push({phase:'早鸟截止',time:k.deadline_early});
if (k.deadline_regular) tl.push({phase:'常规截止',time:k.deadline_regular});
if (k.deadline_final) tl.push({phase:'最终截止',time:k.deadline_final});
if (k.announcement_date) tl.push({phase:'结果公布',time:k.announcement_date});
if (k.ceremony_date) tl.push({phase:'颁奖典礼',time:k.ceremony_date});
console.log(tl.length + ' items from deadline fields');
tl.forEach(function(t) { console.log('  ' + t.phase + ': ' + t.time); });

console.log('');
console.log('judges:', typeof k.judges, Array.isArray(k.judges) ? k.judges.length + ' items' : k.judges);
console.log('_judges:', typeof k._judges, Array.isArray(k._judges) ? k._judges.length + ' items' : k._judges);

console.log('');
console.log('chinese_winners:', typeof k.chinese_winners, Array.isArray(k.chinese_winners) ? k.chinese_winners.length + ' items' : k.chinese_winners);
console.log('_chinese_winners:', typeof k._chinese_winners, Array.isArray(k._chinese_winners) ? k._chinese_winners.length + ' items' : k._chinese_winners);

console.log('');
console.log('category_sub:', Array.isArray(k.category_sub) ? k.category_sub.length + ' items' : k.category_sub);
console.log('category_main:', k.category_main);

console.log('');
console.log('judging_criteria:', Array.isArray(k.judging_criteria) ? k.judging_criteria : k.judging_criteria);
console.log('judging_process:', k.judging_process);
console.log('award_levels:', Array.isArray(k.award_levels) ? k.award_levels : k.award_levels);
console.log('award_winner_benefits:', Array.isArray(k.award_winner_benefits) ? k.award_winner_benefits.length + ' items' : k.award_winner_benefits);
