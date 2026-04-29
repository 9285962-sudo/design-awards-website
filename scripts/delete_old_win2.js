const fs = require('fs');
const path = require('path');

// 删除awards.json中的旧win奖
const awardsPath = path.join(__dirname, '../website/data/awards.json');
const awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));
const newAwardsData = awardsData.filter(a => a.award_id !== 'win奖_2026');
fs.writeFileSync(awardsPath, JSON.stringify(newAwardsData, null, 2), 'utf8');
console.log('Deleted win奖_2026 from awards.json');

// 删除award-details.json中的旧win奖
const detailsPath = path.join(__dirname, '../website/data/award-details.json');
const detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
const newDetailsData = detailsData.filter(a => a.award_id !== 'win奖_2026');
fs.writeFileSync(detailsPath, JSON.stringify(newDetailsData, null, 2), 'utf8');
console.log('Deleted win奖_2026 from award-details.json');
