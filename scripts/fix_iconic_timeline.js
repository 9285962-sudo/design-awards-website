const fs = require('fs');

const awardsPath = './website/data/awards.json';
const awards = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));

const iconic = awards.find(a => a.award_id === 'iconic_awards_2026');
if (iconic) {
  iconic.timeline = iconic.key_dates;
  delete iconic.key_dates;
  fs.writeFileSync(awardsPath, JSON.stringify(awards, null, 2), 'utf8');
  console.log('✅ awards.json 已修复');
} else {
  console.log('❌ 未找到 iconic_awards_2026');
}
