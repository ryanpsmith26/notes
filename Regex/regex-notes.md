# REGEX

## **QUANTIFIERS**

    \       ESCAPE!
    +     preceding has to be there, can be infinte # of times
    *     preceding does not have to be there, but can be there infinite # of times
    ?     preceding 0 or 1 time
    ^     preceding has to be at start of string
    $     preceding has to be at the end of string
    {N}   preceding N number of matches
    {N,}  preceding at least N number of matches
    {N,M} preceding at least N number of matches, at most M number of matches
    ( )   capturing group | reuse 1st capturing group with \1
    (?: ) non-capturing group
    (?= ) positive lookahead
    (?! ) negative lookahead

* * *

## **METHODS**

```javascript
let aRegExp = /regexp/;
let str = 'regexp';

aRegExp.test(str); // returns true or false

aRegExp.exec(str); // returns array of matches as well as other info like "last index" - also used with capturing groups?

str.match(aRegExp); // returns the matches (inside an array) OR null

str.matchAll(aRegExp); // COME BACK TO THIS

str.search(aRegExp); // returns index of first match OR -1

str.replace(aRegExp, 'some replacement'); // replaces all matches with replacement arg

str.replace("someStr", "replacement"); // replaces only first match with replacement arg

str.replace(/(\w+)\s(\w+)/, '$2 $1') // can use capturing groups for replacement with this syntax
```
* * *

## **EXAMPLES**

```javascript
let regex = /freecodecamp/gi;
let regexCon = new RegExp(/learned/gi, 'gi');
let someString = 'I learneD to code with freeCodeCamp!';

console.log(regex.test(someString)); //true
console.log(regexCon.test(someString)); //true

let anotherRegex = /[a-z]ree[\w\d]ode[^l]amp/gi;

console.log(anotherRegex.test(someString)); //true

let regex3 = /12345+6789/;
console.log(regex3.test('pass1234555556789')); //true

let regex4 = /testing$/gi;
console.log(regex4.test('I am Testing')); //true
console.log(regex4.exec('I am testing')); //null

let regex5 = /^testing/gi;
console.log(regex5.test('Testing this out')); //true

let regex6 = /^testing$/gi;
console.log(regex6.test('Testing')); //true

let regex7 = /samde{3}ver/;
console.log(regex7.test('samdeeever')); //true

let regex8 = new RegExp(/sam(dever)/);
console.log(regex8.test('samdever')); //true
console.log(regex8.exec('goes to the store samdever samedever'));
let regex9 = /^test\$ing$/gi;
console.log(regex9.test('test$ing')); //true

let quit = "qu";
let noquit = "qt";
let quRegex= /q(?=u)/;
let qRegex = /q(?!u)/;
quit.match(quRegex); // Returns ["q"]
noquit.match(qRegex); // Returns ["q"]
```
* * *

## **PROBLEMS**

```javascript
//Match a date with following format DD-MM-YYYY or DD-MM-YY

let regex10 = /^(\d{1,2}-){2}\d{2}(\d{2})?$/;
let regex11 = /^(\d{2}-){2}(\d{2}|\d{4})$/;
console.log(regex11.test('11-09-2020')); //true
```

```javascript
//Username check

// 1) Usernames can only use alpha - numeric characters.
// 2) The only numbers in the username have to be at the end.There can be zero or more of them at the end.Username cannot start with the number.
// 3) Username letters can be lowercase and uppercase.
// 4) Usernames have to be at least two characters long.A two - character username can only use alphabet letters as characters.

let username = 'JackOfAllTrades';
let userCheck = /^(([a-z]{2,})\d*)$|^(([a-z]{1,})\d{2,})$/i; // Change this line
let result = userCheck.test(username);
console.log(result); //true

//count vowels in string using regex:

function vowelCounter(str) {
	let regex = /a|e|i|o|u/;
	let counter = 0;
	for (let i = 0; i < str.length; i++) {
		let currentLetter = str[i];
		if (regex.test(currentLetter)) {
			counter += 1;
		}
	}
	return counter;
}

console.log(vowelCounter('Hi my name is ryan smith')); //6
```