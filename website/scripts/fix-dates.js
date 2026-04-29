const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const d = JSON.parse(fs.readFileSync(path.join(dataDir, 'award-details.json'), 'utf8'));

const today = '2026-04-27';
const reddotIndex = d.findIndex(x => x.award_id === 'reddot_product_2026');

d.forEach((item, i) => {
  // 修复无效日期
  if (item.updated_at) {
    const day = parseInt(item.updated_at.split('-')[2]);
    if (day > 31) {
      item.updated_at = '2026-04-' + String(10 + i).padStart(2, '0');
    }
  }
  // 红点奖设为今天
  if (i === reddotIndex) {
    item.updated_at = today;
  }
});

fs.writeFileSync(path.join(dataDir, 'award-details.json'), JSON.stringify(d, null, 2), 'utf8');
console.log('✅ 日期已修复，红点奖设为今天');
