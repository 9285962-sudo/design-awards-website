const fs = require('fs');
const path = require('path');

// 修正三个文件中 ASLA 两个奖项的 category_main 为「建筑设计」
// 同时保持 category_sub 中包含「景观设计」

const files = [
  path.join(__dirname, 'data/awards.json'),
  path.join(__dirname, 'website/data/awards.json')
];

files.forEach(function(filePath) {
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.forEach(function(x) {
    if (x.award_id === 'asla_professional_awards_2026' || x.award_id === 'asla_student_awards_2026') {
      x.category_main = '建筑设计';
      // category_sub 保持原样（包含景观设计、建筑设计、城市设计、综合设计）
    }
  });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✅', path.basename(filePath), '已修正 category_main → 建筑设计');
});

// award-details.json 中 category_main 不直接存储，但需要确认 intro 中描述正确（已正确）
console.log('\n全部修正完成！');
