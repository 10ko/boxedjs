#!/usr/bin/env node

const fs = require('fs-extra');

main = () => {
  let pages = {};
  let templates = {};
  console.log('hello!');

  fs.readdirSync('./pages')
    .filter((item) => {
      return item.indexOf('.html') > -1;
    }).forEach((item) => {
      const itemKey = item.substring(0, item.length - 5);
      pages[itemKey] = fs.readFileSync(`./pages/${item}`, 'utf8');
    });

  fs.readdirSync('./templates')
    .filter((item) => {
      return item.indexOf('.html') > -1;
    }).forEach((item) => {
      const itemKey = item.substring(0, item.length - 5);
      templates[itemKey] = fs.readFileSync(`./templates/${item}`, 'utf8');
    });

  fs.removeSync('dist');
  fs.mkdir('dist');

  Object.keys(pages).forEach((pageKey) => {
    let templatedPage = pages[pageKey];
    Object.keys(templates).forEach((templateKey) => {
      templatedPage = templatedPage.replace(`[[${templateKey}]]`, templates[templateKey])
    });
    fs.writeFile(`dist/${pageKey}.html`, templatedPage, (err) => {
      if(err) {
        console.log(err);
        process.exit()
      }
    });
  });

  console.log('done');
  // console.log('pages: ', pages);
  // console.log('templates: ', templates);

}



main();