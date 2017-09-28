const generateFromHTML = (page, templates, counter) => {
  const templateVarsRegex = /[^\[\[]+(?=\]\])/g;
  if (!counter) counter = 0;
  if (counter >= 100) {
    throw new Error('TooManyNestedTemplates');
  }
  const matches = page.match(templateVarsRegex);
  if (!matches || matches.length === 0) {
    return page;
  }

  matches.forEach((match) => {
    const trimmedMatch = match.trim();
    page = page.replace(`[[${match}]]`, templates[trimmedMatch]);
  });

  return generateFromHTML(page, templates, counter + 1);
};

exports.generateFromHTML = generateFromHTML;
