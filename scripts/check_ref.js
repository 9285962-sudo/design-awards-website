const fs = require('fs');
const awards = JSON.parse(fs.readFileSync('./website/data/awards.json', 'utf8'));
const details = JSON.parse(fs.readFileSync('./website/data/award-details.json', 'utf8'));

// 找一个有完整数据的奖项作为参考模板
const ref = details.find(x => x.award_id && x.award_levels && x.award_levels.length > 0 && x.judging_criteria && x.judging_criteria.length > 0);
if (ref) {
  console.log('=== award-details.json 参考模板 ===');
  console.log('award_id:', ref.award_id);
  console.log('keys:', Object.keys(ref).join(', '));
  console.log('award_levels sample:', JSON.stringify(ref.award_levels[0]));
  console.log('judging_criteria sample:', JSON.stringify(ref.judging_criteria[0]));
  console.log('requirements:', JSON.stringify(ref.requirements));
  console.log('benefits sample:', ref.benefits ? JSON.stringify(ref.benefits[0]) : null);
  console.log('timeline sample:', ref.timeline ? JSON.stringify(ref.timeline[0]) : null);
}

// 也看 awards.json 里对应的那条
const refAward = awards.find(x => x.award_id === ref.award_id);
if (refAward) {
  console.log('\n=== awards.json 对应数据 ===');
  console.log('timeline sample:', refAward.timeline ? JSON.stringify(refAward.timeline[0]) : null);
  console.log('fee_timeline sample:', refAward.fee_timeline ? JSON.stringify(refAward.fee_timeline[0]) : null);
  console.log('organizer:', refAward.organizer);
  console.log('award_intro:', refAward.award_intro ? refAward.award_intro.substring(0, 80) + '...' : null);
  console.log('categories:', refAward.categories ? JSON.stringify(refAward.categories[0]) : null);
}
