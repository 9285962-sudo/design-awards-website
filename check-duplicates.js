const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./website/data/awards.json', 'utf8'));

const ids = {};
const duplicates = [];

console.log('总奖项数:', data.length);

data.forEach((a, i) => {
  if (ids[a.award_id]) {
    duplicates.push({ id: a.award_id, index: i, firstIndex: ids[a.award_id] });
  } else {
    ids[a.award_id] = i;
  }
});

if (duplicates.length > 0) {
  console.log('\n发现重复 award_id:');
  duplicates.forEach(d => console.log(' -', d.id, '出现在索引', d.firstIndex, '和', d.index));
} else {
  console.log('\n没有重复的 award_id');
}

// 检查JSON是否完整
console.log('\n最后一个奖项:', data[data.length - 1]?.award_name_cn);
console.log('最后一个award_id:', data[data.length - 1]?.award_id);
