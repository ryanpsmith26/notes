# Heroku Deployment

The first thing we need to consider is how our backend code is configured in our app:

- Ensure that the DB URL is dynamic
```js
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;
```
- Ensure that the server PORT is dynamic
```js
const PORT = process.env.PORT || 1234;
```

- Next let's create our Heroku project
```zsh
cd your-project-root

heroku login # prompts to login through browser
heroku create your-project-name # heroku project created AND git remote "heroku" added to project
```

Non-React apps:
```zsh
# you can simply push to the heroku remote to deploy
# however this will fail with a react frontend with bundle.js gitignored
git push heroku master # heroku builds app and runs npm start

# we can view our errors here:
heroku logs --tail # prints logs to our term, tail flag -> actively watch logs
```

React apps:
- To properly deploy a React app we'll need a deployment script (check it out below).
- Make sure it is executable:
```zsh
# check permissions
ls -l ./script/deploy 

# make executable
chmod 755 ./script/deploy
```
- Add a script to the package.json:
```json
  ...
	"scripts": {
		"deploy": "./script/deploy"
  }
  ...
```
- Finally, run deploy:
```zsh
npm run deploy # see deploy script below
```
**NOTE**: be sure to commit your changes to *your* master branch before deploying!

Now your app is properly deployed on a Heroku server, but...\
we have no database on the backend!

App w/ database:
- Head to Configure Add-ons and add Heroku Postgres.\
- Now we can enter the heroku server shell and seed our DB on the backend!

```zsh
heroku run bash # runs a shell on your machine accessing your dyno! (on your herkou server)
npm run seed
```

- Refresh that app and see your app successfully making requests to your DB!
* * *

#### script/deploy
```zsh
#!/usr/bin/env bash

# Hello, welcome to a bash script.

# This bash script deploys your boilermaker application.

# On the terminal you run individual
# bash commands, and this file strings a bunch of commands together.

# The first line of this file, or the `hashbang`, tells the system to
# execute the text of this file as a bash program.

# We want this entire script to exit if any single line fails.
# So we set the `-e` flag.
set -e

# If our deploy fails partway through we want to clean up after ourselves.
# This next block is like a try/catch for our entire script.

# We trap any program EXIT and run this function.
# Whether the deploy succeeds or fails, we'll clean up the deploy branch.

function cleanup_at_exit {
  # return to your master branch
  git checkout master

  # remove the deploy branch
  git branch -D deploy
}
trap cleanup_at_exit EXIT

# checks out a new branch called "deploy". Note that the name "deploy" here isn't magical,
# but it needs to match the name of the branch we specify when we push to our heroku remote.
git checkout -b deploy

# webpack will run in "production mode"
webpack -p

# "force" add the otherwise gitignored build files
git add -f public/bundle.js public/bundle.js.map

# create a commit, even if nothing changed
git commit --allow-empty -m 'Deploying'

# push your local "deploy" branch to the "master" branch on heroku
git push --force heroku deploy:master
```