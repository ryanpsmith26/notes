//recursion

//usually want to return the "typeof" thing in base case

//_____________________________________

const factorial = (num) => {
	if (num === 0) {
		return 1;
	} else {
		let result = num * factorial(num - 1);
		return result;
	}
};

console.log(factorial(5));

//_____________________________________

function factorialize(num) {
	if (num === 0) {
		return 1;
	}
	return num * factorialize(num - 1);
}

console.log(factorialize(5));

//_____________________________________

function countdown(n) {
	if (n < 1) {
		return [];
	} else {
		let arr = countdown(n - 1);
		arr.unshift(n);
		return arr;
	}
}
console.log(countdown(3));

//arr --> countdown(0) =[]
//arr --> countdown(1)
//arr --> countdown(2)
//callstack

//_____________________________________

function countd(n) {
	if (n < 1) {
		console.log('done');
	} else {
		console.log(n);
		countd(n - 1);
	}
}

console.log(countd(3));

//_____________________________________

const countToTen = (num) => {
	if (num > 10) return 'num too large';
	console.log(num);
	countToTen(num + 1);
};

console.log(countToTen(3));

//_____________________________________

// const backwardString = (str) => {
// 	for (let i = str.length - 1; i > -1; i--) {
// 		console.log(str[i]);
// 	}
// };

// console.log(backwardString('happy'));

// const backwardString = (str) => {
// 	let index = str.length - 1;
// 	if (index < 0) {
// 		return;
// 	} else {
// 		console.log(str[index]);
// 		index--;
// 		backwardString(str);
// 	}
// };

// console.log(backwardString('happy'));

// const backwardString = (str) => {
//   let index = str.length - 1
//   if (index < 0) return
//   else {
//     function inner (str[index]) {
//       console.log(str[index])
//       inner (str[index - 1]);
//     }
//   }
// }
