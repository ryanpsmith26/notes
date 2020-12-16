# Fullstack Boilerplate Procedure

## The Stack
- PostrgresSQL
- Express
- Sequelize
- React
- Redux

* * *

## Initialize Project
<details>
<summary>Click to expand</summary>

```zsh
mkdir project-name
cd project-name
npm init -y
git init
touch .gitignore

# setup project structure
mkdir client public server
```

#### .gitignore
```md
.DS_Store
node_modules
public/bundle.js
public/bundle.js.map
```
* * *
</details>

## Express Server
<details>
<summary>Click to expand</summary>

```zsh
npm i --save express morgan body-parser
```

#### server/app.js
```js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// logging middleware
app.use(morgan('dev'));

// serve static files
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware -- parses req.body!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount main router
app.use('/api', require('./api'));

// serve up our React app for any routes that don't match an api route
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling middleware
app.use(function(err, req, res, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // for deploying to Heroku!

app.listen(port, function() {
	console.log('Knock, knock');
	console.log("Who's there?");
	console.log(`Your server, listening on port ${port}`);
});
```

Get ahead by defining the main router, sub routers and wiring them up! (below is not required just to spin up server)

#### server/api/index.js
```js
const router = require('express').Router();

// mount the sub-routers
router.use('/users', require('./users'));
router.use('/projects', require('./projects'));

router.use((req, res, next) => {
	const err = new Error('API route not found!');
	err.status = 404;
	next(err);
});

module.exports = router;

```

#### server/api/projects.js
```js
const router = require('express').Router();
const { Project, User } = require('../db');

// GET /api/projects
router.get('/', async (req, res, next) => {
	try {
		const projects = await Project.findAll({
			include: [ { model: User } ]
		});
		res.json(projects);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
```

#### server/api/users.js
```js
const router = require('express').Router();
const { Project, User } = require('../db');

// GET /api/users
router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			include: [ { model: Project } ]
		});
		res.json(users);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
```
* * *
</details>

## React App
<details>
<summary>Click to expand</summary>

```zsh
# install DEV dependencies in project root
npm i --save-dev webpack webpack-cli @babel/core babel-loader @babel/preset-react @babel/preset-env

# install REG dependenvies in project root
npm i --save react react-dom react-router-dom
```

### Webpack / Babel

#### webpack.config.js
```js
module.exports = {
	entry: './client/app.js', // frontend ENTRY
	mode: 'development',
	output: {
		path: __dirname,
		filename: './public/bundle.js' // frontout OUTPUT
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
```

At this point, webpack knows to use babel (from babel-loader in the config). Now we need to tell babel how to parse our code:

#### .babelrc
```js
{
  "presets": ["@babel/preset-react", "@babel/preset-env"]
}
// OR
{
  "presets": ["env", "react"]
}

// babel-present-env rewrites ES6+ code into ES5
// babel-preset-react turns JSX into React.createElement calls
```

These installations and configs are, in theory, all you need to get a React app up and running. However, you may still run into issues with ES6+ (if you see runtime regenerator errors, keep reading...)

First line of defense here is babel-polyfill.

```zsh
npm i --save babel-polyfill
```

#### webpack.config.js
```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"],
};
```
#### Babel Overview
- babel-core: parses and outputs transformed code
- babel-preset-env: determines Babel plugins and polyfills needed for an env
- babel-polyfill: transforms code into ES5... handles things like arrow functions which cannot be written in ES5 code. Also handles Promise, Map, Object.assign. It depends on (and includes) core-js to do this.

### Create React App

#### public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles.css" />
    <script defer src="/bundle.js"></script>
    <title>Project Name</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
#### public/styles.css
```css
* {
	box-sizing: border-box;
}

body {
	margin: 0;
	font-family: monospace;
	font-size: 1rem;
	color: #404040;
	line-height: 1.6;
}

img {
	max-width: 100%;
	display: block;
}
```

#### client/app.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';

ReactDOM.render(
  <Home />,
  document.getElementById('app'))
```

#### client/componenets/Home.js
```js
import React from 'react';

const Home = () => {
	return <h1>Hello World!</h1>;
};

