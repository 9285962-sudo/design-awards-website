var fs = require('fs');
var s = fs.readFileSync('c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/奖项数据/_extracted/纽约设计奖_2026.json', 'utf-8');
try {
  JSON.parse(s);
  console.log('JSON is valid!');
} catch(e) {
  console.log('Error:', e.message);
  // Find all problematic quotes
  var lines = s.split('\n');
  lines.forEach(function(line, i) {
    // Check for unescaped quotes within string values
    var inStr = false;
    var strStart = -1;
    for (var j = 0; j < line.length; j++) {
      if (line[j] === '\\' && j + 1 < line.length) { j++; continue; }
      if (line[j] === '"') {
        if (!inStr) { inStr = true; strStart = j; }
        else { inStr = false; }
      }
    }
    if (inStr) {
      console.log('Unclosed string on line ' + (i+1) + ', starting at col ' + strStart);
      console.log('  ' + line.substring(strStart, strStart + 100));
    }
  });
}
