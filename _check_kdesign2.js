var a = require('c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/awards.json');
var k = a.find(function(x) { return x.award_id === 'k_design_award_2026'; });
if (!k) { console.log('NOT FOUND'); process.exit(); }

var keys = Object.keys(k);
var filled = 0, empty = 0;

keys.forEach(function(key) {
  var v = k[key];
  var isEmpty = (v === null) || (v === undefined) || (v === '') || (Array.isArray(v) && v.length === 0);
  if (isEmpty) {
    empty++;
  } else {
    filled++;
    var display = '';
    if (typeof v === 'string') {
      display = v.substring(0, 100);
    } else if (typeof v === 'object') {
      display = JSON.stringify(v).substring(0, 100);
    } else {
      display = String(v);
    }
    console.log('OK ' + key + ': ' + display);
  }
});

console.log('');
console.log('TOTAL: ' + keys.length + ' Filled: ' + filled + ' Empty: ' + empty);
