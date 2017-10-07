const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

const applyOBJ = require('../applyVariables')
const {applyVariables, tooManyNestedVariablesError} = applyOBJ

const pageWithoutVariablesMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1></body></html>'
const pageWithOneVariableMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1>[[[variable-1]]]</body></html>'
const pageWithOneVariableWithSpacesMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1>[[[ variable-1  ]]]</body></html>'

const pageWithVariableAppliedMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1><p>This is the content of a variable</p></body></html>'
const pageWithNestedVariableAppliedMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1><p>This is a variable<span>This is a nested variable</span></p></body></html>'

const variablesMock = {
  'variable-1': '<p>This is the content of a variable</p>'
}

const nestedVariableMock = {
  'variable-1': '<p>This is a variable[[[variable-2]]]</p>',
  'variable-2': '<span>This is a nested variable</span>'
}

const infiniteNestedVariableMock = {
  'variable-1': '<span>This is a variable[[[variable-2]]]</span>',
  'variable-2': '<span>This is a nested variable[[[variable-1]]]</span>'
}

const tooManyNestedVariablesErrorMessage = 'Too many nested variables!!'

describe('applyVariables function', () => {
  it('Returns the same page if page has no variables in it and no variables are provided to the function.', () => {
    expect(applyVariables(pageWithoutVariablesMock)).to.equal(pageWithoutVariablesMock)
  })

  it('Returns the same page if page has variables in it and no variables are provided to the function.', () => {
    expect(applyVariables(pageWithOneVariableMock)).to.equal(pageWithOneVariableMock)
  })

  it('Returns the same page if page has no variables in it and variables are provided to the function.', () => {
    expect(applyVariables(pageWithoutVariablesMock, variablesMock)).to.equal(pageWithoutVariablesMock)
  })

  it('Returns a new page with the variable applied to it.', () => {
    expect(applyVariables(pageWithOneVariableMock, variablesMock)).to.equal(pageWithVariableAppliedMock)
  })

  it('Returns a new page with the variable applied to it even if the variable is specified with spaces between the brackets.', () => {
    expect(applyVariables(pageWithOneVariableWithSpacesMock, variablesMock)).to.equal(pageWithVariableAppliedMock)
  })

  it('Returns a new page with the nested variable applied to it.', () => {
    expect(applyVariables(pageWithOneVariableMock, nestedVariableMock)).to.equal(pageWithNestedVariableAppliedMock)
  })

  it('Throws an error when trying to apply infinite nested variables to a page.', () => {
    expect(() => applyVariables(pageWithOneVariableMock, infiniteNestedVariableMock))
      .to.throw(tooManyNestedVariablesError)
      .and.be.an.instanceOf(Error)
      .with.property('message', tooManyNestedVariablesErrorMessage)
  })
  it('Checks the function is called max 100 times when trying to apply infinite nested variables to a page.', () => {
    const spy = sinon.spy(applyOBJ, 'applyVariables')
    expect(() => spy(pageWithOneVariableMock, infiniteNestedVariableMock)).to.throw()
    expect(spy.callCount).to.equal(100)
  })
})
