var fs = require('fs');
var path = require('path');

function find(base, depth) {
  if (depth > 4) return;
  try {
    var files = fs.readdirSync(base);
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      if (f === 'node_modules' || f === '.git' || f[0] === '.') continue;
      var p = path.join(base, f);
      try {
        var s = fs.statSync(p);
        if (s.isDirectory()) {
          // 查找包含 20260421190423 的目录，或包含 mini-program 的目录
          if (f === 'mini-program' || f.indexOf('20260421190423') !== -1 || f.indexOf('2026042') === 0) {
            console.log('CANDIDATE:', p);
          }
          find(p, depth + 1);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

var searchPaths = [
  'c:/Users/Administrator/Desktop',
  'c:/Users/Administrator/Documents',
  'c:/Users/Administrator/Downloads',
  'c:/Users/Administrator/WorkBuddy',
  'd:/',
  'e:/'
];

for (var i = 0; i < searchPaths.length; i++) {
  try {
    console.log('--- Searching:', searchPaths[i], '---');
    find(searchPaths[i], 0);
  } catch(e) {}
}
