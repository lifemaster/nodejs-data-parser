const fs = require('fs');
const path = require('path');

function dataFileGenerator(rowsCount, pathToFile) {
  let data = 'x\tx^2\tx^3\n';

  for (let i=1; i<=rowsCount; i++) {
    data += `${i}\t${Math.pow(i, 2)}\t${Math.pow(i, 3)}\n`;
  }

  return new Promise((resolve, reject) => {
    const pathToDir = path.dirname(pathToFile);

    // create directory if it doesn't exist
    fs.existsSync(pathToDir) || fs.mkdirSync(pathToDir);

    // try to write file with data
    fs.writeFile(pathToFile, data, err => err ? reject(err) : resolve(null));
  });
}

module.exports = dataFileGenerator;