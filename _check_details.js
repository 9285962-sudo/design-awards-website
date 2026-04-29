var d = require('./website/data/award-details.json');
console.log('award-details.json 总条目:', d.length);
console.log('');

var fields = ['award_intro','category','contact','fee_timeline','timeline','judging_criteria','award_levels','faq','eligibility','submission_requirements','rights','prize','website'];

console.log('=== 每个条目的填充字段数 ===');
d.forEach(function(a) {
  var filled = 0;
  var filledFields = [];
  fields.forEach(function(f) {
    var v = a[f];
    var isFilled = false;
    if (v && typeof v === 'string' && v.trim().length > 5) isFilled = true;
    else if (v && typeof v === 'object' && Object.keys(v).length > 0) isFilled = true;
    else if (Array.isArray(v) && v.length > 0) isFilled = true;
    if (isFilled) { filled++; filledFields.push(f); }
  });
  console.log(a.award_id + ' | ' + a.name + ' | 填充: ' + filled + '/' + fields.length + ' | ' + filledFields.join(', '));
});

console.log('');
console.log('=== 总体字段填充率 ===');
var totals = {};
fields.forEach(function(f) { totals[f] = {total: 0, filled: 0}; });
d.forEach(function(a) {
  fields.forEach(function(f) {
    totals[f].total++;
    var v = a[f];
    var isFilled = false;
    if (v && typeof v === 'string' && v.trim().length > 5) isFilled = true;
    else if (v && typeof v === 'object' && Object.keys(v).length > 0) isFilled = true;
    else if (Array.isArray(v) && v.length > 0) isFilled = true;
    if (isFilled) totals[f].filled++;
  });
});
fields.forEach(function(f) {
  console.log(f + ': ' + totals[f].filled + '/' + totals[f].total);
});
