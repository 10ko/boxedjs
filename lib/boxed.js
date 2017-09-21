const fs = require('fs-extra');
const _ = require('lodash');
const defaultConfig = require('./default-config.json');

module.exports = {
  compile: (boxedrc) => {
    const conf = !_.isEmpty(boxedrc)
        && boxedrc.folders ? boxedrc : defaultConfig;
    const folders = conf.folders;

    let pages = {};
    let fragments = {};
    let jsonPages = {};

    console.log('Welcome to boxedjs.');
    console.log(`Preparing to compile ${conf.name}...`);

    console.log('-- Removing old dist/ folder');
    fs.removeSync(folders.dist);
    fs.mkdirSync(folders.dist);

    console.log('-- Loading html pages...');
    fs.readdirSync(folders.pages)
      .filter((item) => {
        return item.indexOf('.html') > -1;
      }).forEach((item) => {
        const itemKey = item.substring(0, item.length - 5);
        pages[itemKey] = fs.readFileSync(`${folders.pages}/${item}`, 'utf8');
      });

    console.log('-- Loading json pages...');
    fs.readdirSync(folders.pages)
      .filter((item) => {
        return item.indexOf('.json') > -1;
      }).forEach((item) => {
        const itemKey = item.substring(0, item.length - 5);
        jsonPages[itemKey] = JSON.parse(fs.readFileSync(`${folders.pages}/${item}`, 'utf8'));
      });

    console.log('-- Loading fragments...');
    fs.readdirSync(folders.fragments)
      .filter((item) => {
        return item.indexOf('.html') > -1;
      }).forEach((item) => {
        const itemKey = item.substring(0, item.length - 5);
        fragments[itemKey] = fs.readFileSync(`${folders.fragments}/${item}`, 'utf8');
      });

    console.log('-- Generating Pages from html...');
    Object.keys(pages).forEach((pageKey) => {
      let fragmentdPage = pages[pageKey];
      Object.keys(fragments).forEach((fragmentKey) => {
        fragmentdPage =
          fragmentdPage.replace(`[[${fragmentKey}]]`, fragments[fragmentKey]);
      });
      fs.writeFile(`${folders.dist}/${pageKey}.html`, fragmentdPage, (err) => {
        if (err) {
          console.log(err);
          process.exit();
        }
      });
    });

    console.log('-- Generating Pages from json...');
    Object.keys(jsonPages).forEach((pageKey) => {
      const pageContent = jsonPages[pageKey];
      const template = pageContent.template;
      const path = `${folders.dist}/${pageContent.path}`;
      // console.log(pageContent.content.content);
      // Load template
      let fragmentdPage = fs.readFileSync(`${folders.templates}/${template}`, 'utf8');

      // Load variables in template
      const templateVarsRegex = /[^\[\[\[]+(?=\]\]\])/g;
      const vars = fragmentdPage.match(templateVarsRegex);

      // Repleace each variable in page
      vars.forEach((varName) => {
        const trimmedVar = varName.trim();
        fragmentdPage =
          fragmentdPage.replace(`[[[${varName}]]]`, pageContent.content[trimmedVar]);
      });

      // Replace each fragment in page
      Object.keys(fragments).forEach((fragmentKey) => {
        fragmentdPage =
          fragmentdPage.replace(`[[${fragmentKey}]]`, fragments[fragmentKey]);
      });

      // Write page to file
      fs.mkdirSync(path);
      fs.writeFile(`${path}/index.html`, fragmentdPage, (err) => {
        if (err) {
          console.log(err);
          process.exit();
        }
      });
    });

    if (fs.pathExistsSync(folders.assets)) {
      console.log('-- Copying asset folder');
      fs.copySync(folders.assets, folders.dist);
    }

    console.log();
    console.log('Finished! You can find your website in the dist/ folder.');
  },

  createNewProject: (projectName) => {
    if (fs.pathExistsSync(projectName)) {
      console.log(`It seems like the folder ${projectName} already exists.`);
      console.log(`exiting...`);
      process.exit(1);
    } else {
      fs.mkdirSync(projectName);
      console.log(`Successfully created ${projectName}`);
      console.log('Copying fragment...');
      fs.copySync(`${__dirname}/templates/simple-website`, projectName);
      console.log(`Done! You'll find the new project at ${projectName}`);
    }
  },
};
