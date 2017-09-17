#!/usr/bin/env node

const watch = require('node-watch');
const program = require('commander');
const boxed = require('./lib/boxed');
const {isFileValidForWatch} = require('./lib/utils');
const packagejson = require('./package.json');


program
  .version(packagejson.version)
  .option('-w, --watch', 'Watch functionality. It will rebuild the website '
    + 'whenever a file changes.')
  .option('-n, --new <name>', 'Create new project')
  .parse(process.argv);


if (program.new) {
  boxed.createNewProject(program.new);
  process.exit(0);
}

if (program.watch) {
  watch('.', {recursive: true, filter: isFileValidForWatch}, (evt, name) => {
    console.log('%s changed.', name);
    boxed.compile();
  });
} else {
  boxed.compile();
}
