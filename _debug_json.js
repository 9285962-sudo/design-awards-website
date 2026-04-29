var fs = require('fs');
var s = fs.readFileSync('c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/奖项数据/_extracted/纽约设计奖_2026.json', 'utf-8');
// Find the problematic area around position 371
var chunk = s.substring(340, 420);
console.log('Chunk:', JSON.stringify(chunk));
// Check for unescaped quotes in string values
// The error is at line 5, position 371
// Let's check the specific area
var lines = s.split('\n');
var line5 = lines[4];
// Find "Innovate
var idx = line5.indexOf('Innovate');
if (idx > -1) {
  console.log('Around Innovate:');
  console.log(JSON.stringify(line5.substring(idx - 10, idx + 30)));
}
