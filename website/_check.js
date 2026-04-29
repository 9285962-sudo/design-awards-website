var fs = require('fs');
var h = fs.readFileSync('out/awards.html', 'utf8');
var idx = h.indexOf('__NEXT_DATA__');
var start = h.indexOf('{', idx);
var end = h.indexOf('</script>', idx);
var d = JSON.parse(h.substring(start, end));
var arr = d.props.pageProps.awardsData;
console.log('Total awards:', arr.length);
console.log('First award_id:', arr[0].award_id);
console.log('First name:', arr[0].award_name || arr[0].award_name_cn);
console.log('First update_time:', arr[0].update_time || '(none)');
console.log('');
// 检查详情页
try {
  var dh = fs.readFileSync('out/awards/arch_design_award_2027.html', 'utf8');
  var di = dh.indexOf('__NEXT_DATA__');
  var ds = dh.indexOf('{', di);
  var de = dh.indexOf('</script>', di);
  var dd = JSON.parse(dh.substring(ds, de));
  console.log('Detail page OK:', dd.props.pageProps?.award?.award_id || 'N/A');
} catch(e) {
  console.log('Detail page error:', e.message);
}
