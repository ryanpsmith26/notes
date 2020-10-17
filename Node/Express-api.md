# Express API

## app.js

```js
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev')); //logging middleware
app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());

app.use(/* pass all reqs to router */);

// failed to catch req above means 404, forward to error handler
app.use((req, res, next) => {
	res.status(404).send(/* Not Found Page */)
});

// handle any errors
app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).send(err.message);
});


app.listen(3000, () => {
		console.log('Listening on PORT:3000');
	});

module.exports = app;
```