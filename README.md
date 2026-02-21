# Fullstack procedure

- create folder(A=fullstack)
  - open the folder(A) using vscode
- install react at (B=client) folder  
  A> `npm create vite@latest B`
- A> `cd B`
- B> install tailwind
  - search 'tailwind vite' in google
  - select 'Installing Tailwind CSS with vite'
  - confirm 'using Vite' is selected, and follow the steps in order
- B> organize the existing files
  - delete: App.css, public/vite.svg, src/assets/react.svg
  - change: App.jsx
- B> backup to git repository

  > git init.  
  > git add .  
  > git commit -m "first commit".
  - go to github
  - create new repository
  - copy command lines and execute at terminal

-

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

- Code blocks are normally indented four spaces or one tab. When they’re in a list, indent them eight spaces or two tab

- images: ![image](./client/public/byh.jpg)
- code : `print("hello")`
- link : [google](https://google.com).
- url and e-mail : <https://www.google.com>
  <guniluk@gmail.com>
