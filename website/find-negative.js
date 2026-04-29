const fs = require('fs');
const code = fs.readFileSync('scripts/build-articles.js', 'utf8');
const lines = code.split('\n');

let parens = 0;
lines.forEach((l, i) => {
  const add = (l.match(/[(]/g) || []).length;
  const sub = (l.match(/[)]/g) || []).length;
  parens += add - sub;
  if (parens < 0) {
    console.log('First negative parens at line', i + 1, ':', l.substring(0, 80));
  }
});
console.log('Final parens:', parens);