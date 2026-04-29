const fs = require('fs');
const code = fs.readFileSync('scripts/build-articles.js', 'utf8');
const lines = code.split('\n');

let parens = 0;
let braces = 0;
lines.forEach((l, i) => {
  const add = (l.match(/[(]/g) || []).length;
  const sub = (l.match(/[)]/g) || []).length;
  parens += add - sub;
  
  const addB = (l.match(/[{]/g) || []).length;
  const subB = (l.match(/[}]/g) || []).length;
  braces += addB - subB;
  
  if (i >= 70 && i <= 80) {
    console.log(i + 1, 'p:', parens, 'b:', braces, l.substring(0, 80));
  }
});