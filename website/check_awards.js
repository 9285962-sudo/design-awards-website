const fs = require('fs');
const html = fs.readFileSync('out/awards.html', 'utf8');
const found = html.includes('a_design_award_2026_2027');
console.log('a_design found:', found);
const matches = html.match(/awards\/[^"]+\.html/g) || [];
console.log('Total award links in awards.html:', matches.length);
// 显示前5个
console.log('First 5:', matches.slice(0,5));
