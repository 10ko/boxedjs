# boxedjs
Yet another templating engine.

### Why?
While working on my personal website, which is just static HTML and CSS, I realised I would need some very basic templating system.
I didn't want to clutter the project with too powerful or overly-complicated engines, just to repeat my footer and header in all the pages of the website.

So I wrote this.

**NOTE:** This is intended as an *experiment* and nothing more.


### Install

```
npm install -g boxedjs
```

### Project structure
The script needs to be run in the root folder of the project and it expects the following project structure:
```
/
├── assets/
├── pages/
├── templates/
```
where the content of the folders is the following:
- `assets`: contains all the styling files, images and other files but html.
- `pages`: contains the pages of your website
- `templates`: contains the templates used inside the `pages`

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
boxedjs
```
The website will be exported in the `dist/` folder.

You can find more in the example/ folder

### TODO:
- create-new-project script
- Configuration file for handling different folder structure
- ...
