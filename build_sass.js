const sass = require('./node_modules/sass');
const fs = require('fs');

try {
    const result = sass.compile('./style.scss');
    fs.writeFileSync('./css/style.css', result.css);
    fs.writeFileSync('./sass_build.log', 'SUCCESSFULLY COMPILED style.scss to css/style.css! Output length: ' + result.css.length);
} catch (err) {
    fs.writeFileSync('./sass_build.log', 'SASS COMPILE ERROR: ' + err.stack);
}
