const fs = require('fs');

try {
  const sass = require('./node_modules/sass');
  fs.writeFileSync('./sass_debug.txt', 'Keys: ' + JSON.stringify(Object.keys(sass)));
} catch (err) {
  fs.writeFileSync('./sass_debug.txt', 'Error: ' + err.stack);
}
