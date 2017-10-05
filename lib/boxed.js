const fs = require('fs-extra');
const path = require('path');
const klawSync = require('klaw-sync');
const yaml = require('js-yaml');

const _ = require('lodash');
const defaultConfig = require('./default-config.json');
const {applyTemplates} = require('./applyTemplates');
const {applyVariables} = require('./applyVariables');
const {isHTML, isJSON, isYAML} = require('./utils');

module.exports = {
  compile: (boxedrc) => {
    const conf = !_.isEmpty(boxedrc)
        && boxedrc.folders ? boxedrc : defaultConfig;
    const folders = conf.folders;

    let pages = {};
    let templates = {};
    let jsonPages = {};

    console.log('Welcome to boxedjs.');
    console.log(`Preparing to compile ${conf.name}...`);

    console.log('-- Removing old dist/ folder');
    fs.removeSync(folders.dist);
    fs.mkdirSync(folders.dist);

    console.log('-- Loading html pages...');
    fs.readdirSync(folders.pages)
      .filter(isHTML)
      .forEach((item) => {
        const itemKey = path.parse(item).name;
        pages[itemKey] = fs.readFileSync(`${folders.pages}/${item}`, 'utf8');
      });

    console.log('-- Loading json pages...');
    fs.readdirSync(folders.pages)
      .filter(isJSON)
      .forEach((item) => {
        const itemKey = path.parse(item).name;
        jsonPages[itemKey] = JSON.parse(fs.readFileSync(`${folders.pages}/${item}`, 'utf8'));
      });


    console.log('-- Loading yml pages...');
    fs.readdirSync(folders.pages)
      .filter(isYAML)
      .forEach((item) => {
        const itemKey = path.parse(item).name;
        jsonPages[itemKey] = yaml.safeLoad(fs.readFileSync(`${folders.pages}/${item}`, 'utf8'));
      });

    console.log('-- Loading templates...');
    const templatesRaw = klawSync(folders.templates, {filter: (item) => isHTML(item.path)});
    templatesRaw.map((item) => {
      const itemKey =
          path.parse(item['path']).name
          .replace(`${path.resolve('./')}/${folders.templates}/`, '');
      templates[itemKey] = fs.readFileSync(item['path'], 'utf8');
    });

    console.log('-- Generating Pages from html...');
    Object.keys(pages).forEach((pageKey) => {
      let fragmentdPage = applyTemplates(pages[pageKey], templates, 0);
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
      const templateKey = pageContent.template;
      const path = `${folders.dist}/${pageContent.path}`;

      // Load template
      let page = templates[templateKey];

      // Replace all variables
      page = applyVariables(page, pageContent.content);

      // Replace each fragment in page
      page = applyTemplates(page, templates);

      // Write page to file
      if (path !== `${folders.dist}/.`) {
        fs.ensureDirSync(path);
      }
      fs.writeFile(`${path}/index.html`, page, (err) => {
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

  createNewProject: (projectTemplateFromUser, projectName) => {
    let template = 'simple-blog';
    if (fs.pathExistsSync(projectName)) {
      console.log(`It seems like the folder ${projectName} already exists.`);
      console.log(`exiting...`);
      process.exit(1);
    }
    if (!fs.pathExistsSync(`${__dirname}/templates/${projectTemplateFromUser}`)) {
      console.log(`Template ${projectTemplateFromUser} not found. Using default.`);
    } else {
      template = projectTemplateFromUser;
    }
    fs.mkdirSync(projectName);
    console.log(`Successfully created "${projectName}".`);
    console.log('Copying project files');
    fs.copySync(`${__dirname}/templates/${template}`, projectName);
    let boxedrc = fs.readFileSync(`${projectName}/.boxedrc`, 'utf8');
    boxedrc = boxedrc.replace(/Untitled Project/g, projectName);
    fs.writeFileSync(`${projectName}/.boxedrc`, boxedrc, (err) => {
      console.log(err);
    });
    console.log(`Done! You'll find the new project at ${projectName}`);
  },
};
