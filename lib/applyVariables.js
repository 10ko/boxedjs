const tooManyNestedVariablesError = new Error('Too many nested variables!!')

const applyVariables = (page, content, counter) => {
  const templateVarsRegex = /[^[[[]+(?=]]])/g
  if (!counter || counter < 0) counter = 0
  if (counter >= 99) {
    throw tooManyNestedVariablesError
  }
  const matches = page.match(templateVarsRegex)
  if (!matches || matches.length === 0 || !content) {
    return page
  }

  matches.forEach((match) => {
    const trimmedMatch = match.trim()
    page = page.replace(`[[[${match}]]]`, content[trimmedMatch])
  })

  return this.applyVariables(page, content, counter + 1)
}

exports.applyVariables = applyVariables
exports.tooManyNestedVariablesError = tooManyNestedVariablesError
