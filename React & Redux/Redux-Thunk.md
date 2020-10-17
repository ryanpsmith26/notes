# Redux-Thunk

- **redux-thunk** and **thunkMiddleware** are there for us when we need to make async requests to a database, to update our Redux store.
- It's just one option, not the only game in town in terms of middleware for async handling in Redux.
- All the middleware is really doing is intercepting action creators that return funcs (rather than objects) -- THUNKS -- and resolves them ( gets data THEN calls the action creator which returns the object ) before sending control to the reducer.
* * *
```bash
npm i redux-thunk # plus others
```

## **store.js**
```js
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPE
const GOT_PETS_FROM_SERVER = 'GOT_PETS_FROM_SERVER';

// ACTION CREATOR
export const gotPets = (petsArray) => {
	return {
		type: GOT_PETS_FROM_SERVER,
		pets: petsArray
	};
};

// THUNK CREATOR
export const getPets = () => {
	return async (dispatch) => {
		const { data: pets } = await axios.get('/pets');
		const action = gotPets(pets);
		dispatch(action)
	};
};
// the ^THUNK^ should be invoked in our React Component now instead of the action creator *see pets.js

// INITIAL STATE
const initialState = {
	pets: []
};

// REDUCER
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GOT_PETS_FROM_SERVER:
			return { ...state, pets: action.pets };
		default:
			return state;
	}
};

const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middlewares);

export default store;
```

## **pets.js**
```js
import { connect } from 'react-redux';
import { List } from './utils';
import { getPets } from './store';

class Pets extends React.Component {

	// invoking our THUNK when the component mounts
	componentDidMount() {
		this.props.getPets();
	}

	render() {
		// availble to us as result of mapState below
		const { pets } = this.props;

		return (
			<div>
				<List
					forEachOfThese={pets}
					doThis={(pet) => (
						<div key={pet.id}>
							<img src={pet.imageUrl} />
							<p>{pet.name}</p>
						</div>
					)}
					unlessEmpty={() => <div>Where are the pets?!?</div>}
				/>
			</div>
		);
	}
}
```
```js
const mapState = (state) => {
	return {
		pets: state.pets
	};
};

const mapDispatch = (dispatch) => {
	return {
		// set our THUNK to this.props.getPets
		getPets: () => dispatch(getPets())
	};
};

export default connect(mapState, mapDispatch)(Pets);
```
* * *
**Thunk Middleware*