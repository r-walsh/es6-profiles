##ES6 Profile
**The goal**: Once you have completed this tutorial you will have experience with gulp, ES6, and Babel. You will have created a functional gulpfile, run a fully ES6 backend using babel-register, and compile an ES6 Angular front end into browser runnable code.

###Step One: Set up and install dependencies
As usual when starting a new project, run `npm init -y` to create a `package.json` file. Once that is created, set up your basic folder structure, it should be built something like this:

```
es6-profile
--/main
----/components
----/styles

--/server
----/components
------/profile

--/dist
----index.html
----/src
----/styles

--gulpfile.js
--package.json
--server.js
--index.js
--.gitignore
```

As you can see from above, we'll be following a component based architecture for this project. All of our pre-compiled front end code will be going into the `/main` directory, it will then be compiled and placed inside of `/dist/src` by gulp.

Luckily we don't need to worry about this for the back end, where we will be using babel-register to compile our code on the fly.

Let's move on to installing dependencies, run `npm i babel babel-core babel-preset-es2015 babel-register body-parser cors express mongoose --save`. Here we install our standard server dependencies as well as a handful of Babel dependencies.

+ `babel`: This is the primary Babel module, required for the others to run.
+ `babel-core`: This is the core of the actual Babel compiler itself.
+ `babel-preset-es2015`: This is the presets that we are telling Babel to follow to compile our code.
+ `babel-register`: This is the plugin that allows us to transpile our server side code on the fly, rather than running it through a build system such as gulp.

###Step Two: Server set up.
The first thing we need to do is tell Babel what presets we want it to be using, we will do this by adding a new property to our `package.json`:

```json
  "babel": {
    "presets": ["babel-preset-es2015"]
  },
```

This is also often done inside of a `.babelrc` file, but either will accomplish the same result.

The next step will be to add two lines of code to our `index.js` file:

```javascript
require('babel-core/register');
require('./server.js')
```

This code will simply pull in our `server.js` file and run it through the Babel compiler via babel-register. And that's all we need to do to start writing our back end in ES6! Babel will handle the rest for us. To test this, let's set up a basic express server in ES6.

```javascript
//server.js
import express from 'express'; // ES6 module import syntax
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express(); // const declarations for immutable values
const port = 8910;
const mongoUri = `mongodb://localhost:27017/es6-profiles`;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + `/dist`));

mongoose.connect(mongoUri);
mongoose.connection.once(`open`, () => { // arrow function
    console.log(`Connected to MongoDB at ${ mongoUri }.`); // template string
});

app.listen(port, () => {
    console.log(`Listening on ${ port }`);
});
```

Run this the same way you normally would (`nodemon index.js`) and you should see in the console: `Listening on 8910`.

_______

Now we can move on to setting up the rest of the server for real functionality. Inside of `/server/components/profile` we will need three new files: `Profile.js`, `profileCtrl.js`, `profileRoutes.js`.

+ `Profile.js` will export our profile schema by default. Should contain:
    * `name`: A string that is required.
    * `age`: A number that is required.
    * `profileImage`: A string, with a default value of http://i.imgur.com/mO6d21x.jpg
    * `skills`: An array of strings.
    * `lovesJavascript`: A boolean with a default of `true`.
+ `profileCtrl.js` will export individual functions to handle basic CRUD requests.
+ `profileRoutes.js` will export a set of routes, linked to each function in our `profileCtrl`, by default.

Build these out as best you can using ES6 syntax and test using postman before checking the following completed snippets.

+ [Schema](https://gist.github.com/r-walsh/5d9bbaf70ba47dba4269)
+ [Controller](https://gist.github.com/r-walsh/a27b1722287e7595ec5a)
+ [Routes](https://gist.github.com/r-walsh/b4e8210b80dc007e622d)
+ [Server](https://gist.github.com/r-walsh/53b8909b35726b7bfd29)

That's it! We now have a fully functional back end written in ES6 and compiled using babel-register.
