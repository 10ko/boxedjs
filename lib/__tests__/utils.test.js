const assert = require('assert')
const {
  watchFilter,
  isHTML,
  isJSON,
  isYAML
} = require('./../utils')

describe('utils functions', () => {
  describe('utils.watchFilter(fileName)', () => {
    it('should return false when the filename parameter contains node_modules', () => {
      const fileName = './node_modules/sub/folder'
      assert.equal(false, watchFilter(fileName))
    })
    it('should return false when the filename parameter contains dist', () => {
      const fileName = './dist/folder'
      assert.equal(false, watchFilter(fileName))
    })
    it('should return true when the filename parameter doesn\'t contain dist nor node_modules', () => {
      const fileName = './a/random/folder'
      assert.equal(true, watchFilter(fileName))
    })
  })

  describe('utils.isHTML(fileName)', () => {
    it('should return false when the filename extension is not .html', () => {
      const fileName = 'testfile.sh'
      assert.equal(false, isHTML(fileName))
    })
    it('should return false when the filename extension is not .htm', () => {
      const fileName = 'testfile.sh'
      assert.equal(false, isHTML(fileName))
    })
    it('should return true when the filename extension is .html', () => {
      const fileName = 'testfile.html'
      assert.equal(true, isHTML(fileName))
    })
    it('should return true when the filename extension is .htm', () => {
      const fileName = 'testfile.htm'
      assert.equal(true, isHTML(fileName))
    })
    it('should return true when a complex filename extension is .html', () => {
      const fileName = 'complex/path/testfile.html'
      assert.equal(true, isHTML(fileName))
    })
    it('should return true when a complex filename extension is .htm', () => {
      const fileName = 'complex/path/testfile.htm'
      assert.equal(true, isHTML(fileName))
    })
  })

  describe('utils.isJSON(fileName)', () => {
    it('should return false when the filename extension is not .json', () => {
      const fileName = 'testfile.sh'
      assert.equal(false, isJSON(fileName))
    })
    it('should return true when the filename extension is .json', () => {
      const fileName = 'testfile.json'
      assert.equal(true, isJSON(fileName))
    })
    it('should return true when a complex filename extension is .json', () => {
      const fileName = 'complex/path/testfile.json'
      assert.equal(true, isJSON(fileName))
    })
  })

  describe('utils.isYAML(fileName)', () => {
    it('should return false when the filename extension is not .yaml', () => {
      const fileName = 'testfile.sh'
      assert.equal(false, isYAML(fileName))
    })
    it('should return false when a complex filename extension is not .yaml', () => {
      const fileName = 'complex/path/testfile.sh'
      assert.equal(false, isYAML(fileName))
    })
    it('should return true when the filename extension is .yaml', () => {
      const fileName = 'testfile.yaml'
      assert.equal(true, isYAML(fileName))
    })
    it('should return true when a complex filename extension is .yaml', () => {
      const fileName = 'complex/path/testfile.yaml'
      assert.equal(true, isYAML(fileName))
    })
    it('should return false when the filename extension is not .yml', () => {
      const fileName = 'testfile.sh'
      assert.equal(false, isYAML(fileName))
    })
    it('should return false when a complex filename extension is not .yml', () => {
      const fileName = 'complex/path/testfile.sh'
      assert.equal(false, isYAML(fileName))
    })
    it('should return true when the filename extension is .yml', () => {
      const fileName = 'testfile.yml'
      assert.equal(true, isYAML(fileName))
    })
    it('should return true when a complex filename extension is .yml', () => {
      const fileName = 'complex/path/testfile.yml'
      assert.equal(true, isYAML(fileName))
    })
  })
})
