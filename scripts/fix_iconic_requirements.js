const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../website/data/award-details.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const idx = data.findIndex(x => x.award_id === 'iconic_awards_2026');
if (idx !== -1) {
  const reqs = data[idx].requirements;
  if (reqs && Array.isArray(reqs)) {
    // 把 ["标题：内容", ...] 数组转换为 {标题: 内容, ...} 对象
    const obj = {};
    reqs.forEach(item => {
      if (typeof item === 'string') {
        const colonIdx = item.indexOf('：');
        if (colonIdx > -1) {
          const key = item.substring(0, colonIdx);
          const value = item.substring(colonIdx + 1);
          obj[key] = value;
        } else {
          obj[item] = '';
        }
      }
    });
    data[idx].requirements = obj;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('已修复 requirements 格式');
  }
}
