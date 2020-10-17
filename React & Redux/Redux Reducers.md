# Redux: multiple reducers

## **reducer.js**
```js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roomsReducer from './roomsReducer';

export const AUTHENTICATED = 'AUTHENTICATED';
export const GOT_ROOMS = 'GOT_ROOMS';
export const BOOK_ROOM = 'BOOK_ROOM';

export default combineReducers({
	user: userReducer,
	rooms: roomsReducer
});
```

## **userReducer.js**
```js
import { AUTHENTICATED, BOOK_ROOM } from './reducer';

// add initial state comment here for clarity
const userReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			return action.payload;
		case BOOK_ROOM:
			return { ...state, bookedRoom: action.roomId };
		default:
			return state;
	}
};

export default userReducer;
```

## **roomReducer.js**
```js
import { GOT_ROOMS, BOOK_ROOM } from './reducer';

// add initial state comment here for clarity
const roomsReducer = (state = [], action) => {
	switch (action.type) {
		case GOT_ROOMS:
			return action.payload;
		case BOOK_ROOM:
			return state.map((room) => {
				if (room.id === action.roomId) {
					return { ...room, booked: true };
				} else {
					return room;
				}
			});
		default:
			return state;
	}
};

export default roomsReducer;
```

* * *
**Lab.CombineReducers*