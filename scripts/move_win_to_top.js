const fs = require('fs');
const path = require('path');

// 修改 awards.json
const awardsPath = path.join(__dirname, '../website/data/awards.json');
const awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));
const winIndex = awardsData.findIndex(a => a.award_id === 'win_awards_2026');
if (winIndex !== -1) {
  awardsData[winIndex].update_time = '2026-04-27T21:00';
}
fs.writeFileSync(awardsPath, JSON.stringify(awardsData, null, 2), 'utf8');
console.log('✅ WIN Awards update_time updated to 2026-04-27T21:00');

// 修改 award-details.json
const detailsPath = path.join(__dirname, '../website/data/award-details.json');
const detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
const winDetailIndex = detailsData.findIndex(a => a.award_id === 'win_awards_2026');
if (winDetailIndex !== -1) {
  detailsData[winDetailIndex].updated_at = '2026-04-27T21:00';
}
fs.writeFileSync(detailsPath, JSON.stringify(detailsData, null, 2), 'utf8');
console.log('✅ WIN Awards details updated_at updated');
