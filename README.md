# 【Fullstack procedure】
#### ✭Folder : A(project), B(client), C(api or server)  
## ◼︎ React

- (1) create project folder A(fullstack)   
- (2) install react at B(client) folder  
    - A> `npm create vite@latest B`  
    - A> `cd B`  
<hr/>   

- (3) B> install tailwind as below procedure(optional)         
  - search 'tailwind vite' in google   
  - select 'Installing Tailwind CSS with vite' site(https://tailwindcss.com)   
  - confirm 'using Vite' is selected, and follow the steps in order  
  <hr/>

- (4) B> organize the existing files   
  - delete: App.css, public/vite.svg, src/assets/react.svg  
  - change: App.jsx(in "src" folder)  
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

- (23) route & create pages(B folder(client))    
  - install library   
    > `npm i react-router-dom`  
  - create "pages" folder in "src" folder of B(client), and make pages(Home, etc)  
  - modify app.jsx  
    > `import { BrowserRouter, Routes, Route } from 'react-router-dom';`  
    > `import Home from './pages/Home';`    
    > `<BrowserRouter>`    
    > &nbsp;&nbsp;` <Routes>`    
    > &nbsp;&nbsp;&nbsp;&nbsp; `  <Route path="/" element={<Home />} />`    
    > &nbsp;&nbsp; `</Routes>`    
    > `</BrowserRouter>`  

- (24) create "components" folder in "src" folder of B(client), and make components(Header.jsx)  
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
  - if globally installed before, it doesn't need to install again  
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

### (27) auth(signup) procedure (server(C)/Insomnia/MongoDB)  
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
  > A> `npm i bcryptjs`  
- modify auth.controller.js  
  > `import bcryptjs from 'bcryptjs';`  
  > `export const signup = async (req, res) => {`  
  > `const { username, email, password } = req.body;`  
  > `const hashedPassword = bcrypt.hashSync(password, 10);`  
  > `const newUser = new User({ username, email, password: hashedPassword });`   
- send POST request at Insomnia for other user, and in Mongo DB site, check new user is created with encrypted password  
<hr/>  

### (28) middleware handling errors (Server(C))
- add middleware to handle errors in index.js
  > `app.use((err, req, res, next) => {`  
  > `const statusCode = err.statusCode || 500;`  
  > `const message = err.message || 'Internal Server Error';`  
  > `return res.status(statusCode).json({`  
  > &nbsp;&nbsp;`success: false,`  
  > &nbsp;&nbsp;`statusCode,`  
  > &nbsp;&nbsp;`message,`  
  > &nbsp;&nbsp;`});`  
  > `});`  
- modify controller file(auth.controller.js)  
  > `export const signup = async (req, res, next) => {`  
  > &nbsp;&nbsp;`catch (err) {`  
  > &nbsp;&nbsp;`next(err);`  
  > &nbsp;&nbsp;`}`  
  > `};`  
<hr/>  

### (29) handling errors manually if needed (Server (C))
- make "utils" folder and "error.js"
> `export const errorHandler = (statusCode, message) => {`  
>  `const error = new Error();`  
>  `error.message = message;`  
>  `error.statusCode = statusCode;`  
>  `return error;`  
> `};`  
- use if needed in controller or other file  


### (30) auth(sign-up) procedure  (Client (B))  
- make form in "SignUp.jsx" page  
  > `import { useState } from 'react';`  
  > `export default function SignUp() {`  
  > `const [formData, setFormData] = useState({});`<br/>
  > `const handleChange = (e) => {`  
  > &nbsp;&nbsp;`setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));`  
  > `};`<br/>  
  > `const handleSubmit = async (e) => {`  
  > &nbsp;&nbsp;`e.preventDefault();`  
  > &nbsp;&nbsp;`const res = await fetch('/api/auth/signup', {`  
  > &nbsp;&nbsp;   `method: 'POST',`  
  > &nbsp;&nbsp;   `headers: {`  
  > &nbsp;&nbsp;     `'Content-Type': 'application/json',`  
  > &nbsp;&nbsp;   `},`  
  > &nbsp;&nbsp;   `body: JSON.stringify(formData),`  
  > &nbsp;&nbsp; `});`  
  > &nbsp;&nbsp; `const data = await res.json();`  
  > &nbsp;&nbsp; `setFormData({});`  
  > &nbsp;&nbsp;`};`<br/>  
  > `return (`  
  > `<div>`  
  >&nbsp;&nbsp;    `<h1>Sign Up</h1>`  
  >&nbsp;&nbsp;    `<form. onSubmit={handleSubmit}>`  
  >&nbsp;&nbsp;      `<input id="username" onChange={handleChange} />`  
  >&nbsp;&nbsp;      `<input id="email" onChange={handleChange} />`  
  >&nbsp;&nbsp;      `<input id="password" onChange={handleChange} />`  
  >&nbsp;&nbsp;      `<button> Sign Up </button>`  
  >&nbsp;&nbsp;    `</form>`  
  > `</div>`  
  > `);`  
  > `}`   

- set proxy at vite.config.js  
> `server: {`  
> &nbsp;&nbsp;`proxy: {`  
> &nbsp;&nbsp;&nbsp;&nbsp;`'/api': {`  
> &nbsp;&nbsp;&nbsp;&nbsp;`target: 'http://localhost:3000',`  
> &nbsp;&nbsp;&nbsp;&nbsp;`secure: false,`  
> &nbsp;&nbsp;&nbsp;&nbsp;`},`  
> &nbsp;&nbsp;`},`  
> `},`  

- run both frontend and backend :   
  > B(client)> `npm run dev`
  > A(server, not C)> `npm run dev`
- send Form message at Fronted(B)  and check if it is created in the DB  
<hr/>  

### (31) loading & error handling (Client (B) page(signUp.jsx))  
- set disalbed attribute when loading, and set error message and display when error. when normal, navigate to sign-in page 
  > ...
  > `import { Link, useNavigate } from 'react-router-dom';`  
  > `export default function SignUp() {`  
  > `const [error, setError] = useState(null);`  
  > `const [loading, setLoading] = useState(false);`  
  > `const navigate = useNavigate();`  
  > ...
  > `const handleSubmit = async (e) => {`  
    > `e.preventDefault();`  
    > `try {`  
    >  &nbsp;&nbsp;`setLoading(true);`  
    >  &nbsp;&nbsp;`const res = await fetch('/api/auth/signup', {`  
    >    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`method: 'POST', headers: {'Content-Type': 'application/json',},`  
    >    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`body: JSON.stringify(formData)});`  
    >  `const data = await res.json();`  
    >  `if (data.success === false) {`  
    >    &nbsp;&nbsp;&nbsp;&nbsp;`setLoading(false);`  
    >    &nbsp;&nbsp;&nbsp;&nbsp;`setError(data.message);`  
    >    &nbsp;&nbsp;&nbsp;&nbsp;`return;}`  
    >  `setLoading(false);`  
    >  `setError(null);`
    >  `setFormData({});`  
    >  `navigate('/sign-in');`  
    >`} catch (error) {`  
    >  &nbsp;&nbsp;&nbsp;&nbsp;`setLoading(false);`  
    >  &nbsp;&nbsp;&nbsp;&nbsp;`setError(error.message);`  
    >`}`  
  > `return (`  
  > ...
  >   &nbsp;&nbsp;&nbsp;&nbsp;`<button disabled={loading}>`  
  >     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `{loading ? 'Signing up...' : 'Sign Up'}`  
  >  &nbsp;&nbsp;&nbsp;&nbsp; `</button>`  
  >   &nbsp;&nbsp;&nbsp;&nbsp; `{error && (<div> {error} </div>)}`  
  > ...
  >`)`  
  > `}`  

### (32) sign-in procedure (api(C))  
- install "jsonwebtoken" at A(fullstack)  
  > A> `npm i jsonwebtoken`  
- add sign-in function in "auth.controller.js"  
  > ...  
  > `import { errorHandler } from '../utils/error.js';`  
  > `import jwt from 'jsonwebtoken';`  
  > ...
  > `export const signin = async (req, res, next) => {`  
  > `const { email, password } = req.body;`  
  > `try {`  
  > &nbsp;&nbsp; `const validUser = await User.findOne({ email });`  
  > &nbsp;&nbsp; `if (!validUser) {`  
  > &nbsp;&nbsp; `  return next(errorHandler(404, 'User not found!'));}`  
  > &nbsp;&nbsp; `const isPasswordValid = bcryptjs.compareSync(password, validUser.password);`  
  > &nbsp;&nbsp; `if (!isPasswordValid) {`  
  > &nbsp;&nbsp; `  return next(errorHandler(401, 'Invalid password!'));}`  
  > &nbsp;&nbsp; `const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);`  
  > &nbsp;&nbsp; `const { password: pass, ...rest } = validUser._doc;`  
  > &nbsp;&nbsp; `res.cookie('access_token', token, {httpOnly: true,`  
  > &nbsp;&nbsp; `    expire: new Date(Date.now() + 1000 * 60 * 60 * 24)})`  
  > &nbsp;&nbsp; `   .status(200).json(rest);`  
  >  `} catch (error) {next(error);}`  
  > `}`  
- add 'signin" route to "auth.route.js"  
  >`...`  
  >`import { signup, signin } from '../controllers/auth.controller.js';`  
  >`router.post('/signin', signin);`  
  >`...`  
- there no coding in "index.js", because middleware is already included
  > `import authRouter from './routes/auth.route.js';`  
  > `app.use('/api/auth', authRouter);`  
- at insomnia, try login and see the result(check if password is not included, and token is created )  
  > POST : lcalhost:3000/api/auth/signin  
  > BODY(JSON) :  
  > {"email" : "bbb@bbb.com", "password" : "bbb"}  
<hr/>  

### (33) make signin.jsx page in client(B), much like signUp.jsx(copy and modify)  
### (34)  Redux : use received data(`res.json(rest)`) from "auth.controller.js"(server) at every Client(B) pages    
- install redux toolkit at B(client)  
  > B> `npm i @reduxjs/toolkit react-redux`  
- create folder and file: src/redux/store.js  
- code store.js  
  > `import { configureStore } from '@reduxjs/toolkit';`  
  > `export const store = configureStore({`  
  > `reducer: {},`  
  > `middleware: (getDefaultMiddleware) =>`  
  > `getDefaultMiddleware({serializableCheck: false,}),`  
  > `});`  
- modify "main.jsx"   
  > `import { Provider } from 'react-redux';`  
  > `import { store } from './redux/store';`  
  > ...  
  > `<Provider store={store}>`  
  > `<App />`  
  > `</Provider>`    
- create a Redux Static Slice  
   - make folder("user") in "redux" folder  
   - make "userSlice.js" in "user"  
    > `import { createSlice } from '@reduxjs/toolkit';`    
    > `const initialState = {`  
    > &nbsp;&nbsp;`currentUser: null,`  
    > &nbsp;&nbsp;`error: null,`  
    > &nbsp;&nbsp;`loading: false,`  
    > `};`  
    > `export const userSlice = createSlice({`  
    > `name: 'user',`  
    > `initialState,`  
    > `reducers: {`  
    > `singnInStart: (state) => {state.loading = true;},`  
    > `signInSuccess: (state, action) => {`  
    > &nbsp;&nbsp;`state.currentUser = action.payload;`  
    > &nbsp;&nbsp;`state.loading = false;`  
    > &nbsp;&nbsp;`state.error = null;`  
    > `},`  
    > `signInFailure: (state, action) => {`  
    > &nbsp;&nbsp;`state.error = action.payload;`  
    > &nbsp;&nbsp;`state.loading = false;`  
    > `},`  
    > `},`  
    > `});`  
    > `export const { singnInStart, signInSuccess, signInFailure } = userSlice. actions;`  
    > `export default userSlice.reducer;`  
- modify store.js  
  > ...  
  > `import userReducer from './user/userSlice';`  
  > ...  
    `reducer: {user: userReducer,},`  
  > ...  
- apply dispatch to pages (signin.jsx)
  > ...  
  > `import { useDispatch, useSelector } from 'react-redux';`  
  > `import {signInStart, signInSuccess, signInFailure,} from '../redux/user/userSlice';`  
  > `export default function SignIn() {`  
  > ...  
  > // const [error, setError] = useState(null);  
  > // const [loading, setLoading] = useState(false);  
  > `const { error, loading } = useSelector((state) => state.user);`  
  > ...  
  > `const dispatch = useDispatch();`  
  > ...  
  > `const handleSubmit = async (e) => {`  
  >  ...  
  >  `try {`  
  >    // setLoading(true);  
  >    `dispatch(signInStart());`  
  >    ...  
  >    `if (data.success === false) {`  
  >      // setLoading(false);  
  >      // setError(data.message);  
  >      `dispatch(signInFailure(data.message));`  
  >      `return;`  
  >    `}`  
  >    // setLoading(false);  
  >    // setError(null);  
  >    `dispatch(signInSuccess(data));`  
  >    ...  `
  >  `} catch (error) {`  
  >    // setLoading(false);  
  >    // setError(error.message);
  >    `dispatch(signInFailure(error.message));`  
  >  `}`  
  > `};`    





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