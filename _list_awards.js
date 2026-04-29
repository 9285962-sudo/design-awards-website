var d = require('./website/data/awards.json');
var det = require('./website/data/award-details.json');
var detailIds = new Set(det.map(function(a){return a.award_id}));
var noDetail = d.filter(function(a){return !detailIds.has(a.award_id)});
console.log('总奖项:', d.length);
console.log('有详细数据:', det.length);
console.log('无详细数据:', noDetail.length);
console.log('');
noDetail.forEach(function(a){
  var url = a.website || 'NO_URL';
  console.log(a.id + ' | ' + a.award_id + ' | ' + a.award_name_cn + ' | ' + url);
});
