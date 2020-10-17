# Login & Logout w/ React & Redux

#### Login:
- create a PUT route handler (in auth router) that expects an email and password in request
- check for user credentials in DB and serve up if match
- create a Thunk Creator that makes an axios put request to the put route (passing in user data)
- configure reducer to put that user on State
- from the **USER** home page Component, first check for user on State and redirect to **LOGIN** if necessary
- then from **LOGIN** page Component, dispatch the **login** thunk creator on login submission
- Finally, navigate to **USER** home page (still in **handleSubmit**)

#### Staying Logged in:
- apply session middleware on **app.js** (server)
- **edit** PUT route (in auth router) to put a userId on the req.session obj (if user exists in DB)
- **create** a GET route handler (in auth router) that checks for a userId on req.session and serves up user if so
- create a Thunk Creator that makes an axios get request to that get route
- then from the **MAIN** component, dispatch the **getMe** thunk creator on **componentDidMount**
- Finally, navigate to **USER** home page (still in **componentDidMount**)

#### Logout:
- create a DELETE route (in auth router) to destroy the session and sendStatus(204)
- create a Thunk Creator that makes an axios delete request to that delete route AND also resets initialState in the store
- dispatch the thunk creator onClick of logout button
- Finally, navigate to **LOGIN** page (still in **handleClick**)

* * *

### server/app.js

```js
// Session middleware
// gives us access to the req.session in routes -- initially {}
app.use(session({
  secret: 'Enter Secret Here',
  resave: false,
  saveUninitialized: false
}))
```

### server/auth.js
```js
const router = require('express').Router();
const { User } = require('./db');
module.exports = router;

// PUT /auth/login -- for logging user in
router.put('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
				password: req.body.password
			}
		});

		if (user) {
			// SET DATA FOR COOKIE
			req.session.userId = user.id;
			res.json(user);
		} else {
			const err = new Error('Incorrect email or password!');
			err.status = 401;
			next(err);
		}
	} catch (err) {
		next(err);
	}
});

// GET /auth/me -- for STAYING logged in
router.get('/me', async (req, res, next) => {
	try {
		if (req.session.userId) {
			const user = await User.findById(req.session.userId);
			if (user) {
				res.json(user);
			} else {
				res.sendStatus(404);
			}
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		next(err);
	}
});

// DELETE /auth/logout
router.delete('/logout', async (req, res, next) => {
	try {
		req.session.destroy();
		// alternatives are deleting userId key or setting to null, not as safe
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});
```

### client/store.js

```js
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Axios from 'axios';

// Action Types
const GET_USER = 'GET_USER';

// Action Creators
const gotMe = (user) => ({
	type: GET_USER,
	user
});

// Thunk Creators
export const login = (formData) => async (dispatch) => {
	try {
		const { data: user } = await Axios.put('/auth/login', formData);
		dispatch(gotMe(user));
	} catch (error) {
		console.error(error);
	}
};

export const getMe = () => async (dispatch) => {
	try {
		const { data: user } = await Axios.get('/auth/me');
		dispatch(gotMe(user));
	} catch (err) {
		console.error(err);
	}
};

export const logout = () => async (dispatch) => {
	try {
		await Axios.delete('/auth/logout');
		dispatch(gotMe(initialState.user));
	} catch (error) {
		console.error(error);
	}
};

// Initial State
const initialState = {
	user: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return { ...state, user: action.user };
		default:
			return state;
	}
};

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
```

### client/index.js
```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import store from './store'
import Login from './login'
import UserPage from './user-page'
import {getMe} from './store'

const Main = withRouter(class extends Component {
  async componentDidMount () {
    // for staying logged in
    store.dispatch(getMe())

    if (store.getState().user) {
      this.props.history.push('/home')
    }
  }

  render () {
    return (
      <Switch>
        <Route path='/home' component={UserPage} />
        <Route component={Login} />
      </Switch>
    )
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
```

### client/login.js
```js
import React from 'react';
import { connect } from 'react-redux';
import { login } from './store.js';

const Login = (props) => {
	const { handleSubmit } = props;

	return (
		<div className="h100 w100 flex column align-items-center justify-center">
			<h1>Let's Loggin'!</h1>
			<div className="flex w50">
				<img src="/loggin.png" />
				<form className="grow1" onSubmit={handleSubmit}>
					<div className="flex column">
						<div className="flex column m1">
							<label htmlFor="email">Email</label>
							<input type="email" name="email" className="input" />
						</div>
						<div className="flex column m1">
							<label htmlFor="email">Password</label>
							<input type="password" name="password" className="input" />
						</div>
						<div className="m1">
							<button type="submit" className="btn bg-blue white p1 rounded">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
```
```js
const mapDispatchToProps = (dispatch, ownProps) => {
    // history is on props from <Route />
    const history = ownProps.history;

	return {
		async handleSubmit(evt) {
			evt.preventDefault();
			let email = evt.target.email.value;
			let password = evt.target.password.value;
			await dispatch(
				login({
					email,
					password
				})
			);
			history.push('/home');
		}
	};
};

export default connect(null, mapDispatchToProps)(Login);
```

### client/user-page.js
```js
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from './store';

const UserPage = (props) => {
	const { handleClick, user } = props;

    // always check if user is logged in (on-state) and redirect to login page if not:
	if (!user.id) {
		return <Redirect to="/" />;
	}

	return (
		<div className="h100 w100 flex column align-items-center justify-center">
			<div className="flex">
				<img className="rounded mr1" />
				<h1>Welcome back!</h1>
			</div>
			<div>
				<button className="btn bg-red white p1 rounded" onClick={handleClick}>
					Logout
				</button>
			</div>
		</div>
	);
};
```
```js
const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	// history is on props from <Route />
	const history = ownProps.history;

	return {
		async handleClick() {
			await dispatch(logout());
			history.push('/login');
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
```


