const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

// 读取数据
const detailsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'award-details.json'), 'utf8'));
const awardsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'awards.json'), 'utf8'));

// 按 updated_at 降序排序（最新的排第一）
const sortedDetails = detailsData.slice().sort((a, b) => {
  const timeA = a.updated_at || '2000-01-01';
  const timeB = b.updated_at || '2000-01-01';
  return timeB.localeCompare(timeA);
});

// 重新排序 awards.json
const sortedAwardIds = sortedDetails.map(d => d.award_id);

const sortedAwards = awardsData.slice().sort((a, b) => {
  const posA = sortedAwardIds.indexOf(a.award_id);
  const posB = sortedAwardIds.indexOf(b.award_id);

  if (posA !== -1 && posB !== -1) {
    return posA - posB;
  }
  if (posA !== -1) return -1;
  if (posB !== -1) return 1;
  return 0;
});

// 保存
fs.writeFileSync(path.join(dataDir, 'awards.json'), JSON.stringify(sortedAwards, null, 2), 'utf8');

// 输出
const withDetail = sortedAwards.filter(a => sortedAwardIds.includes(a.award_id)).length;
console.log(`✅ 奖项已按 updated_at 排序（最新的排第一）：${withDetail}/${sortedAwards.length} 个有详情`);

console.log('\n最近更新的奖项（Top 5）：');
sortedDetails.slice(0, 5).forEach((d, i) => {
  console.log(`  ${i + 1}. ${d.name} (更新时间: ${d.updated_at || '无'})`);
});
