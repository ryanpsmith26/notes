# React Router

- ### **Router** just wraps the whole App Component
- ### **Route** sets up the path at which to render a Component
	- Route gives us access to three props: **match, history, location**
	- routeProps need to be explicitly passed to the component when using **render**
- ### **Link** is your clickable link that takes you to the path provided
	- Link will change the URL, provide a real path!


```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Red from './Red';
import Blue from './Blue';

class Main extends React.Component {
	render() {
		return (
			<Router>
				<Link to="/blue/1">Click for BLUE</Link>
				<Link to="/red/1">Click for RED</Link>

				<Route path="/blue/:id" component={Blue} />
				<Route path="/red/:id" component={Red} />
				</div> // ignore
				</div> // ignore
			</Router>
		)
	}
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
```