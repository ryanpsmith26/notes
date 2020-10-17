# Object Oriented Programming

## **Factory Functions**

```js
function puppyFactory(name, breed) {
  const puppyPrototype = {
    bark() {
      console.log('Ruff, Ruff');
    },
    sleep() {
      console.log('zzzZZZZZzzzz');
    }
  }
  
  const newPuppy = Object.create(puppyPrototype);
  newPuppy.name = name;
  newPuppy.breed = breed;
  
  return newPuppy;
}
```
```js
const humanCalcPrototype = {
	add(num) {
		this.total += num;
		return this.total;
	},
	subtract(num) {
		this.total -= num;
		return this.total;
	},
	value() {
		return this.total;
	},
	clear() {
		this.total = -10;
		return this.total;
	}
};

const createHumanCalculator = () => {
	let calc = Object.create(humanCalcPrototype);
	calc.total = -10;
	return calc;
};
```

* * *

## **Constructors** 

Constructors are functions that create (instances of) new objects:

```js
// In it's most basic format:

function MyFunc() {}
const obj = new myFunc;
console.log(obj); // {}
```

```js
function Bird (name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 2;
}

// NOTE: "this" (inside a Constructor Function) always refers to the instance object.

let blueBird = new Bird("Jeff", "orange");
```

A function is an object. That function object will have it's own internal prototype (as expected), but it also has a **property** called prototype. By default the value of that prototype property is an object which contains the constructor and an internal prototype. 

**This constructor and internal prototype are what is inherited by the object instance of a constructor function.**

```js

// CONTINUING FROM ABOVE
// add methods to the internal prototype of the object instances (BEST PRACTICE):

Bird.prototype.eat = function() {
	return 'nom nom nom';
};

let pigeon = new Bird('Bill', 'blue');

console.log(pigeon.eat()); // returns "nom nom nom"

// alternativly you can just assign a brand new object to Bird.prototype, but this will overwrite the original!
```

## **Constructor Subclass  (ES5)**

```js
function Product(name, price) {
	this.name = name;
	this.price = price;
}

function Food(name) {
	Product.call(this, name, 6);
	this.category = 'food';
}

const cheese = new Food("cheese")

console.log(cheese.name);  // cheese
console.log(cheese.price); // 6
```

```js
function Animal(name) {
	this.name = name;
}

Animal.prototype.fly = 'See ya later!';

function Dog(name) {
	// grab the props defined on Animal itself to also work on Dog instances:
	Animal.call(this, name);
}

// Now assign the Animal prototype object to be the Dog prototype object to inherit all the same methods:
Dog.prototype = Object.create(Animal.prototype);

// Need to explicitly declare constructor prop to Dog (so it doesn't inherit Animal)
Dog.prototype.constructor = Dog;

let otis = new Dog('Otis');

console.log(otis); // Dog { name: Otis }
console.log(otis.fly); // See ya later!
```
* * *

## **Class Syntax (ES6)**

```js
class Bird {

  // define the props you want to be on the object instance itself like this:
	constructor(name, color) {
		this.name = name;
		this.color = color;
		this.numLegs = 2;
  }
  
  // define the props/methods you want to be on the object instance inherited prototype here:
  eat() {
    return "nom nom nom"
  }
}

let blueBird = new Bird('Jeff', 'orange');

console.log(blueBird.eat()) // returns "nom nom nom"
```
***NOTE** no comma nor semi-colon is used inside the Class body*

## **Subclass (ES6)**

```js
class Dove extends Bird {
	constructor(name, color) {
		// inherit props from parent:
		super(name, color);
		// define props for child:
		this.home = 'Frost Balcony';
	}

	incubate() {
		return 'sitting waiting wishing';
	}
}

let maria = new Dove('Maria', 'brown');
console.log(maria); // Dove { name: "Maria", color: "brown", numLegs: 2 }
console.log(maria.home); // Frost Balcony
console.log(maria.eat()); // nom nom nom
console.log(maria.incubate()); // sitting waiting wishing
```
***NOTE** the super( ) function needs the arguments the parent class requires because the super function calls the parent class.*
* * *

