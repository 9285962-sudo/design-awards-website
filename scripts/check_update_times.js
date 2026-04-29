const data = require('../website/data/awards.json');

// 室内设计类奖项
const interiorAwards = data.filter(a => a.category_main === '室内设计');
console.log('室内设计类奖项（按update_time排序）：');
interiorAwards
  .sort((a, b) => {
    const timeA = a.update_time || '1970-01-01';
    const timeB = b.update_time || '1970-01-01';
    return timeB.localeCompare(timeA);
  })
  .forEach((a, i) => console.log(`${i+1}. ${a.award_name_cn} | update_time: ${a.update_time || '无'} | award_id: ${a.award_id}`));
