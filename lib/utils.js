const path = require('path');

const watchFilter = (fileName) => {
  return !/node_modules/.test(fileName) && !/dist/.test(fileName);
};

const isHTML = (fileName) => path.extname(fileName) === '.html' || path.extname(fileName) === '.htm';
const isJSON = (fileName) => path.extname(fileName) === '.json';
const isYAML = (fileName) => path.extname(fileName) === '.yaml' || path.extname(fileName) === '.yml';

exports.watchFilter = watchFilter;
exports.isHTML = isHTML;
exports.isYAML = isYAML;
exports.isJSON = isJSON;
