var fs = require('fs');
var h = fs.readFileSync('out/awards.html', 'utf8');
var idx = h.indexOf('__NEXT_DATA__');
var start = h.indexOf('{', idx);
var end = h.indexOf('</script>', idx);
var d = JSON.parse(h.substring(start, end));
var arr = d.props.pageProps.awardsData;
console.log('Total:', arr.length);
console.log('First award_id:', arr[0].award_id);
console.log('First name:', arr[0].award_name || arr[0].award_name_cn);
console.log('update_time:', arr[0].update_time || 'NONE!');
// 检查详情页
try {
  var dh = fs.readFileSync('out/awards/restaurant_bar_design_awards_2026.html', 'utf8');
  console.log('Detail page: OK (exists)');
} catch(e) { console.log('Detail page: MISSING -', e.message); }
