const fs = require('fs');
const dataFileGenerator = require('./utils/data-file-generator');
const parser = require('./utils/parser');

const dataItemsCount = 500000;
const pathToDataFile = './data/data-file.txt';
const pathToJSONFile = './data/data.json';

dataFileGenerator(dataItemsCount, pathToDataFile)
  .then(err => err ? console.log(err) : parser(pathToDataFile))
  .then(json => fs.writeFile(pathToJSONFile, json, err => console.log(err ? err : 'Success!')))
  .catch(err => console.log(err));