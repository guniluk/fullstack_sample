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

- go to A(fullstack)
- init npm : `npm init -y`
- install express(in A folder)
  > `npm i express`
- install nodemon : `npm i nodemon -D`
- modify package.json

  > `"type": "module"`.  
  > `"scripts": {`.  
  > &nbsp;&nbsp;&nbsp;&nbsp;`"dev": "nodemon api/index.js",`.  
  > &nbsp;&nbsp;&nbsp;&nbsp;`"start": "node api/index.js"}`

- create folder C(api)
- make "index.js" at C folder
  > `import express from 'express';`.  
  > `const app = express();`.  
  > `const port = 3000;`.  
  > `app.listen(port, () => {`.  
  > `console.log(`Server is running on port ${port}`) });`

### Change git folder (B → A)

- B(client)> `mv .git ../`
- move ".gitignore" in B to A
- move "README md file" in B to A(if exists)
- git commit & push(at A folder)
  > `git add .`<br>
  > `git commit -m "~~~"`<br>
  > `git push`

### DB

#### MongoDB

- install mongoose at A(fullstack)
  > A> `npm i mongoose`
- At MongoDB site, create new project
  - input project name(fullstack)
  - change or confirm username, password and click create user
  - choose connectton method
  - select Drivers
  - At mongoDB site, select NETWORK ACCESS, IP Acess List, Add IP Adress.  
    Access List Entry: 0.0.0.0, Comment:test
- create ".env" file in A(fullstack)
  > `MONGO = "Mongodb_site_url"`
- install "dotenv" at A(fullstack)

  > `npm i dotenv`
  - Add connection string into "index.js"

    > `import mongoose from 'mongoose';`<br/>
    > `import dotenv from 'dotenv';`<br/>
    > `dotenv.config();`<br/>

    > `mongoose`<br/>
    > `.connect(process.env.MONGO)`<br/>
    > `.then(() => {`<br/>
    > `console.log('Connected to MongoDB!');})`<br/>
    > `.catch((err) => {`<br/>
    > `console.error('Error connecting to MongoDB:', err);});`

- add to ".gitignore"
  > .env

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

- images: ![image](./client/public/boy1.png)
- code : `print("hello")`
- link : [google](https://google.com).
- url and e-mail : <https://www.google.com>
  <aaa@gmail.com>
