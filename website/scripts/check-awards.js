const d = require('./data/awards.json');
const a = d.awards[0];
console.log('字段列表:');
Object.keys(a).filter(k => k.includes('update') || k.includes('date') || k.includes('time')).forEach(k => console.log(k, ':', a[k]));
