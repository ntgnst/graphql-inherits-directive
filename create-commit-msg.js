const fs = require('fs');
const path = require('path');

const text = `#!/bin/sh
  . "$(dirname "$0")/_/husky.sh"
  
  npx --no -- commitlint --edit $1
  `;

const filePath = path.resolve(__dirname, './.husky/commit-msg');
console.log(filePath);

if (fs.existsSync(filePath)) {
  fs.writeFile(filePath, text, 'utf8', (err) => {
    if (err) throw err;
  });
} else {
  fs.writeFile(filePath, text, { flag: 'w', encoding: 'utf8' }, (err) => {
    if (err) throw err;
  });
}
