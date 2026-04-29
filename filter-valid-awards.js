const fs = require('fs');

const awardsData = JSON.parse(fs.readFileSync('./website/data/awards.json', 'utf8'));
const awardDetails = JSON.parse(fs.readFileSync('./website/data/award-details.json', 'utf8'));

// 判断奖项是否完整：有费用或截止日期
function isComplete(award) {
  const hasFee = award.fee_early_bird || award.fee_regular || award.fee_final;
  const hasDeadline = award.deadline_early || award.deadline_regular || award.deadline_final;
  const hasOrganizer = award.organizer && award.organizer !== '待补充';
  return (hasFee || hasDeadline) && hasOrganizer;
}

// 判断详情是否完整：有时间轴或评审标准
function hasDetailContent(detail) {
  const hasTimeline = detail.timeline && detail.timeline.length > 0;
  const hasCriteria = detail.judging_criteria && detail.judging_criteria.length > 0;
  const hasCategories = detail.categories && detail.categories.length > 0 && detail.categories[0].类别 !== '综合设计';
  return hasTimeline || hasCriteria || hasCategories;
}

const validAwards = [];
const invalidAwards = [];

awardsData.forEach(award => {
  const detail = awardDetails.find(d => d.award_id === award.award_id);
  if (isComplete(award) && detail && hasDetailContent(detail)) {
    validAwards.push(award.award_id);
  } else {
    invalidAwards.push({
      id: award.award_id,
      name: award.award_name_cn,
      reason: !isComplete(award) ? '缺少费用/截止日期' : '详情页内容为空'
    });
  }
});

console.log('完整奖项数:', validAwards.length);
console.log('不完整奖项数:', invalidAwards.length);
console.log('');
console.log('完整奖项:');
validAwards.forEach(id => {
  const a = awardsData.find(x => x.award_id === id);
  console.log(' -', a.award_name_cn);
});
console.log('');
console.log('不完整的奖项(将被删除):');
invalidAwards.forEach(a => {
  console.log(' -', a.name, `(${a.reason})`);
});

// 保存过滤后的数据
const filteredAwards = awardsData.filter(a => validAwards.includes(a.award_id));
const filteredDetails = awardDetails.filter(d => validAwards.includes(d.award_id));

fs.writeFileSync('./website/data/awards.json', JSON.stringify(filteredAwards, null, 2));
fs.writeFileSync('./website/data/award-details.json', JSON.stringify(filteredDetails, null, 2));

console.log('');
console.log('✓ 已保存过滤后的数据');
console.log(`  awards.json: ${filteredAwards.length} 个奖项`);
console.log(`  award-details.json: ${filteredDetails.length} 个奖项`);
