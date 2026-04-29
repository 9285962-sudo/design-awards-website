const data = require('../website/data/awards.json');
const names = ['WAF', '红点', 'Dezeen'];
names.forEach(name => {
  const a = data.find(x => x.award_name_cn && x.award_name_cn.includes(name));
  if (a) {
    console.log(a.award_name_cn, '|', a.fee_currency, '|', a.fee_early_bird, a.fee_regular);
  }
});
