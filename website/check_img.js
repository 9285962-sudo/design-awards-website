const fs = require('fs');
const files = fs.readdirSync('public/articles');
const target = files.find(f => f.includes('凭什么'));
if (target) {
  const c = fs.readFileSync('public/articles/' + target, 'utf8');
  const idx = c.indexOf('/images/640');
  console.log('Full img tag:', c.substring(idx - 20, idx + 100));
}