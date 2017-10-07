const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

const applyOBJ = require('../applyTemplates')
const {applyTemplates, tooManyNestedTemplatesError} = applyOBJ

const pageWithoutTemplatesMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1></body></html>'
const pageWithOneTemplateMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1>[[template-1]]</body></html>'
const pageWithOneTemplateWithSpacesMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1>[[ template-1        ]]</body></html>'

const pageWithTemplateAppliedMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1><p>This is a template</p></body></html>'
const pageWithNestedTemplateAppliedMock = '<!DOCTYPE html><html lang=""><head></head><body><h1 class="text-center">Hello World</h1><p>This is a template<span>This is a nested template</span></p></body></html>'

const templatesMock = {
  'template-1': '<p>This is a template</p>'
}

const nestedTemplateMock = {
  'template-1': '<p>This is a template[[template-2]]</p>',
  'template-2': '<span>This is a nested template</span>'
}

const infiniteNestedTemplateMock = {
  'template-1': '<span>This is a template[[template-2]]</span>',
  'template-2': '<span>This is a nested template[[template-1]]</span>'
}

const tooManyNestedTemplatesErrorMessage = 'Too many nested templates!!'

describe('applyTemplates function', () => {
  it('Returns the same page if page has no templates in it and no templates are provided to the function.', () => {
    expect(applyTemplates(pageWithoutTemplatesMock)).to.equal(pageWithoutTemplatesMock)
  })
  it('Returns the same page if page has templates in it and no templates are provided to the function.', () => {
    expect(applyTemplates(pageWithOneTemplateMock)).to.equal(pageWithOneTemplateMock)
  })
  it('Returns the same page if page has no templates in it and templates are provided to the function.', () => {
    expect(applyTemplates(pageWithoutTemplatesMock, templatesMock)).to.equal(pageWithoutTemplatesMock)
  })
  it('Returns a new page with the template applied to it.', () => {
    expect(applyTemplates(pageWithOneTemplateMock, templatesMock)).to.equal(pageWithTemplateAppliedMock)
  })
  it('Returns a new page with the template applied to it even if the template is specified with spaces between the brackets.', () => {
    expect(applyTemplates(pageWithOneTemplateWithSpacesMock, templatesMock)).to.equal(pageWithTemplateAppliedMock)
  })
  it('Returns a new page with the nested template applied to it.', () => {
    expect(applyTemplates(pageWithOneTemplateMock, nestedTemplateMock)).to.equal(pageWithNestedTemplateAppliedMock)
  })
  it('Throws an error when trying to apply infinite nested templates to a page.', () => {
    expect(() => applyTemplates(pageWithOneTemplateMock, infiniteNestedTemplateMock))
      .to.throw(tooManyNestedTemplatesError)
      .and.be.an.instanceOf(Error)
      .with.property('message', tooManyNestedTemplatesErrorMessage)
  })
  it('Checks the function is called max 100 times when trying to apply infinite nested templates to a page.', () => {
    const spy = sinon.spy(applyOBJ, 'applyTemplates')
    expect(() => spy(pageWithOneTemplateMock, infiniteNestedTemplateMock)).to.throw()
    expect(spy.callCount).to.equal(100)
  })
})
