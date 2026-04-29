const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');
const d = require(path.join(dataDir, 'award-details.json'));

const s = d.slice().sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''));
const i = s.findIndex(x => x.award_id === 'reddot_product_2026');
console.log('红点在sortedDetails中位置:', i + 1, '/', s.length);

console.log('\nTop 10:');
s.slice(0, 10).forEach((x, idx) => {
  console.log(`  ${idx + 1}. ${x.name} (${x.updated_at})`);
});
