# Star Wars Universe

## About

This app is fetching data from the [SWAPI](https://swapi.dev/) API via a [GrapQL wrapper, served locally](https://github.com/graphql/swapi-graphql). Using some of that available date, we are representing the connection between planets and films using the [React Force Graph library](https://github.com/vasturiano/react-force-graph). 

For GraphQL data fetching, I have used Apollo to set it up, and the base template for this project is a [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) boilerplate.

Users can, for this version, change the name of any node, but the changes do not persist between sessions. I am temporarily storing and modifying the graph data using React's `useContext()` hook, and dispatching actions as interactions take place with the UI. 

Given the relative simplicity of the app, `useContext()` was preferable to Redux as a way to handle a global state. I am also trying to make just a single API request - and then use the graph stored in the global state as a data source for all further renders.

When fetching planets, I have made use of the available API data regarding their diameter, and used that as a scale to represent planets visually in a more distinctive way. Planets with no film connections are gravitating around the cluster of interconnected planets and films in a circular way. I have chosen this representation as it was more elegant and interesting in the context of the theme of the app. 

# Commands

## Server

Download the [SWAPI GraphQL Wrapper](https://github.com/graphql/swapi-graphql) and then... 
### `npm start`

## Client

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
