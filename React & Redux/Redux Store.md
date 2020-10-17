# Redux: store.js

```bash
npm i redux
```

```js
import { createStore } from 'redux';

// define our reducer function that runs when we attempt to change state (dispatch)
const reducer = (state = { key1: 0, key2: [] }, action) => {
	
	switch (action.type) {
		case 'count up':
			return { 
				...state,
				key1: state.key1 + action.amount };
		
		case 'count down':
			return { 
				...state,
				key1: state.key1 - action.amount };
		
		default:
			return state;
			
	}
};

// create our store -- vault
const store = createStore(reducer);


// action types as vars
const COUNTUP = "COUNT UP"
const COUNTDOWN = "COUNT DOWN"

// action creator -- function that returns an action object
const countUp = (amount) => {
  return {
    type: COUNTUP,
    amount: amount
    }
} 

const countDown = (amount) => {
  return {
    type: COUNTDOWN,
    amount: amount
    }
}

// the below would typically happen in a React Component file (if using React). We would export our Action Creator and import it into the Component file:

const display = document.getElementById('display');
const buttonUp = document.getElementById('btn-up');
const buttonDown = document.getElementById('btn-down');

// call dispatch method -- invoke action creator function to return the object -- attempting to modify the state here!
buttonUp.onclick = () => store.dispatch(countUp(1));

buttonDown.onclick = () => store.dispatch(countDown(1));

// if the state gets updated, this will execute!
store.subscribe(() => {
	display.innerText = `${store.getState().key}`;
});
```
* * *
**Redux Bank*