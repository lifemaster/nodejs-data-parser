const fs = require('fs');
const BufferManager = require('./buffer-manager');

const bufferManager = new BufferManager();

module.exports = function(pathToFile) {
  const dataFileStream = fs.ReadStream(pathToFile);

  dataFileStream.on('data', buffer => bufferManager.save(buffer));

  return new Promise((resolve, reject) => {
    dataFileStream.once('end', () => {
      const data = bufferManager.getData().toString();
      const jsonData = parse(data);

      resolve(jsonData);

      bufferManager.clean();
    });

    dataFileStream.once('error', err => reject(err));
  });
}

function parse(data) {
  const rows = data.split('\n');
  const variables = rows[0].split('\t');
  const parsedData = [];

  rows.forEach((row, i) => {
    // skip first row with variables
    if (i === 0) return;

    const columns = row.split('\t');
    const obj = {};

    columns.forEach((column, j) => {
      obj[variables[j]] = +column;
    });

    parsedData.push(obj);
  });

  return JSON.stringify(parsedData);
}