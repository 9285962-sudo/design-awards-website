const fs = require('fs');
const code = fs.readFileSync('scripts/build-articles.js', 'utf8');

// Try to parse with acorn-like approach
const lines = code.split('\n');
let depth = 0;
let lastErrorLine = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Skip comments and strings roughly
  const stripped = line.replace(/\/\/.*$/, '');
  
  for (const char of stripped) {
    if (char === '(' || char === '{' || char === '[') depth++;
    if (char === ')' || char === '}' || char === ']') depth--;
  }
  
  if (depth < 0) {
    console.log(`Found negative depth at line ${i + 1}: ${lines[i]}`);
    console.log('Context:', lines.slice(Math.max(0, i - 2), i + 3).join('\n'));
    break;
  }
  
  if (i >= 585 && i <= 595) {
    console.log(`${i + 1}: [depth=${depth}] ${line.substring(0, 70)}`);
  }
}