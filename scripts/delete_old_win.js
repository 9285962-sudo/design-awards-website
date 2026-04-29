const fs = require('fs');
const path = require('path');

const detailsPath = path.join(__dirname, '../website/data/award-details.json');
const detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

// 删除旧的win奖_2026
const newDetailsData = detailsData.filter(a => a.award_id !== 'win奖_2026');

fs.writeFileSync(detailsPath, JSON.stringify(newDetailsData, null, 2), 'utf8');
console.log('Deleted win奖_2026 from award-details.json');
