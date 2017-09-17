const isFileValidForWatch = (fileName) => {
  return !/node_modules/.test(fileName) && !/dist/.test(fileName);
};

exports.isFileValidForWatch = isFileValidForWatch;
