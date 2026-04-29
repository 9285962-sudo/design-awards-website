const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const d = JSON.parse(fs.readFileSync(path.join(dataDir, 'award-details.json'), 'utf8'));

// 设置日期：从04-10开始，每天一个奖项
d.forEach((item, i) => {
  const day = 10 + i;
  item.updated_at = '2026-04-' + String(day).padStart(2, '0');
});

fs.writeFileSync(path.join(dataDir, 'award-details.json'), JSON.stringify(d, null, 2), 'utf8');
console.log('✅ 所有日期已重置（04-10 到 04-78）');
console.log('\n注意：由于4月只有30天，04-31到04-78是虚拟日期，用于测试排序');
