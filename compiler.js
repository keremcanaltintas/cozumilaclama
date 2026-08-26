const sass = require('./node_modules/sass');
const fs = require('fs');

try {
  const res = sass.compile('./style.scss');
  fs.writeFileSync('./css/style.css', res.css);
  fs.writeFileSync('./compiled_status.txt', 'DONE: ' + res.css.length + ' bytes');
} catch (e) {
  fs.writeFileSync('./compiled_status.txt', 'ERROR: ' + e.message);
}
