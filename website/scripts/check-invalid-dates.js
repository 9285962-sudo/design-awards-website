const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');
const d = require(path.join(dataDir, 'award-details.json'));
const bad = d.filter(x => x.updated_at && parseInt(x.updated_at.split('-')[2]) > 31);
console.log('无效日期数量:', bad.length);
bad.slice(0, 5).forEach(x => console.log(x.name, x.updated_at));
