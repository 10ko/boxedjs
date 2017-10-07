#!/usr/bin/env node

const watch = require('node-watch')
const program = require('commander')
const boxed = require('./lib/boxed')
const { watchFilter } = require('./lib/utils')
const packagejson = require('./package.json')
const boxedrc = require('rcfile')('boxed')

program
  .version(packagejson.version)
  .option('-w, --watch', 'Watch functionality. It will rebuild the website ' +
    'whenever a file changes.')

program
  .command('create [template...]')
  .action((args) => {
    let projectName = 'Untitled Project'
    let projectTemplate = 'simple-website'
    if (args.length === 2) {
      projectTemplate = args[0]
      projectName = args[1]
      console.log(`Creating new project from template: "${projectTemplate}" with name: "${projectName}".`)
    }
    if (args.length === 1) {
      projectName = args[0]
      console.log(`Creating new project from template: "default" with name: "${projectName}".`)
    }
    if (args.length === 0) {
      console.log(`Creating new project from template: "default" with name: "Untitled Project".`)
    }
    boxed.createNewProject(projectTemplate, projectName)
    process.exit(0)
  })

program.parse(process.argv)

if (program.watch) {
  watch('.', {recursive: true, filter: watchFilter}, (evt, name) => {
    console.log('%s changed.', name)
    boxed.compile(boxedrc)
  })
} else {
  boxed.compile(boxedrc)
}
