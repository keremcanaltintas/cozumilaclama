const sass = require('sass');
const fs = require('fs');

async function build() {
  try {
    console.log('Compiling style.scss...');
    const result = await sass.compileAsync('./style.scss');
    fs.writeFileSync('./css/style.css', result.css);
    console.log('SUCCESS! css/style.css written. Size:', result.css.length);
  } catch (err) {
    console.error('Sass Compile Error:', err);
  }
}

build();