export default Home;
```

### Serve it up!

#### package.json
```js
...
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server",
    "start-dev": "webpack -w & nodemon server"
}
...
```

```zsh
# run webpack in watch mode and spin up our express server!!
npm run start-dev
```

At this point we should be able to view our Hello World message in the browser. Commit those changes.
* * *
</details>


## CSS in React
<details>
<summary>Click to expand</summary>

Above we have simply loaded our CSS file into the index.html the same way we would any other application.

We have a few alternatives available to us thought.

One library we can use is **styled-components**

```zsh
npm i --save styled-components
```

With this dependency installed, we can simply import it into any React component and start creating styled, wrapper elements. See example:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Counter from './Counter';
import Stack from './Stack';

const Wrapper = styled.div`
	width: 80%;
	margin: 0 auto;
`;

const Section = styled.div`margin-bottom: 100px;`;

ReactDOM.render(
	<Wrapper>
		<h1>Machine Learning w/ Brain.js!</h1>
		<Section>{<Counter />}</Section>
		<Section>{<Stack />}</Section>
	</Wrapper>,
	document.getElementById('app')
);
```

Another option is to import our CSS file right into our main React app (entry pt). To do this, you'll also need to install **css-loader** and **style-loader**. Then add a rule to the **webpack.config**.
* * *
</details>

## Redux Store
<details>
<summary>Click to expand</summary>

```zsh
npm i --save redux react-redux redux-thunk redux-logger
```

#### client/store.js
```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import appReducer from './redux';

const store = createStore(appReducer, applyMiddleware(thunkMiddleware, createLogger()));

export default store;
```

#### client/redux/index.js
```js
// ACTION TYPES ========================================

// ACTION CREATORS =====================================

// THUNK CREATORS ======================================

// INITIAL STATE =======================================
const initialState = {};

// REDUCER =============================================
function appReducer(state = initialState, action) {
	return state;
}

export default appReducer;
```

#### client/app.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Home from './components/Home';

ReactDOM.render(
	<Provider store={store}>
		<Home />
	</Provider>,
	document.getElementById('app')
);
```
At this point, the redux store should be all wired in ready to be defined and then utilized inside components (with connect from redux-redux). Make a commit!
* * *
</details>

## Sequelize
<details>
<summary>Click to expand</summary>

```zsh
createdb boilermaker

npm i --save sequelize pg pg-hstore
```

#### server/db/database.js
```js
const Sequelize = require('sequelize');

// process.env is for deployment to Heroku!
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {
	logging: false
});

module.exports = db;

```

#### server/db/index.js
```js
const db = require('./database');
const User = require('./user');
const Project = require('./project');

User.belongsToMany(Project, { through: 'UserProjects' });
Project.belongsToMany(User, { through: 'UserProjects' });

module.exports = {
	db,
	User,
	Project
};
```

#### server/db/user.js
```js
const Sequelize = require('sequelize');
const db = require('./database');

const User = db.define('User', {
	name: Sequelize.STRING
});

module.exports = User;

```

#### server/db/project.js
```js
const Sequelize = require('sequelize');
const db = require('./database');

const Project = db.define('Project', {
	title: Sequelize.STRING
});

module.exports = Project;
```
#### server/app.js
```js
// now we can remove the app.listen from this file but we need to add:

module.exports = app;
```

#### start.js
```js
const { db } = require('./server/db');
const app = require('./server');

const port = process.env.PORT || 3000; // for deploying to Heroku!

db.sync().then(() => {
	console.log('db synced');
	app.listen(port, () => {
		console.log('Knock, knock');
		console.log("Who's there?");
		console.log(`Your server, listening on port ${port}`);
	});
});
```

#### package.json
```json
...
"main": "start.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start": "node start.js",
		"start-dev": "webpack -w & nodemon start.js"
    }
...
```

At this point, you should be able to ^c out of the server and spin it again up with the new location and see your models defined in Postico, for example. Make a commit!
* * *
</details>

## Seed Database
<details>
<summary>Click to expand</summary>

#### seed.js
```js
const { green, red, cyan, blue } = require('chalk');
const { db, Project, User } = require('./server/db');

async function seed() {
	try {
		console.log(cyan('📡 Connecting to the database...'));
		// Connect to the database
		await db.sync({ force: true });
		console.log(blue('🌱 Seeding the database...'));

		// Seed the database
		await Project.create({ title: 'Project One' });
		await Project.create({ title: 'Project Two' });
		await User.create({ name: 'Vince' });
		await User.create({ name: 'Rich' });
		const users = await User.findAll();
		await users[0].addProject(1);
		await users[1].addProject(1);

		// Close the database connection
		console.log(green('🌲 Finished seeding the database!'));
		await db.close();
	} catch (err) {
		console.log(red('🔥 An error occured!!'));
		console.error(err);
		await db.close();
	}
}

