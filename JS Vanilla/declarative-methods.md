# Declarative Programming Methods

Imperative programming describes "HOW YOUR PROGRAM SHOULD DO SOMETHING," and declarative programming describes "WHAT YOUR PROGRAM SHOULD DO."
* * *

## **Array.prototype.forEach()**

The **forEach()** method executes a provided function once for each array element.

```js
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

**forEach( )** does not mutate the original array, but the callback may.

**forEach( )** returns undefined.
* * *

## **Array.prototype.map()**

The **map()** method creates a **new array** populated with the results of calling a provided function on every element in the calling array.

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [ 2, 8, 18, 32 ]
```
The callback takes an optional index argument:

```js
const array1 = [1, 4, 9, 16];

// pass a function to map with index argument
const map1 = array1.map((x, i) => {
	return x * (i + 1);
});

console.log(map1);
// expected output: Array [ 1, 8, 27, 65 ]
```
* * *

## **Array.prototype.filter()**

The **filter()** method creates a **new array** with all elements that pass the test implemented by the provided function.

**The callback takes an optional index argument (like map does)*

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array [ "exuberant", "destruction", "present" ]
```

**SYNTAX**
```js
let newArray = arr.filter(callback(element[, index, [array]])[, thisArg])
```
* * *

## **Array.prototype.reduce()**

The **reduce()** method executes a reducer function (that you provide) on each element of the array, resulting in **single output value**.

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// here 5 is passed into the (optional) initialValue parameter
// expected output: 15
```
#### SYNTAX

```js
arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])
```

The accumulator is the value that will "grow" through the iterations. If no **initialValue** is passed into the reduce method: index[0] will be assigned to accumulator and the first loop iteration will be a index[1].

If **initialValue** is passed into the reduce method: this is assigned to the starting value of accumulator and the loop will start at index[0].

In every case, the callback will execute a loop iteration, and the return value will become the accumulator for the next iteration (until it finally returns at iteration index[array1.length - 1]) !!
* * *

## **Split & Join Method Delimiter Examples**

```js
let array = [1,2,3,4,5]
let string = "Hi Sam"

console.log(array.join())       // 1,2,3,4,5
console.log(array.join(" "))    // 1 2 3 4 5
console.log(array.join(""))     // 12345

console.log(string.split());    // [ 'Hi Sam' ]
console.log(string.split(" ")); // [ 'Hi', 'Sam' ]
console.log(string.split(""));  // [ 'H', 'i', ' ',
                                // 'S', 'a', 'm' ]
```
* * *





