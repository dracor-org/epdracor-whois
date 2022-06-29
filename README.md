# Who is @who in EPDraCor

Identifying speakers in the [EarlyPrint Drama Corpus](https://github.com/dracor-org/epdracor).

https://dracor-org.github.io/epdracor-whois

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn lint`

Run linter: `eslint ./src`.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Builds the app and deploys it to https://dracor-org.github.io/epdracor-whois/.

### `yarn version`

Changes the version number in `package.json`, commits the changes, creates a tag
and pushes the commit and the tag to the `origin` remote. To make sure only
correct code is being tagged, a `preversion` script also runs `yarn test` and
`yarn build` before  actually bumping the version.

By default you will be asked to enter a new version number. With the commands
`yarn version --patch`, `yarn version --minor`, or `yarn version --major` the
respective part of the version number is incremented automatically. (See the
[yarn documentation](https://classic.yarnpkg.com/en/docs/cli/version/) for
details.)