seed();
```
```zsh
node seed.js # optionally create a script for this!
```
* * *
</details>

## Authentication
<details>
<summary>Click to expand</summary>

```zsh
npm i --save express-session passport connect-session-sequelize
```
### Create Database Session Store

#### server/app.js
```js
...
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { db } = require('./db');
...
// db session store
const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

// session middleware
app.use(
	session({
		// set secret on deployment server
		secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
		store: dbStore,
		resave: false,
		saveUninitialized: false
	})
);
...
```

### Initialize Passport

#### server/app.js
```js
...
const passport = require('passport');
...
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// run once per session (after req.login() usually)
passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

// runs for every req (with serialized user on session)
// passport uses the user.id from serializing and re-obtains user in DB
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => done(null, user)).catch(done);
});
...
```

### Encrypt Passwords

#### server/db/user.js
```js
const Sequelize = require('sequelize');
const db = require('./database');
const crypto = require('crypto');
const _ = require('lodash');

const User = db.define(
	'User',
	{
		name: Sequelize.STRING,
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING
		},
		salt: {
			type: Sequelize.STRING
		}
	},
	{
		hooks: {
			beforeCreate: setSaltAndPassword,
			beforeUpdate: setSaltAndPassword
		}
	}
);

// instance methods
User.prototype.correctPassword = function(candidatePassword) {
	return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function() {
	return _.omit(this.toJSON(), [ 'password', 'salt' ]);
};

User.prototype.hasMatchingPassword = function(password) {
	// untested
	return password === this.password;
};

// class methods
User.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
	const hash = crypto.createHash('sha1');
	hash.update(plainText);
	hash.update(salt);
	return hash.digest('hex');
};

function setSaltAndPassword(user) {
	// we need to salt and hash again when the user enters their password for the first time
	// and do it again whenever they change it
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password, user.salt);
	}
}

module.exports = User;
```

### Login / Logout / Sign up / Stay in

#### server/api/auth.js
```js
// NOTE: this files was previously server/api/user.js

const router = require('express').Router();
const { User } = require('../db');

// GET /api/auth/me
router.get('/me', (req, res, next) => {
	res.json(req.user);
});

// PUT /api/auth/login
router.put('/login', (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then((user) => {
			if (!user) res.status(401).send('User not found');
			else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
			else {
				req.login(user, (err) => {
					if (err) next(err);
					else res.json(user);
				});
			}
		})
		.catch(next);
});

// POST /api/auth/signup
router.post('/signup', (req, res, next) => {
	User.create(req.body)
		.then((user) => {
			req.login(user, (err) => {
				if (err) next(err);
				else res.json(user);
			});
		})
		.catch(next);
});

// DELETE /api/auth/logout
router.delete('/logout', (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.sendStatus(204);
});

module.exports = router;
```
* * *
</details>

## Google OAuth
<details>
<summary>Click to expand</summary>

```zsh
npm i --save passport-google-oauth
```

- See OAuth note for how to set up a new Google project and obtain your keys.
- Protect your keys in a secrets.js file, see Security: Covering Secrets note for more info.
- Add a google_id field to the User model.
- Create an oauth.js router and mount it on your auth.js router (api/auth/google)
- Create the GET routes for /api/auth/google & /api/auth/google/callback.
- Finally, create Google strategy and register it with passport.

#### server/api/oauth.js
```js
if (process.env.NODE_ENV === 'development') {
	require('../../secrets'); // this will mutate the process.env object with your secrets.
}
const router = require('express').Router();
const { User } = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function(token, refreshToken, profile, done) {
	const googleId = profile.id;
	const name = profile.displayName;
	const email = profile.emails[0].value;

	User.findOne({ where: { googleId: googleId } })
		.then(function(user) {
			if (!user) {
				return User.create({ name, email, googleId }).then(function(user) {
					done(null, user);
				});
			} else {
				done(null, user);
			}
		})
		.catch(done);
});

// register our strategy with passport
passport.use(strategy);

// GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: 'email' }));

// GET /api/auth/google/callback
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

module.exports = router;
```
* * *
</details>

## Testing
Refer to **Testing: FSA Stack Testing!**
* * *