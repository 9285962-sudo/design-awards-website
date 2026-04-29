const fs = require('fs');
const code = fs.readFileSync('scripts/build-articles.js', 'utf8');

// Count characters in key areas
const lines = code.split('\n');

// Find the buildStrategy function
let inBuildStrategy = false;
let braceStack = [];
let parenStack = [];
let errorInfo = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Reset tracking at function start
  if (line.includes('function buildStrategy()')) {
    inBuildStrategy = true;
    braceStack = [];
    parenStack = [];
  }
  
  if (inBuildStrategy) {
    // Track brackets
    for (const char of line) {
      if (char === '(') parenStack.push(i + 1);
      if (char === ')') {
        if (parenStack.length === 0) {
          console.log(`Extra ) at line ${i + 1}: ${line}`);
          errorInfo = `Extra ) at line ${i + 1}`;
        } else {
          parenStack.pop();
        }
      }
      if (char === '{') braceStack.push(i + 1);
      if (char === '}') {
        if (braceStack.length === 0) {
          console.log(`Extra } at line ${i + 1}: ${line}`);
        } else {
          braceStack.pop();
        }
      }
    }
    
    if (i >= 600 && i <= 620) {
      console.log(`${i + 1}: ${line.substring(0, 80)}`);
      console.log(`   parenStack: ${parenStack.length}, braceStack: ${braceStack.length}`);
    }
    
    // End of buildStrategy
    if (line.includes('^\\^\\^') || braceStack.length === 0 && i > 600) {
      inBuildStrategy = false;
    }
  }
}

console.log('\nFinal paren balance:', parenStack.length);
console.log('Final brace balance:', braceStack.length);