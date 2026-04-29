// 合并手动提取的奖项数据到 award-details.json
var fs = require('fs');
var detailsPath = './website/data/award-details.json';
var extractedPath = './奖项数据/_extracted/纽约设计奖_2026.json';

var details = JSON.parse(fs.readFileSync(detailsPath, 'utf-8'));
var extracted = JSON.parse(fs.readFileSync(extractedPath, 'utf-8'));

// 找到并替换
var found = false;
details = details.map(function(d) {
  if (d.award_id === extracted.award_id) {
    found = true;
    return extracted;
  }
  return d;
});

if (!found) {
  details.push(extracted);
  console.log('新增条目');
} else {
  console.log('替换条目');
}

fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf-8');
console.log('完成，当前共', details.length, '条');

// 统计填充
var fields = ['award_intro','category','contact','fee_timeline','timeline','judging_criteria','award_levels','faq','eligibility','submission_requirements','rights','prize'];
var e = extracted;
var filled = 0;
fields.forEach(function(f) {
  if (e[f]) {
    var v = e[f];
    var hasContent = false;
    if (typeof v === 'string' && v.trim().length > 5) hasContent = true;
    if (Array.isArray(v) && v.length > 0) hasContent = true;
    if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0) hasContent = true;
    if (hasContent) { filled++; console.log('  ✓ ' + f); }
    else console.log('  ✗ ' + f);
  } else {
    console.log('  ✗ ' + f);
  }
});
console.log('填充: ' + filled + '/' + fields.length);
