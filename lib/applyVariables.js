const applyVariables = (page, content, counter) => {
  const templateVarsRegex = /[^\[\[\[]+(?=\]\]\])/g;
  if (!counter) counter = 0;
  if (counter >= 100) {
    throw new Error('TooManyNestedVariables');
  }
  const matches = page.match(templateVarsRegex);
  if (!matches || matches.length === 0) {
    return page;
  }

  matches.forEach((match) => {
    const trimmedMatch = match.trim();
    page = page.replace(`[[[${match}]]]`, content[trimmedMatch]);
  });

  return applyVariables(page, content, counter + 1);
};

exports.applyVariables = applyVariables;
