# OAuth

### Outline
- When: the client requests OAuth login
    - Server should:
        - redirect to OAuth provider (sending along callback url)

- When: the client pings callback url
    - Server should:
        - Use the temporary code it receives to also authenticate with the provider
        - Once authenticated, store the permanent access token and/or other received user information
        - Finally should respond to client with login success landing page

### Steps
#### Configure Google App
- Google Help (create client ID) https://support.google.com/cloud/answer/6158849?hl=en
- Google Cloud Platform Console https://console.cloud.google.com/getting-started

- create Google project and client ID
- enable Google+ API

#### Backend
- apply passport middleware between express-session and API middleware
- update user model to include "googleId" field
- handle all routes at /auth/google inside main auth router with an app.use pointing to oauth.js router
- inside oauth.js, create a router to handle get requests for:
    - authentication and login: GET /auth/google
    - after google has authenticated: GET /auth/google/callback
- now passport and OAuth are properly communicating but we will need to define our Strategy for things to work
- 

#### Frontend
- create OauthLoginForm Component
- render simple form with method set to get and action set to an auth route
- button with type set to submit
* * *

```zsh
npm i passport passport-google-oauth
```

### server/app.js

```js
// between Session middleware and routes:

// Passport middleware
// these setup passpost middleware so that passport can integrate with our session
app.use(passport.initialize());
app.use(passport.session()); // also establishes req.user for any middleware below it
```

### server/db.js
```js
const User = db.define('user', {
  ...
  googleId: Sequelize.STRING,
  ...
})
```

### server/auth.js
```js
...

// mount oauth router at top of auth router
router.use('/google', require('./oauth'));

// place this above our /me get route handler for a local login so we can serve a google user if it exists
router.get('/me', (req, res, next) => {
	res.json(req.user || {});
});

...

// edit our put route to utilize passports login method
router.put('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
				password: req.body.password
			}
		});
		if (!user) {
			res.sendStatus(401);
		} else {
			// attach user id to the session
			req.login(user, (err) => (err ? next(err) : res.json(user)));
		}
	} catch (error) {
		next(error);
	}
});

// add a check for a google user and log them out for our delete request
router.delete('/logout', (req, res) => {
  ...
	// remove google user if exists
	if (req.user) {
		// passport method
		req.logout();
  }
  ...
});
```

### server/oauth.js
```js
const router = require('express').Router();
const { User } = require('./db');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = router;

// see Security: Covering Secrets to hide credentials!

// credientials are the first parameter passed into our strategy
const googleCredentials = {
	clientID: '945128124558-b38ko7guolicfiopc186hjg6fs0fkuaj.apps.googleusercontent.com',
	clientSecret: 'j3ProCcskNDTHeRbVL3WHt7A',
	callbackURL: '/auth/google/callback'
};

// veridication callback is the second parameter passed into our strategy
const verificationCallback = async (token, refreshToken, profile, done) => {
	// grab user info from profile that google provides us with
	const info = {
		name: profile.displayName,
		email: profile.emails[0].value,
		imageUrl: profile.photos ? profile.photos[0].value : undefined
	};

	try {
		// find or add google supplied info into our db
		const [ user ] = await User.findOrCreate({
			// check if user is already in db!
			where: { googleId: profile.id },
			defaults: info
		});
		done(null, user); // passport takes user obj and attaches it to req.session!
	} catch (err) {
		done(err);
	}
};

// gets triggered by our done cb on line 31
// happens ONCE when the user logs in with google
passport.serializeUser((user, done) => {
	// store the user.id on the session (somewhere)
	done(null, user.id);
});

// gets triggered by our passport session middleware
// happens for EVERY request
passport.deserializeUser(async (id, done) => {
	try {
		// attaches this user to req.user
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// define the strategy
const strategy = new GoogleStrategy(googleCredentials, verificationCallback);

// passport will look up our defined strategy when we call passport.authenticate below
passport.use(strategy);

// GET /auth/google -- tied to Login with Google button
router.get('/', passport.authenticate('google', { scope: 'email' }));

// GET /auth/google/callback -- passport.authenticate will automatically send us to google, google will make req back to this path after sign-in
router.get(
	'/callback',
	passport.authenticate('google', {
		successRedirect: '/home',
		failureRedirect: '/'
	})
);
```

### client/oauth-login-form.js
```js
import React from 'react'

const OauthLoginForm = (props) => {
  return (
    <form method='get' action='/auth/google'>
      <button type='submit' className='btn bg-red white p1 rounded'>Login with Google</button>
    </form>
  )
}

export default OauthLoginForm
```