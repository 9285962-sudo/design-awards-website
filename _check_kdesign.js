const a = require('c:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/awards.json');
const k = a.find(x => x.award_id === 'k_design_award_2026');
const keys = Object.keys(k);
keys.forEach(key => {
  const v = k[key];
  if (v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
    console.log(key + ': ' + JSON.stringify(v));
  }
});
console.log('\n--- Current values for time-related fields ---');
['submission_open','deadline_early','deadline_regular','deadline_final','deadline_extended','semifinalist_announcement','announcement_date','ceremony_date','ceremony_location','ceremony_format','judging_process','judging_criteria','award_levels','project_status','entrant_type','team_size_limit','multi_category_allowed','submission_editable','submission_editable_deadline','previous_winners','history','reputation'].forEach(key => {
  console.log(key + ': ' + JSON.stringify(k[key]));
});
