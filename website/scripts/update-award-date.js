/**
 * 更新奖项的 updated_at 时间戳
 * 用法: node scripts/update-award-date.js <award_id>
 * 例如: node scripts/update-award-date.js muse_design_2026
 * 
 * 更新后的日期设为 2026-12-31，确保排第一
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const awardId = process.argv[2];

if (!awardId) {
  console.log('用法: node scripts/update-award-date.js <award_id>');
  console.log('示例: node scripts/update-award-date.js muse_design_2026');
  process.exit(1);
}

const detailsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'award-details.json'), 'utf8'));
const index = detailsData.findIndex(d => d.award_id === awardId);

if (index === -1) {
  console.log('❌ 未找到奖项:', awardId);
  process.exit(1);
}

// 设置为固定未来日期，确保排第一
const updateDate = '2026-12-31';

detailsData[index].updated_at = updateDate;

fs.writeFileSync(
  path.join(dataDir, 'award-details.json'),
  JSON.stringify(detailsData, null, 2),
  'utf8'
);

console.log('✅ 已更新', detailsData[index].name, '的时间为', updateDate);
console.log('\n现在运行以下命令重新排序和部署：');
console.log('   node scripts/sort-awards.js && npm run build && npx wrangler pages deploy out --branch=main');
