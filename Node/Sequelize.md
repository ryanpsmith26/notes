# **SEQUELIZE**

# Setup

```bash
~ createdb db_name

# From Project Root:

~ npm init -y
~ npm install --save sequelize
~ npm install --save pg pg-hstore

# Alt:

~ npm i sequelize pg
```

### **Connecting to database**
```js
const Sequelize = require('sequelize');
const Op = Sequelize.Op; // to utilize operations for querying

const db = new Sequelize('postgres://localhost:5432/db_name', {
	logging: false,
	operatorAliases: false
});
```

### **Testing Connection**

```js
const testConnection = async () => {
	try {
		await db.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

testConnection();
```
&nbsp;

# Defining Models

```js
const User = db.define('User', {
	// Model attributes are defined here
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: Sequelize.STRING
	// shorthand when only defining data type
});

(async () => {
	await db.sync({ force: true });
})(); // table is created in the database by invoking sync
```
### **Sync Options**
```js
User.sync() // creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) // creates the table, dropping it first if it already existed
User.sync({ alter: true }) // makes only the necessary changes

db.sync() // synconizes all models
```
&nbsp;
# Model Instances

### **BUILD & SAVE instance row**
```js
const sam = User.build({ firstName: 'Sam', lastName: 'Dever' });
console.log(sam instanceof User); // true
console.log(sam.firstName); // "Sam"

(async () => {
	await sam.save();
	console.log('Sam Dever was saved to the database!');
})();
```
### **CREATE instance row in one step**
```js
(async () => {
	const sam = await User.create({ firstName: 'Sam', lastName: 'Dever' });
})();
```
```js
await User.bulkCreate( /* accepts are array of objects */ )
```

**UPDATE instance** with ```instance.save()```\
**DELETE instance** with ```instance.destroy()```

&nbsp;
# Query Models

### **Finders**

- ```findAll()```
- ```findByPk()```
- ```findOne()```
- ```findOrCreate()```

### **SELECT * FROM users**
```js
let users = await User.findAll();
```
### **SELECT * FROM users WHERE lastName = 'Smith'**
```js
let smiths = await User.findAll({
		where: {
			lastName: 'Smith'
		}
	});
```
* * *
### **Update Queries**
```js
await User.update({ lastName: "Dever" }, {
  where: {
    lastName: null
  }
});
```

### **Delete Queries**
```js
await User.destroy({
		where: {
			firstName: 'Ryan'
		}
	});
```
### **Eager Loading / Inner Join**

```js
const Pug = db.define('pugs', { name: Sequelize.STRING });
const Owner = db.define('owners', { name: Sequelize.STRING });

Pug.belongsTo(Owner);
Owner.hasOne(Pug); // 1-1 association

const getPugs = async () => {
	const owners = await Owner.findAll({ include: [ { model: Pug } ] });
	console.log(owners); // [{name: 'Tom', pug: {name: 'Cody', ownerId: 1}}]
};
```
&nbsp;

# Associations

### **Four Association Types**
- ```HasOne```
- ```BelongsTo```
- ```HasMany```
- ```BelongsToMany```

```js
const A = db.define('A', /* ... */);
const B = db.define('B', /* ... */);

A.hasOne(B); // One-One; foreign key added to B
A.belongsTo(B); // One-One; foreign key added to A
A.hasMany(B); // One-Many; foreign key added to B

// ^ A is the SOURCE / B is the TARGET ^

A.belongsToMany(B, { through: 'C' }); // Many-Many; foreign keys added for both tables on table C
```

**NOTE: Relationships are defined in pairs**
- To create a One-To-One relationship, the ```hasOne``` and ```belongsTo``` associations are used together;
- To create a One-To-Many relationship, the ```hasMany``` and ```belongsTo``` associations are used together;
- To create a Many-To-Many relationship, two ```belongsToMany``` calls are used together.
* * *

### **One-To-One**
```js
Foo.hasOne(Bar);
Bar.belongsTo(Foo);
// fooId attribute create on bars

Foo.hasOne(Bar);
Bar.belongsTo(Foo, { as: 'myFoo' });
// myFooId attribute create on bars
```

### **One-Many**
```js
Team.hasMany(Player);
Player.belongsTo(Team);
```

### **Many-Many**
```js
const Movie = db.define('Movie', { name: Sequelize.STRING });
const Actor = db.define('Actor', { name: Sequelize.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });
// ActorMovies table created with MovieId and ActorId columns

(async () => {
	await db.sync();
	const sirDavos = await Actor.create({ name: 'Sir Davos' });
	const arya = await Actor.create({ name: 'Arya Stark' });
	const thrones = await Movie.create({ name: 'Game of Thrones' });
    // creates instances without any foreign keys on junction table

	await thrones.setActors(sirDavos, arya);
	await sirDavos.setMovies(thrones);
	await arya.setMovies(thrones);
})();
```
### Access all **magic methods** by ```instance.__proto__```
```js
pug.getFriends() // returns a promise for the array of friends for that pug
pug.addFriend(friend) // creates a new row in the friendship table for the pug and the friend, returns a promise for the friendship (NOT the pug OR the friend - the "friendship")
pug.addFriends(friendsArray) // creates a new row in the friendship table for each friend, returns a promise for the friendship
pug.removeFriend(friend) // removes the row from the friendship table for that pug-friend, returns a promise for the number of affected rows (as if you'd want to destroy any friendships...right?)
pug.removeFriends(friendsArray) // removes the rows from the friendship table for those pug-friend pairs, returns a promise for the number affected rows

// analogous to above ^
friend.getPugs()
friend.addPug(pug)
friend.addPugs(pugsArray)
friend.setPugs(pugsArray)
friend.removePug(pug)
friend.removePugs(pugsArray)
```
&nbsp;

# Class Methods / Instance Methods

```js
Cat.getKittens = async function () {
    const kittens = await Cat.findAll({
        where: {
            age: {[Op.lte]: 3}
        }
    })
    return kittens;
}
```

```js
Cat.prototype.sayHello = function () { //instance method
    console.log(`${this.name} says meow`);
}
```
