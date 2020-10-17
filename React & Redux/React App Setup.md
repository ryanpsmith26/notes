# React App Setup

## **.gitignore**
```
node_modules
.DS_Store
bundle.js
bundle.map.js
```

## **package.json**
```js
{
	"name": "pixelate",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"serve": "http-server -c-1 ./public",
		"build-watch": "webpack -w",
		"start": "npm run build-watch & npm run serve"
	},
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"babel-core": "^6.26.3",
		"babel-loader": "^7.1.5",
		"babel-polyfill": "^6.26.0",
		"babel-preset-env": "^1.7.0",
		"babel-preset-react": "^6.24.1",
		"babel-preset-stage-2": "^6.24.1",
		"http-server": "^0.12.3",
		"webpack": "^4.44.1",
		"webpack-cli": "^3.3.12"
	},
	"dependencies": {
		"react": "^16.13.1",
		"react-dom": "^16.13.1",
		"redux": "^4.0.5",
		"redux-logger": "^3.0.6"
	}
}
```

## **webpack.config.js**

```js
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
```

## **.babelrc**

```js
{
  "presets": [
    "react",
    ["env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }],
    "stage-2"
  ]
}
```

## **public/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
</body>
<script type="text/javascript" src="/bundle.js"></script>
</html>
```

* * *
**Pixelate-Redux*