## **Prototype Chain**

Prototypes are inherited by an object, from it's Constructor Function.

Prototypes can have prototypes.

The end of the line is Object.prototype, which contains methods like *hasOwnProperty().*

This means that any object can access this method, because Object.prototype will always be the most "parent" prototype (or ultimate supertype).

In the example below, duck inherits it's prototype from Bird (duck's prototype is? Bird.prototype). 

But Bird inherits it's prototype from Object (Bird's prototype is? Object.prototype).

Therefore, duck can access methods like *hasOwnProperty()* through (multi-step) inheritence!

**NOTE:** *JS will search for a method in the lowest level, and continue up the chain until it finds what it is looking for and STOP there.*

```js
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Donald");

Bird.prototype.isPrototypeOf(duck);
// returns true
```

You can check prototype relationships with **isPrototypeOf()** method:

```js
Bird.prototype.isPrototypeOf(duck); // returns true
```

You can set the Child's Prototype to an Instance of the Parent:

```js
function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog // explicitly declare constructor

let beagle = new Dog();

console.log(Dog.prototype.isPrototypeOf(beagle)); // true
console.log(Animal.prototype.isPrototypeOf(beagle)); // true
console.log(Object.prototype.isPrototypeOf(beagle)) // true
```
* * *

## **Copying an Object (Shallow Clone):**

**Object.assign( )**
```js
const objToCopy = {location: "NYC", temperature: 75}

const copyOfObj = Object.assign({}, objToCopy);

// from MDN:
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

**Spread syntax** works on Objects as well
```js
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };

const clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

const mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```
* * *

<!-- ### **instanceof && Constructor Property**

**instanceof** is an operator that can be used to check an object is an instance of a constructor function:

```js
let crow = new Bird("Alexis", "black");

crow instanceof Bird; // => true

// instanceof will work whether you've overwritten the constructor property or not
```

alternate method: **constructor property**
```js
crow.constructor === Bird   // returns true

Bird.prototype = {};

crow.constructor === Bird   // returns false now
crow.constructor === Object // returns true, all objects inherit from Object.prototype
```
* * *

## **Functional Mixins**

To add a method to unrelated objects, it would be unwise to use one Constructor Function (to create those objects w/ that method).

Use **Functional Mixins** instead: 

```js
let bird = {
  name: "Donald",
  numLegs: 2
};

let boat = {
  name: "Warrior",
  type: "race-boat"
};

// Only change code below this line

let glideMixin = function(obj) {
  obj.glide = function() {
    return "I am gliding"
  }
}

glideMixin(bird);
glideMixin(boat);

// Now you've set the method on each object with a single and independent function
```
* * *

## **Closure**

In JavaScript, a function always has access to the context in which it was created. This is called **closure**.

We can use this to our advantage when we need to make a "private" variable on an object.

```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

```js
function Bird() {
  let hatchedEgg = 10; // private variable

  /* publicly available method that a bird object can use */
  this.getHatchedEggCount = function() { 
    return hatchedEgg;
  };
}
let ducky = new Bird();
ducky.getHatchedEggCount(); // returns 10
```
* * *

## **IIFE**

**Immediately Invoked Function Expression:**

```js
(function() {
  console.log("A cozy nest is ready");
})()
```

Use an **IIFE** to Create a Module:

```js
let motionModule = (function () {
  return {
    glideMixin: function(obj) {
      obj.glide = function() {
        console.log("Gliding on the water");
      };
    },
    flyMixin: function(obj) {
      obj.fly = function() {
        console.log("Flying, wooosh!");
      };
    }
  }
})(); // The two parentheses cause the function to be immediately invoked

motionModule.glideMixin(duck);
duck.glide();
```
* * * -->