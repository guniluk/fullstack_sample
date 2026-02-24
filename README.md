# 【Fullstack procedure】

## ◼︎ React

- (1) create project folder A(fullstack)  
  - open the folder A using vscode  
- (2) install react at B(client) folder  
    - A> `npm create vite@latest B`  
    - A> `cd B`  
<hr/>   

- (3) B> install tailwind as below procedure(optional)         
  - search 'tailwind vite' in google   
  - select 'Installing Tailwind CSS with vite' site   
  - confirm 'using Vite' is selected, and follow the steps in order  
  <hr/>

- (4) B> organize the existing files   
  - delete: App.css, public/vite.svg, src/assets/react.svg  
  - change: App.jsx  
  <hr/>

- (5) B> backup to git repository   
  - check & add "node_modules" to ".gitignore"  
  > git init   
  > git add .   
  > git commit -m "first commit"  
  - go to github site  
  - create new repository  
  - copy command lines and execute command at terminal(B folder)  
  - see the git push result at github site repository  
<hr/>  

- (23) route & create pages(B folder)    
  - install library   
    > `npm i react-router-dom`  
  - create "pages" folder and make pages(Home and etc)  
  - modify app.jsx  
    > - `import { BrowserRouter, Routes, Route } from 'react-router-dom';`  
    > - `import Home from './pages/Home';`    
    >   `<BrowserRouter>`    
    >   &nbsp;&nbsp;` <Routes>`    
    >   &nbsp;&nbsp;&nbsp;&nbsp; `  <Route path="/" element={<Home />} />`    
    >   &nbsp;&nbsp; `</Routes>`    
    >   `</BrowserRouter>`  

