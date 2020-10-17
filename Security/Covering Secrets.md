# Security: Covering Secrets

#### .gitignore
```md
secrets.js
```

#### secrets.js
```js
process.env.CLIENT_ID = '238524570915-ivf9lnhm9bsfq13cle5ap8s28d4lmhrp.apps.googleusercontent.com';
process.env.CLIENT_SECRET = 'GST6VQnVmhx1YIB1vDXXB3PF';
```

#### server/oath.js
```js
if (process.env.NODE_ENV === 'development') {
  require('./secrets'); // this will mutate the process.env object with our secrets
}

const googleCredentials = {
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: '/auth/google/callback'
};
```