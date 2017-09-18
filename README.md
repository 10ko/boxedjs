# boxedjs
A simple static HTML templating engine.


[![npm Package](https://img.shields.io/npm/v/boxedjs.svg?style=flat-square)](https://www.npmjs.org/package/boxedjs)
[![Travis](https://img.shields.io/travis/10ko/boxedjs.svg?style=flat-square)]() [![downloads per month](http://img.shields.io/npm/dm/boxedjs.svg?style=flat-square)](https://www.npmjs.org/package/boxedjs)


### Why?
While working on my personal website, which is just static HTML and CSS, I realised I would need some very basic templating system.
I didn't want to clutter the project with too powerful or overly-complicated engines, just to repeat my footer and header in all the pages of the website.

So I wrote this.

**NOTE:** This is intended as an *experiment* and nothing more.


### Install

```
npm install -g boxedjs
```

### Create a new project
You can run either of the following:
```bash
boxed -n project-name
boxed --new project-name
```
in the folder where you want to start a new project.

This will create a new project called "project-name" in the current directory, containing a basic template and the right folder structure.


### Project structure
The script needs to be run in the root folder of the project and it expects the following project structure:
```
/
├── src/
    ├── assets/
    ├── pages/
    ├── templates/
├── .boxedrc
```
where the content of the folders is the following:
- `src/assets`: contains all the styling files, images and other files but html.
- `src/pages`: contains the pages of your website
- `src/templates`: contains the templates used inside the `pages`

### .boxedrc
This file contains the configuration for the project.
By default it has the following content:
```json
{
  "name": "Untitled project",     \\ name of the project
  "folders": {
    "pages": "src/pages",             \\ location containing the pages
    "templates": "src/templates",     \\ location containing the templates
    "assets": "src/assets",           \\ location containing the assets
    "dist": "dist"                \\ export directory (where your compiled website will be)
  }
}
```
Feel free to customise it to suit your project structure better.


### How to use the templates in a page
Whenever you want to use one of the `templates` in one of the `pages` you can require them like the following:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My templated website</title>
  </head>
  <body>
    [[header]] <!-- Template header.html -->
    <div>
      <p>Occaecat eu occaecat cupidatat et in dolore ullamco do dolore laboris magna deserunt in fugiat aute irure occaecat veniam tempor fugiat qui cillum ad aliquip dolore labore pariatur ut dolore est sit minim amet irure.
      </p>
    </div>
    [[footer]] <!-- Template footer.html -->
  </body>
</html>

```

### Export
Once you finished writing your HTML, you can just run:
```bash
cd root_of_project
boxed
```
The website will be exported in the `dist/` folder.

### Watch
You can run boxedjs specifying the option `-w` or `--watch`.
This will watch the full folder and will build a new version whenever there is a new change.
