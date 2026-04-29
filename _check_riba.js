const https = require('https');
https.get('https://www.52de.cc/data/awards.json', function(r) {
  let d = '';
  r.on('data', function(c) { d += c; });
  r.on('end', function() {
    const data = JSON.parse(d);
    const riba = data.filter(function(a) {
      return a.award_id && a.award_id.toLowerCase().indexOf('riba') !== -1;
    });
    riba.forEach(function(a) {
      console.log('award_id:', a.award_id);
      console.log('award_name_cn:', a.award_name_cn);
      console.log('---');
    });
  });
});
