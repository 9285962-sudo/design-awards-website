const d=require('C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/awards.json');
const dt=require('C:/Users/Administrator/WorkBuddy/国际设计大奖参赛咨询/website/data/award-details.json');
let ai=-1, di=-1;
for(let k=0;k<d.length;k++){if(d[k].award_id&&d[k].award_id.toLowerCase().includes('adesign')){ai=k;break;}}
for(let k=0;k<dt.length;k++){if(dt[k].award_id&&dt[k].award_id.toLowerCase().includes('adesign')){di=k;break;}}
console.log('awards.json:', ai>=0?'index '+ai:'NOT FOUND');
console.log('details.json:', di>=0?'index '+di:'NOT FOUND');
