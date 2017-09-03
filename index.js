#!/usr/bin/env node

const fs = require('fs-extra');

main = () => {
  let pages = {};
  let templates = {};
  console.log('Welcome to boxedjs.');

  console.log('-- Removing old dist/ folder');
  fs.removeSync('dist');
  fs.mkdir('dist');

  console.log('-- Loading pages...');
  fs.readdirSync('./pages')
    .filter((item) => {
      return item.indexOf('.html') > -1;
    }).forEach((item) => {
      const itemKey = item.substring(0, item.length - 5);
      pages[itemKey] = fs.readFileSync(`./pages/${item}`, 'utf8');
    });

  console.log('-- Loading templates...');
  fs.readdirSync('./templates')
    .filter((item) => {
      return item.indexOf('.html') > -1;
    }).forEach((item) => {
      const itemKey = item.substring(0, item.length - 5);
      templates[itemKey] = fs.readFileSync(`./templates/${item}`, 'utf8');
    });

  console.log('-- Generating Pages...');
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

  if (fs.pathExistsSync('assets')) {
    console.log('-- Copying asset folder');
    fs.copySync('assets', 'dist');
  }

  console.log();
  console.log('Finished! You can find your website in the dist/ folder.');
}

main();