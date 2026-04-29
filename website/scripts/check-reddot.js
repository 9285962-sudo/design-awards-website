const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');
const d = require(path.join(dataDir, 'award-details.json'));

const r = d.filter(x => x.award_id && x.award_id.includes('reddot'));
console.log('所有红点奖:');
r.forEach(x => console.log(x.award_id, '|', x.name, '|', x.updated_at));