- (24) create "components" folder and make components(Header.jsx)  
  - apply tailwind css    
  - navigate using "Link"  
    > `import { Link } from 'react-router-dom';`    
    > &nbsp;&nbsp;`<Link to="/">`   
    > &nbsp;&nbsp;&nbsp;&nbsp;`<li className="hidden sm:inline text-slate-700 hover:underline">`    
    >  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Home`   
    >  &nbsp;&nbsp;&nbsp;&nbsp;`</li>`   
    > &nbsp;&nbsp;`</Link>`    
- (25) modify app.jsx (include "Header" component)  
    > `<BrowserRouter>`  
    > `<Header />`  
    > `<Routes>`  
    > `<Route path="/" element={} />`   
    > `</Routes>`   
    > `</BrowserRouter>`  

## ◼︎ Express   
- (6) go to project folder A(fullstack)  
- (7) init npm : A>`npm init -y`  
- (8) install express(in A folder)  
  > A>`npm i express`  
- (9) install nodemon : A>`npm i nodemon -D`   
  - if globally installed before, this process doesn't need  
- (10) modify package.json    
  > `"type": "module"`   
  > `"scripts": {`    
  > &nbsp;&nbsp;&nbsp;&nbsp;`"dev": "nodemon api/index.js",`   
  > &nbsp;&nbsp;&nbsp;&nbsp;`"start": "node api/index.js"}`    
- (11) create server folder C(api) in A      
- (12) make "index.js" at C folder  
  > `import express from 'express';`    
  > `const app = express();`    
  > `app.use(express.json());`  
  > `const port = 3000;`   
  > `app.listen(port, () => {`    
  > `console.log(`Server is running on port ${port}`) });`  
  <hr/>  
- (13) create routes folder and route file(user.route.js) in C folder(api)   
  > `import express from 'express';`   
  > `import { test } from '../controllers/user.controller.js';`   
  > `const router = express.Router();`   
  > `router.get('/test', test);`   
  > `export default router;`   

  <hr/>   
- (14) create controllers folder and controller file(user.controller.js) in C folder(api)   
  > `export const test = (req, res) => {`   
  > &nbsp;&nbsp;`res.json({ message: 'Test API route working!' });`   
  > `};`  

- (15) connect routes to index.js     
  > `import userRouter from './routes/user.route.js';`   
  > `app.use('/api/users', userRouter);`  
  <hr/>

#### (16) Change git folder (B → A)  
- B(client)> `mv .git ../`  
- move ".gitignore" in B to A     
  - check & add "node_modules", ".env" to ".gitignore"  
- move "README md file" in B to A(if exists)  
- git commit & push(at A folder)  
  > `git add .`   
  > `git commit -m "~~~"`   
  > `git push`  

## ◼︎ MongoDB  
- (17) install mongoose at A(fullstack)   
  > A> `npm i mongoose`   
- (18) At MongoDB site, create new project  
  - input project name(fullstack)   
  - change or confirm username, password and click create user  
  - choose connectton method → select Drivers  
  - At mongoDB site, select NETWORK ACCESS, IP Acess List, Add IP Adress    
    Access List Entry: 0.0.0.0, Comment:test   
- (19) create ".env" file in A(fullstack)  
  > `MONGO = "Mongodb_site_url"`  
- (20) install "dotenv" at A(fullstack)  
  > `npm i dotenv`  
- (21) Add connection string into "index.js"  
    > `import mongoose from 'mongoose';`  
    > `import dotenv from 'dotenv';`  
    > `dotenv.config();`  
    > `mongoose`  
    > `.connect(process.env.MONGO)`  
    > `.then(() => {`  
    > `console.log('Connected to MongoDB!');})`  
    > `.catch((err) => {`  
    > `console.error('Error connecting to MongoDB:', err);});`  

- (22) add ".env" to ".gitignore"  
  > .env  
  <hr/>  
- (26) create "models" folder in C folder(api) and make schema and model(user.model.js)   
  > `import mongoose from 'mongoose';`    
  > `const userSchema = new mongoose.Schema(`       
  > `{`      
  > &nbsp; &nbsp;`username: {`      
  > &nbsp; &nbsp;&nbsp; &nbsp;`type: String,`      
  > &nbsp; &nbsp;&nbsp; &nbsp;`required: true,`      
  > &nbsp; &nbsp;&nbsp; &nbsp;`unique: true,`      
  > &nbsp; &nbsp;`},`      
  > &nbsp; &nbsp;`password: {`     
  > &nbsp; &nbsp;&nbsp; &nbsp;`type: String,`    
  > &nbsp; &nbsp;&nbsp; &nbsp;`required: true,`   
  > &nbsp; &nbsp;`},`   
  > `},`   
  > &nbsp; &nbsp;`{ timestamps: true },`   
  > `);`   
  > `const User = mongoose.model('User', userSchema);`   
  > `export default User;`   
<hr/>   

### (27) auth(signup) procedure (server/Insomnia/MongoDB)  
- make auth.route.js in routes folder  
  > `import express from 'express';`  
  > `import { signup } from '../controllers/auth.controller.js';`    
  > `const router = express.Router();`   
  > `router.post('/signup', signup);`    
  > `export default router;`    
- make auth.controller.js in controllers folder  
  > `import User from '../models/user.model.js';`  
  > `export const signup = async (req, res) => {`  
  > `const { username, email, password } = req.body;`  
  > `const newUser = new User({ username, email, password });`  
  > `try {`  
  > &nbsp;&nbsp;`await newUser.save();`  
  > &nbsp;&nbsp;`res.status(201).json({ message: 'User created successfully!' });`  
  > `} catch (err) {`  
  > &nbsp;&nbsp;`console.error('Error creating user:', err);`  
  > &nbsp;&nbsp;`return res.status(500).json({ message: 'Internal server error' });`  
  > `}`   
  > `};`   
- connect auth.route.js to index.js   
  > `import authRouter from './routes/auth.route.js';`  
  > `app.use('/api/auth', authRouter);`  

- send POST request at Insomnia
  > POST : localhost:3000/api/auth/signup  
  > BODY(JSON)  
    `{`  
	  `"username" : "test",`
	  `"email" : "test@test.com",`
	  `"password" : "test1"`
	  `}`  
- in Mongo DB site, check new user is created   
- install bcryptjs at A(fullstack) for password encryption  
  > `npm i bcryptjs`  
- modify auth.controller.js  
  > `import bcryptjs from 'bcryptjs';`  
  > `export const signup = async (req, res) => {`  
  > `const { username, email, password } = req.body;`  
  > `const hashedPassword = bcrypt.hashSync(password, 10);`  
  > `const newUser = new User({ username, email, password: hashedPassword });`   
- send POST request at Insomnia for other user, and in Mongo DB site, check new user is created with encrypted password  
<hr/>  





# 【ETC】   
### ✓ work at various PCs(A → A and B)   
- B> git clone "github_address" (Just once at first)  
  - project_dir> npm install(each package.json)  
  - project_dir> make and code .env  
  - coding  
  - git add, commit, and push  
- afterwards both A and B do the next process  
  - git pull origin main  
  - git add .  
  - git commit -m "work of A(or B)"  
  - git push origin main  
- always "git push" when get off work, always "git pull" when start work  

### ✓ mrkdown syntax  
- can use HTML, but why?  
  <h3 style="color:red">hello</h3>
- To create new line, end a line with two or more spaces, and then type return. <br/> or use br tag instead  
- bold : **hello**  
- italic : _hello_  
- bold and italic : **_hello_**  
- blockquotes  
  > Hello  
  > World  
- nestedquotes  
  > Hello  
  > > World  
- To add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab.  
  > hello  
- using '\&nbsp;' for indenting or spacing   
   h&nbsp;&nbsp;e&nbsp;&nbsp;l&nbsp;&nbsp;l&nbsp;&nbsp;o  
- Code blocks are normally indented four spaces or one tab. When they’re in a list, indent them eight spaces or two tab  
- images:  
![image1](client/public/byh.jpg)  
![Image2](https://github.com/user-attachments/assets/af165e4b-b509-4425-a77e-1521621eea5f)  
- code : `print("hello")`  
- link : [google](https://google.com)  
- url and e-mail : <https://www.google.com>
  <aaa@gmail.com>  