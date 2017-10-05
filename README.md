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
You can create a project manually or with the project starter option:
```bash
boxed create [project-template] [project-name]
```
in the folder where you want to start a new project.

The available templates are `simple-website` and `simple-blog`.

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
  "name": "Untitled project",
  "folders": {
    "pages": "src/pages",
    "templates": "src/templates",
    "assets": "src/assets",
    "dist": "dist"
  }
}
```
Feel free to customise it to suit your project structure better.


### How to use the templates in a page
Whenever you want to use one of the `templates` in one of the `pages` you can require them like the following:
```html
<!-- src/pages/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>My templated website</title>
  </head>
  <body>
    [[header]] <!-- Template src/templates/header.html -->
    <div>
      <p>Occaecat eu occaecat cupidatat et in dolore ullamco do dolore laboris magna deserunt in fugiat aute irure occaecat veniam tempor fugiat qui cillum ad aliquip dolore labore pariatur ut dolore est sit minim amet irure.
      </p>
    </div>
    [[footer]] <!-- Template src/templates/footer.html -->
  </body>
</html>

```
The code above, will result in a page called index.html which will contain the injected content of the templates.

### How to create pages and apply templates to them
While the approach above can be enough if you want to build simple, and unique pages, what about more complex cases like a blog post?

Boxedjs allows you to specify pages in different formats (json or yaml) which contains information about a page, which will be then applied to a specific template. To follow the blog example, you could try to create a page like the following:

`src/pages/blog-post-1.json`
```json
{
  "path": "post-1",
  "template": "post",
  "content": {
    "title": "Blog post 1",
    "author": "Emanuele Libralato",
    "date": "22 September 2017",
    "content": "In do mollit eu magna eairure dolor excepteur et deserunt tempor duis commodo sed eiusmod in ullamco nisi sit eu est occaecat culpa excepteur."
  }
}
```
and then the template which will be applied to this page:

`src/templates/post.html`
```html
<!DOCTYPE html>
<html lang="">
  <body>
    <h1 class="text-center">Hello Human! This is a blog post</h1>
    <h1>[[[ title ]]]</h1>
    <h2>[[[ author ]]] - [[[ date ]]]</h2>
    <p>[[[ content ]]]</p>
  </body>
</html>
```

Boxedjs will generate a page called `dist/post-1/index.html`.
You can find more specific examples in the example folder.

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

### Examples
The folder `examples` of this repository contains the output of the two project templates `simple-website` and `simple-blog`.
