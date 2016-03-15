##ES6 Profile
**The goal**: Once you have completed this tutorial you will have experience with webpack, ES6, and Babel. You will have created a functional Webpack config, run a fully ES6 backend using babel-register, and compile an ES6 Angular front end into browser runnable code.

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

--webpack.config.js
--package.json
--server.js
--index.js
--.gitignore
```

As you can see from above, we'll be following a component based architecture for this project. All of our pre-compiled front end code will be going into the `/main` directory, it will then be compiled and placed inside of `/dist/src` by Webpack.

Luckily we don't need to worry about this for the back end, where we will be using babel-register to compile our code on the fly.

Let's move on to installing dependencies, run `npm i babel-core babel-preset-es2015 babel-register body-parser cors express mongoose --save`. Here we install our standard server dependencies as well as a handful of Babel dependencies.

+ `babel`: This is the primary Babel module, required for the others to run.
+ `babel-core`: This is the core of the actual Babel compiler itself.
+ `babel-preset-es2015`: This is the presets that we are telling Babel to follow to compile our code.
+ `babel-register`: This is the plugin that allows us to transpile our server side code on the fly, rather than running it through a build system such as Webpack.

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
require('./server.js');
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

###Step Three: Front end dependencies and Webpack setup.

First things first, we are going to install webpack and the dependencies we will be using in our config. If you don't already have webpack installed on your machine, run `npm install webpack webpack-dev-server -g` to install it globally and to be able to run `webpack` or `webpack-dev-server` from your command line.

Next we will install our webpack dev-dependencies: `npm i webpack webpack-dev-server babel-loader css-loader html-loader style-loader --save-dev`. You'll notice that we are saving these only to our dev-dependencies. This just means that these dependencies are only necessary to a developer, not someone who would simply wish to download and run the code.

These loaders are how Webpack handles importing different file types that are not supported by default.

Now write a Webpack config in such a way that it will:
1. Handle imports of all JS, CSS, and HTML files.
2. Compile ES6 to ES5.
3. Output a single file named `bundle.js` that handles all of our CSS and JS.
4. Works with `webpack-dev-server`.

You can test this by creating an `app.js` and `rootCtrl.js` in your `/main/components` folder. Inside of `rootCtrl` add the following code:
```javascript
let x = `test`;
$scope.test = x;
```

Set up your `index.html` in `/dist` with script tags linking to the Angular CDN and your `bundle.js`, then bind `{{ test }}` to the view.

If you run into problems, here is an example of a working [config](https://gist.github.com/r-walsh/3850ff3423f8ac1cd6fb).

###Step Four: Building out the Angular front end.

Now that we have a functional ES6 back end and a working Webpack config for the front end, let's finish up the project by creating an ES6 Angular front end.

This app will have just two components:
+ Profile: Displays all user information stored in profiles.
+ NewProfile: Form that allows the posting of a new profile to the database.

Write out these components to the best of your ability using ES6 syntax when appropriate. For an example of a possible solution see the [solution branch](https://github.com/r-walsh/es6-profiles/tree/solution) of this project.

###Black Diamond:

+ **Expand!** Find uses for object literals, template strings, the spread operator! It doesn't have to be a perfect use case. Get comfortable with the syntax!
+ Add support for a CSS pre-processor in your Webpack config. LESS/SASS/Stylus are all good options. They are easy to learn the basics of and look great on a resume.
+ Implement a build system and ES6 syntax into your personal project!
