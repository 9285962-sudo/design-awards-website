const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// award_id 映射表（中文 → 英文）
const renameMap = {
  'andrew_martin国际室内设计大奖_2026': 'andrew_martin_2026',
  '世界建筑节奖_2026': 'waf_2026',
  'reddot_product_2026': 'reddot_2026'
};

// 1. 修改 awards.json
const awardsPath = path.join(__dirname, '../website/data/awards.json');
const awardsData = JSON.parse(fs.readFileSync(awardsPath, 'utf8'));
awardsData.forEach(award => {
  if (renameMap[award.award_id]) {
    award.award_id = renameMap[award.award_id];
  }
});
fs.writeFileSync(awardsPath, JSON.stringify(awardsData, null, 2), 'utf8');
console.log('✅ awards.json updated');

// 2. 修改 award-details.json
const detailsPath = path.join(__dirname, '../website/data/award-details.json');
const detailsData = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
detailsData.forEach(award => {
  if (renameMap[award.award_id]) {
    award.award_id = renameMap[award.award_id];
  }
});
fs.writeFileSync(detailsPath, JSON.stringify(detailsData, null, 2), 'utf8');
console.log('✅ award-details.json updated');

// 3. 重命名静态页面文件夹
const outPath = path.join(__dirname, '../website/out/awards');
Object.entries(renameMap).forEach(([oldId, newId]) => {
  const oldDir = path.join(outPath, oldId);
  const newDir = path.join(outPath, newId);
  
  if (fs.existsSync(oldDir)) {
    // 删除已存在的目标文件夹
    if (fs.existsSync(newDir)) {
      fs.rmSync(newDir, { recursive: true });
    }
    fs.renameSync(oldDir, newDir);
    console.log(`✅ Renamed: ${oldId} → ${newId}`);
  }
});

console.log('\n🎉 All award IDs standardized to English format!');
