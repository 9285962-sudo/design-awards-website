var d = require('./website/data/award-details.json');
d.forEach(function(a) {
  if (a.award_levels && Array.isArray(a.award_levels)) {
    a.award_levels.forEach(function(lv) {
      if (typeof lv === 'object' && lv !== null) {
        console.log('FOUND object in award_levels:', a.award_id, a.name, JSON.stringify(lv));
      }
    });
  }
});
