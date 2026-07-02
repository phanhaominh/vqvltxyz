const obfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Files to obfuscate
const files = ['ka-raceing/js/amg.js', 'ka-raceing/js/rival.js', 'ka-raceing/js/rival-render.js'];

files.forEach(function(file) {
  if (!fs.existsSync(file)) return;
  const code = fs.readFileSync(file, 'utf8');
  const result = obfuscator.obfuscate(code, {
    compact: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    renameGlobals: false
  });
  let obfuscated = result.getObfuscatedCode();
  
  // Only strip localhost from amg.js (domain lock file)
  if (file === 'ka-raceing/js/amg.js') {
    obfuscated = obfuscated.replace(/localhost'\,\s*'127\.0\.0\.1'\,\s*/g, '');
  }
  
  const outFile = file.replace('.js', '.min.js');
  fs.writeFileSync(outFile, obfuscated);
  console.log('Obfuscated: ' + file);
});

// Swap script tags
let html = fs.readFileSync('ka-raceing/game.html', 'utf8');
html = html.replace('js/amg.js', 'js/amg.min.js');
html = html.replace('js/rival.js', 'js/rival.min.js');
html = html.replace('js/rival-render.js', 'js/rival-render.min.js');
fs.writeFileSync('ka-raceing/game.html', html);

console.log('Script tags swapped.');