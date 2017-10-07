const tooManyNestedTemplatesError = new Error('Too many nested templates!!')

const applyTemplates = (page, templates, counter) => {
  const templateVarsRegex = /[^[[]+(?=]])/g
  if (!counter || counter < 0) counter = 0
  if (counter >= 99) {
    throw tooManyNestedTemplatesError
  }
  const matches = page.match(templateVarsRegex)
  if (!matches || matches.length === 0 || !templates) {
    return page
  }

  matches.forEach((match) => {
    const trimmedMatch = match.trim()
    page = page.replace(`[[${match}]]`, templates[trimmedMatch])
  })

  return this.applyTemplates(page, templates, counter + 1)
}

exports.applyTemplates = applyTemplates
exports.tooManyNestedTemplatesError = tooManyNestedTemplatesError
