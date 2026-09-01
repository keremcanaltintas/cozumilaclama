var fs = require('fs');
fs.writeFileSync('build_log.txt', 'hello from node ' + process.version);
