# React-Redux Connect

On a broad level, the react-redux framework helps us in a few ways:
- It gives our entire React app access to the Redux Store (that is, if we wrap the whole app with the Provider Component) **see client/index.js*
- It takes care of some of the legwork of explicitly defining subscriptions, un-subscriptions, etc.
- connect is used at the component level to "beef up" that component, but no need to worry about the store once you've wrapped the app up in Provider!
* * *
```bash
npm i react react-dom redux react-redux
```

## **client/store.js** 
**NOTE**: there is nothing special about our store; not importing react-redux here
```js
import { createStore } from 'redux';

// ACTION TYPES
const ADD_GROCERY = 'ADD_GROCERY';

// ACTION CREATORS
let nextId = 0;
export const addGrocery = (text) => ({
	type: ADD_GROCERY,
	id: nextId++,
	text
});
// notice we (named) export the action creator here
// this is not unique to using react-redux, the magic of react-redux happens in our React Component

// REDUCER
const reducer = (prevState = { groceries: [] }, action) => {
	switch (action.type) {
		case ADD_GROCERY:
			const newGrocery = {
				id: action.id,
				text: action.text,
				bought: false
			};
			return {
				...prevState,
				groceries: [ ...prevState.groceries, newGrocery ]
			};
		
		default:
			return { ...prevState };
	}
};

// STORE
const store = createStore(reducer);

export default store;
```

## **client/index.js**
```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
```
## **client/components/App.js**
**NOTE:** again, nothing special here, no action / extra steps needed on App.js
```JSX
import React from 'react';
import Footer from './Footer';
import AddGrocery from './AddGrocery';
import GroceryList from './GroceryList';

const App = () => (
	<div className="app">
		<img src="groceries.png" alt="Groceries" width="500" />
		<div className="list">
			<AddGrocery />
			<GroceryList groceries={[]} />
			<Footer />
		</div>
	</div>
);

export default App;
```

## **client/components/AddGrocery.js**
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGrocery } from '../store';

class AddGrocery extends Component {
	constructor(props) {
		super(props);
    // NOTE: just managing some local state ...locally (specific only to this Component)
    // Would be overkill to manage this input field in our Redux store
    this.state = {
			input: ''
		};
		this.handleKey = this.handleKey.bind(this);
	}

	handleKey(evt) {
		if (evt.key === 'Enter') {
			this.props.add(this.state.input);
			this.setState({ input: '' });
		}
	}

	render() {
		return (
			<div className="add-grocery">
				<input
					type="text"
					value={this.state.input}
					onChange={(evt) => this.setState({ input: evt.target.value })}
					onKeyDown={this.handleKey}
				/>
				<button
					onClick={() => {
						this.props.add(this.state.input);
						this.setState({ input: '' });
					}}
				>
					Add Grocery
				</button>
			</div>
		);
	}
}
```
```js
// HERE'S THE MAGIC!

// this is not needed in our example (comes from GroceryList.js) but is included here for reference to syntax
const mapStateToProps = (state) => {
	return {
		// REACT ON LEFT -- REDUX ON RIGHT
		groceries: state.groceries
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// REACT ON LEFT -- REDUX ON RIGHT
		// notice the anon func
		add: (groceryItem) => dispatch(addGrocery(groceryItem))
	};
};

export default connect(null, mapDispatchToProps)(AddGrocery);
```
Some notes on the above:
- **mapState / mapDispatch** give us access to our store state obj and to store.dispatch
- we define the key (that will be added to our Component props obj on the left)
- the right side is where we can interact with the Redux store
- **connect** function is passed our mapState and mapDispatch funcs
- **connect** is then invoked with our component as the argument
- this will return a "beefed up" component that takes care of our subscriptions, etc.

* * *
**Redux-Groceries*