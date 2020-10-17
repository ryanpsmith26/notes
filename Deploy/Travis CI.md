# Travis CI

Run the following commands to create a new branch:
```zsh
git checkout master
git pull
git checkout -b f/travis-deploy
```

Run the following script to finish configuring travis.
```zsh
( yml : ) npm run heroku-token
```
 This will use your heroku CLI (that you configured previously, if not then see above) to generate an authentication token. It will then use openssl to encrypt this token using a public key that Travis has generated for you. It will then update your .travis.yml file with the encrypted value to be sent with the secure key under the api_key.

Run the following commands to commit these changes:

```zsh
git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy
```
Make a Pull Request for the new branch, get it approved, and merge it into the master branch.

NOTE: that this script depends on your local origin Git remote matching your GitHub URL, and your local heroku remote matching the name of your Heroku app. This is only an issue if you rename your GitHub organization, repository name or Heroku app name. You can update these values using git remote and its related commands.
* * *

- Run following to get your heroku auth token:
```zsh
heroku auth:token
```
- With Travis CLI installed run:
```zsh
travis encrypt $(heroku auth:token) --add deploy.api_key
```
- In the root of your project directory to add it to the YAML file