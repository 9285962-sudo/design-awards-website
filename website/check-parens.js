const fs = require('fs');
const code = fs.readFileSync('scripts/build-articles.js', 'utf8');
const lines = code.split('\n');

let parens = 0;
lines.forEach((l, i) => {
  const add = (l.match(/[(]/g) || []).length;
  const sub = (l.match(/[)]/g) || []).length;
  parens += add - sub;
  if (i >= 585 && i <= 596) {
    console.log(i + 1, 'parens:', parens, l.substring(0, 80));
  }
});