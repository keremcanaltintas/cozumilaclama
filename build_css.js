const sass = require('./node_modules/sass');
const fs = require('fs');

async function build() {
  try {
    const result = await sass.compileAsync('./style.scss');
    fs.writeFileSync('./css/style.css', result.css);
    console.log('SUCCESS! css/style.css compiled cleanly. Size:', result.css.length);
  } catch (err) {
    console.error('Sass Compile Error:', err);
  }
}

build();
