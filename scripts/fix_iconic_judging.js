const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../website/data/award-details.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const idx = data.findIndex(x => x.award_id === 'iconic_awards_2026');
if (idx !== -1) {
  const jc = data[idx].judging_criteria;
  if (jc && Array.isArray(jc)) {
    data[idx].judging_criteria = jc.map(item => ({
      name: item.标准 || item.name,
      description: item.说明 || item.description
    }));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('已修复 judging_criteria 字段名');
  }
}
