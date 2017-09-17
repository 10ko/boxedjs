const assert = require('assert');
const {isFileValidForWatch} = require('./../utils');

describe('utils functions', () => {
  describe('utils.isFileValidForWatch(fileName)', () => {
    it('should return false when the filename parameter contains node_modules', () => {
      const fileName = './node_modules/sub/folder';
      assert.equal(false, isFileValidForWatch(fileName));
    });
    it('should return false when the filename parameter contains dist', () => {
      const fileName = './dist/folder';
      assert.equal(false, isFileValidForWatch(fileName));
    });
    it('should return true when the filename parameter doesn\'t contain dist nor node_modules', () => {
      const fileName = './a/random/folder';
      assert.equal(true, isFileValidForWatch(fileName));
    });
  });
});
