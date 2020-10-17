# Access Control

### Admin Middleware

#### server/utils/adminOnly.js
```js
module.exports = (req, res, next) => {
	if (req.body.user && req.body.user.isAdmin) next();
	else {
		const err = new Error('Unauthorized');
		err.status = 401;
		next(err);
	}
};
```

#### server/api/user-router.js
```js
...
const isAdminMiddleware = require('../utils/adminOnly');
...
router.put('/:id', isAdminMiddleware, (req, res, next) => {
	req.requestedUser
		.update(req.body)
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

router.delete('/:id', isAdminMiddleware, (req, res, next) => {
	req.requestedUser
		.destroy()
		.then(() => {
			res.status(204).end();
		})
		.catch(next);
});
```

### Scrub Requests

```js
router.post('/', (req, res, next) => {
	// peel off only what you need to post a new user
	// notice this excludes the isAdmin field!
	const { name, email, password, photo } = req.body;

	User.create({
		name,
		email,
		password,
		photo
	})
		.then((user) => {
			res.status(201).json(user);
		})
		.catch(next);
});
```