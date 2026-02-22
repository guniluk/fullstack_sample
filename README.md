# Fullstack procedure

### React

- create folder A(fullstack)
  - open the folder A using vscode
- install react at B(client) folder  
  A> `npm create vite@latest B`
- A> `cd B`
- B> install tailwind
  - search 'tailwind vite' in google
  - select 'Installing Tailwind CSS with vite' site
  - confirm 'using Vite' is selected, and follow the steps in order
- B> organize the existing files
  - delete: App.css, public/vite.svg, src/assets/react.svg
  - change: App.jsx
- B> backup to git repository

  > git init.  
  > git add .  
  > git commit -m "first commit".
  - go to github
  - (github)create new repository
  - copy command lines and execute command at terminal(B folder)
  - see the git push result at github repository

- route & create pages
  - install library
    > `npm i react-router-dom`
  - create "pages" folder and make pages(Home and etc)
  - modify app.jsx
    > - `import { BrowserRouter, Routes, Route } from 'react-router-dom';`
    > - `import Home from './pages/Home';`.  
    >   `<BrowserRouter>`.  
    >   ` <Routes>`  
    >    `  <Route path="/" element={<Home />} />`.  
    >    `</Routes>`.  
    >   `</BrowserRouter>`
- create "components" folder and make components(Header and etc)
  - modify app.jsx (include "Header" component and etc)
  - modify Header.jsx (apply tailwind css)
  - navigate pages using Link.
    > `import { Link } from 'react-router-dom';`.  
    > &nbsp;&nbsp;`<Link to="/">`.  
    > &nbsp;&nbsp;&nbsp;&nbsp;`<li className="hidden sm:inline text-slate-700 hover:underline">`.  
    >  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Home`.  
    >  &nbsp;&nbsp;&nbsp;&nbsp;`</li>`.  
    > &nbsp;&nbsp;`</Link>`

### Express

- 1
- 2
- 3

### DB(MongoDB)

- 1
- 2
- 3

# Various syntax

- can use HTML, but why? <h3 style="color:red">hello</h3>
- To create new line, end a line with two or more spaces, and then
  type return. <br/> or use br tag instead
- bold : **hello**
- italic : _hello_
- bold and italic : **_hello_**
- blockquotes
  > Hello  
  > World
- nestedquotes
  > Hello
  >
  > > World
- To add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab.

  > hello

- using '\&nbsp;' for indenting or spacing.  
   h&nbsp;&nbsp;e&nbsp;&nbsp;l&nbsp;&nbsp;l&nbsp;&nbsp;o

- Code blocks are normally indented four spaces or one tab. When they’re in a list, indent them eight spaces or two tab

- images: ![image](./public/boy1.png)
- code : `print("hello")`
- link : [google](https://google.com).
- url and e-mail : <https://www.google.com>
  <aaa@gmail.com>
