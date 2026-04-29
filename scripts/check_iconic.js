const fs = require('fs');
const details = JSON.parse(fs.readFileSync('./website/data/award-details.json', 'utf8'));
const iconic = details.find(x => x.award_id === 'iconic_awards_2026');
if (iconic) {
  console.log('✅ iconic_awards_2026 已存在于 award-details.json');
  console.log('字段:', Object.keys(iconic));
} else {
  console.log('❌ iconic_awards_2026 不存在于 award-details.json');
}
console.log('总数:', details.length);
