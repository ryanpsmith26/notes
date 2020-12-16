# ES6

### **TEMPLATE LITERAL**

```javascript
const person = {
	name: 'Ryan',
	age: 29
};

let greeting = `Hi! my name is ${person.name}.
I am ${person.age} years old.`;

console.log(greeting);
```

*note that line breaks count (do not need \n)
* * *

### **ARROW FUNCTIONS**

#### Basic Syntax:

```javascript
const myFunc = () => {
	const myVar = 'value';
	return myVar;
};
```
#### One Parameter:

Omit paranthesis around a single parameter:

```js
const myFUnc = str => {
  str += "hello world";
  return str;
}
```
#### One Expression:

Omit curly braces **and** return when only evaluating a single expression:

```js
const myFunc = str => str.toUpperCase();
```

#### Object Literal Syntax:

To return an object literal expression the body needs to be wrapped in parentheses, in order to distinguish between a block and an object (both of which use curly brackets).

```js
//ES5
var setNameIdsEs5 = function setNameIds(id, name) {
  return {
    id: id,
    name: name
  };
};

// ES6
var setNameIdsEs6 = (id, name) => ({ id: id, name: name });

console.log(setNameIdsEs6 (4, "Kyle"));   // Object {id: 4, name: "Kyle"}
```

* * *

### **REST / SPREAD OPERATOR**

```js
// REST (& Destructuring)
let someArray = [ 1, 2, 3, 4 ];
let [ first, ...rest ] = someArray;
console.log(first); // returns 1
console.log(rest); // returns [ 2, 3, 4]
console.log(someArray); // original not modified: returns [ 1, 2, 3, 4 ]

const myFunc = (...arg) => {
	return arg;
};

console.log(myFunc(1, 2, 3)); // returns [ 1, 2, 3 ]

// SPREAD
let anArray = [ 1, 2, 3, 4 ];
let copyAnArray = [ ...anArray ];
console.log(copyAnArray); // returns a copy: [ 1, 2, 3, 4 ]
```
* * *

### **DESTRUCTURING ASSIGNMENT**

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

#### OBJECTS

#### To extract variables from objects:

```javascript
const user = {
	name: 'John Doe',
	age: 34,
	hobbies: {
		sports: 'golf'
	}
};

var { name, age } = user;
console.log(name); // John Doe
console.log(age); // 34
console.log(user); // unchanged

```

#### To assign your own variable name:

```javascript
var { name: userName, age: userAge } = user;
console.log(userName); // John Doe
```

#### To extract nested object (and give own variable name):

```javascript
var { hobbies: { sports }, age } = user;
console.log(sports);
console.log(age);

const { hobbies: { sports: newName }, age: newAge } = user;
console.log(newName);
console.log(newAge);
```

#### ARRAYS

```javascript
const [a, b] = [1, 2, 3, 4, 5, 6];
console.log(a, b); // 1, 2

const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5
```

*can think of destructuring arrays as an "selective" alternative to spread operator.

#### To use destructing assignment with REST operator:

```javascript
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
```

#### MIXED EXAMPLE
```js
function nestedArrayAndObject() {
	const info = {
		title: 'Once Upon a Time',
		protagonist: {
			name: 'Emma Swan',
			enemies: [
				{ name: 'Regina Mills', title: 'Evil Queen' },
				{ name: 'Cora Mills', title: 'Queen of Hearts' },
				{ name: 'Peter Pan', title: `The boy who wouldn't grow up` },
				{ name: 'Zelena', title: 'The Wicked Witch' }
			]
		}
	};

	// original assignment:
	// const title = info.title;
	// const protagonistName = info.protagonist.name;
	// const enemy = info.protagonist.enemies[3];
	// const enemyTitle = enemy.title;
	// const enemyName = enemy.name;

	// refactored w/ destructuring assignment:
	const {
		title,
		protagonist: { name: protagonistName },
		protagonist: { enemies: [ , , , { name: enemyName, title: enemyTitle } ] }
	} = info;

	return `${enemyName} (${enemyTitle}) is an enemy to ${protagonistName} in "${title}"`;
}

console.log(nestedArrayAndObject()); // Zelena (The Wicked Witch) is an enemy to Emma Swan in "Once Upon a Time"
```
* * *

### **MISC**

#### Object Property Shorthand:

```javascript
// This:
const getMousePosition = (x, y) => ({
  x: x,
  y: y
});

// Equals this:
const getMousePosition = (x, y) => ({ x, y });
```

#### Consice Object Methods:

```javascript
// This:
const person = {
  name: "Taylor",
  sayHello: function() {
    return `Hello! My name is ${this.name}.`;
  }
};

// Equals this:
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```
#### Class syntax to create Constructor function:

```javascript
// This:
var Vegetable = function(name) {
	this.name = name;
};

var carrot = new Vegetable('carrot');
console.log(carrot); // Vegetable { name: "carrot" }

// Equals this:
class Vegetable {
  constructor(name) {
    this.name = name
  }
}

var carrot = new Vegetable('carrot');
console.log(carrot); // Vegetable { name: "carrot" }
```
*note use UpperCamelCase for class names

#### Freeze Object from Mutation:

```javascript
Object.freeze(obj)
```
* * *

### **IMPORT/EXPORT JS CODE**

#### First need to access JS code from HTML doc:

```html
<html>
  <body>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

#### Export from JS file:

```javascript
// in place:
export const add = (x, y) => {
  return x + y;
}

// afterward:
const add = (x, y) => {
  return x + y;
}

export { add };
// export object: can accept multiple vars/functions to export (seperated by commas)
```

#### Import to JS file:

```javascript
import { add, subtract } from './math_functions.js';

// Import All:
// *creates object myVar of all exports from the file you pass in

import * as myVar from "./math_functions.js";

// Access Imports:

myVar.add(2,3);
myVar.subtract(5,3);
```

#### Export Fallback with Export Default:

```javascript
// named function
export default function add(x, y) {
  return x + y;
}

// anonymous function
export default function(x, y) {
  return x + y;
}
```

#### Import Default Export:

```javascript
import add from "./math_functions.js";

// note only difference from a regular import is that we are adding some var name (that we define here) and not an obj with predefined var/functions names
// no curly braces
```


