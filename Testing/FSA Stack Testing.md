# Testing the FSA Stack

```zsh
npm i --save-dev mocha chai chalk supertest enzyme babel-register

# supertest is an abstraction for testing express routes
# enzyme is an abstraction for testing React components
# so we can run specs through babel compiler when we call npm test!
```

#### package.json
```json
...
"scripts": {
	...
	"test": "mocha ./tests/*.spec.js --require babel-register --watch",
	...
}
...
```
**NOTE:** watch flag should be removed before deployment!\
**NOTE:** use --recursive flag to run every file in the project dir

#### .babelrc
```js
{
	"presets": [ "@babel/preset-react", "@babel/preset-env" ]
}
// OR from workshop:
{
  "presets": ["react", "es2015"]
}
```
**NOTE:** tests may error our with this config. remove --require babel-register to just test backend. To test React frontend, only workaround I am aware right now is to rename the .babelrc file to babel.config.js.
* * *

## Express
<details>
<summary>Click to expand</summary>
\
<details>
<summary>Click for test writing tips!</summary>
- Each route should receive at least one test case
- If your route could send back a different status for different kinds of requests (ex. if a GET route for /api/users/:userId could return a single user with status of 200, or a 404 if no user is found, there should be a test for each case).
- Don't just test to make sure that the response body is an array or an object - make sure that the data is what you expect! If a GET request should send back data with specific fields populated (for example, by using eager loading or scopes), make sure that your response body has those fields. Likewise, if a PUT or POST should create or modify data, make sure that the data in your response body actually matches the intended change.
- The tests for your routes should treat your route like a black box: for a given request, you should expect to receive some kind of response back. You should not test anything about the implementation of the route itself.
    - For example, using a spy to see if a certain Sequelize method was used would be a bad idea. What if you change your mind about which Sequelize method to use later? What if you stop using Sequelize altogether and swap in a different ORM? Your test would now be useless - the reason we wanted this test in the first place was so that we could change the way we implement the route, and confirm that it still worked!
</details>

#### server/app.js
```js
...
// conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
if (!module.parent)
	app.listen(PORT, () => {
		console.log(`ready to serve neural nets on PORT: ${PORT}`);
	});

// export server for testing framework
module.exports = app;
```

#### express-tests.spec.js
```js
var expect = require('chai').expect;
var supertest = require('supertest')(require('../server/app'));

describe('Express Routes', function() {
	describe('/api/net/nums URI', function() {
		it('PUT responds with "hello" ', function() {
			return supertest // supertest object lets us make & test HTTP req/res
				.put('/api/net/nums') // makes an HTTP request: GET '/users'
				.expect(200) // tests response status code
				.expect('Content-Type', /json/) // tests response header
				.expect(function(res) {
					expect(res.body).to.eql('hello'); // tests response body
				});
		});
	});
});
```
 * * *
</details>

## Sequlize
<details>
<summary>Click to expand</summary>
\
<details>
<summary>Click for test writing tips!</summary>
- Any methods that you write deserve tests (instanceMethods, classMethods, hooks, and model validator methods)
- Do not write tests for code that Sequelize owns - methods like findAll, create, update, etc, and field validations like allowNull.
- Extra note on validations: generally, you should only test model validator methods - the non-trivial methods that you write to validate your model instances. Simple validations like allowNull and other field aspects like defaultValue should not be tested by you - they are Sequelize's responsibility.
</details>

#### sequelize-tests.spec.js
```js
const helper = require('../../helper'); // unimportant for this example
const expect = require('chai').expect;
const db = require('../../models/sequelize-models/database');
const { Task, Owner } = require('../../models/sequelize-models');

describe('Task and Owner', function() {
	// clear the database before all tests
	before(() => {
		return db.sync({ force: true });
	});

	// erase all tasks after each spec
	afterEach(() => {
		return db.sync({ force: true });
	});

	describe('Class methods on Task', function() {
		beforeEach(async () => {
			await Promise.all([
				Task.create({ name: 't1', due: helper.dates.tomorrow() }),
				Task.create({ name: 't2', due: helper.dates.tomorrow(), complete: true }),
				Task.create({ name: 't3', due: helper.dates.yesterday() }),
				Task.create({ name: 't4', due: helper.dates.yesterday(), complete: true })
			]);
        });
    });
});
```
* * *
</details>

## React
<details>
<summary>Click to expand</summary>
\
<details>
<summary>Click for test writing tips!</summary>
- Any JavaScript expressions you write in your JSX (using curly braces {}) should get a test case
- Any methods you write in a class component should be tested.
- For event handlers - test the method itself by mock data for the event (or whatever input the method should receive). Test that the method is registered as a listener correctly by using a spy (libraries like sinon can help here).
    - These should be separate test cases because attaching the handler to the listener is not contingent upon the handler being written properly. Your click handler could work just fine, but if it's never being attached, that's a problem. Likewise, you could be attaching the right method to the right listener, but perhaps that method doesn't work the way it should. Having two separate test cases allows you to quickly diagnose what kind of problem you have.
</details>

#### react-tests.spec.js
```js
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SinglePet from '../src/components/SinglePet';

describe('Tier 1: SinglePet component', () => {
	const rigatoni = {
		id: 1,
		name: 'Rigatoni',
		description: 'A flaming hot cheetoh in feline form',
		species: 'cat'
	};

	const cody = {
		id: 2,
		name: 'Cody',
		description: 'Adorable pug who loves to hug',
		species: 'dog'
	};

	it("renders a pet's name, description, and species passed in as props", () => {
		const wrapper = mount(<SinglePet pet={rigatoni} />);
		expect(wrapper).to.include.text('Rigatoni');
		expect(wrapper).to.include.text('A flaming hot cheetoh in feline form');
		expect(wrapper).to.include.text('cat');
    });
});
```
**NOTE:** this is not a complete setup yet!
 * * *
</details>

## Redux
<details>
<summary>Click to expand</summary>
\
<details>
<summary>Click for test writing tips!</summary>
- Your reducer should get at least one test case for each action it consumes
- Each action creator deserves a test case (even though they seem very simple - think of it as a free pass)!
- For thunk creators and thunks, you should test that they:
    - Make the appropriate network request(s) (if they do this)
    - Eventually invoke the dispatch method with certain actions (spying on the dispatch method using sinon is recommended here)
        - Note the emphasis on actions - you should test that the dispatch method is invoked with certain action objects - NOT that certain action creators were invoked (see below)
- For thunk creators and thunks, you should NOT test:
    - The actual result of the network request - this is the job of your server tests!
    - That certain (synchronous) action creators are invoked - this is the job of your action creator tests.
</details>

 * * *
</details>