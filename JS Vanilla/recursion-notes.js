// RECURSION

// Always set the base case first. This is the exit to the function. This must return.
// Then enter your expression that you are trying to perform (for each iteration)
// Then call the function and be sure to pass in an expression to iterate
// Base case is evaluated last.
// If stuck run through the function and write out the CALLSTACK

//example workshop: count to ten:

const countToTen = (num) => {
	//base case
	if (num > 10) {
		return;
	}
	console.log(num);
	countToTen(num + 1);
};

console.log(countToTen(3));

//example workshop: backward string:

const backwardString = (str) => {
	if (str.length < 1) {
		return;
	}
	console.log(str.slice(-1));
	str = str.slice(0, -1);
	backwardString(str);
};

console.log(backwardString('happy'));

//example workshop: sum nums:

const sumNums = () => {};

//_________________________________________________________________

// Accessing nested arrays / objects:

// set up your function as normal:
// for loop to access outer array / for in for outer object
// inside loop perform if statement for case of nested array / object case
// i.e.: if (isArray.Array(arr)) {} || if (typeof obj === "object") {}
// inside the if if the recursive case / replace your "value" with calling the function
// else statement is normal case i.e. "business as usual"
// return your value outside the loop

//example workshop: sum values in nested array / array sum:

const arraySum = (arr) => {
	let sum = 0;

	for (let i = 0; i < arr.length; i++) {
		let current = arr[i];

		if (Array.isArray(current)) {
			sum += arraySum(current);
		} else {
			sum += current;
		}
	}
	return sum;
};

console.log(arraySum([ 1, 2, [ 5, [ 6, 7 ] ] ]));

//example workshop: access nested object / all systems go

let systems = {
	power: {
		batteries: true,
		solarCells: true,
		generator: true,
		fuelCells: true
	},
	telecoms: {
		antennas: {
			highGain: true,
			mediumGain: true,
			lowGain: true
		},
		transmitter: true,
		receiver: true
	},
	attitudeControl: {
		stabilization: {
			spin: true,
			threeAxis: true
		}
	},
	propulsion: {
		engines: {
			engine1: true,
			engine2: true,
			engine3: false
		},
		thrusters: true,
		propellant: true
	},
	environment: {
		cooling: true,
		heating: true,
		lifeSupport: true
	}
	// sometest: false
};

const allSystemsGo = (obj) => {
	for (let key in obj) {
		let current = obj[key];

		if (typeof current === 'object') {
			if (!allSystemsGo(current)) {
				return false;
			}
		} else {
			if (!current) {
				return false;
			}
		}
	}
	return true;
};

console.log(allSystemsGo(systems));
