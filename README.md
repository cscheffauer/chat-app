# Chat App
 
After login with your username you can easily send, edit and delete messages and see what your colleagues have written. <br />In the participants tab you can see a list of currently connected users.

## Tech

This Chat App uses a number of open source projects to work properly:

* [React] - a JS library for building user interfaces!
* [React-Linkify] - React component to parse links (urls, emails, etc.) in text into clickable links
* [Typescript] - TypeScript extends JavaScript by adding types.
* [Jest] - Jest is a delightful JavaScript Testing Framework with a focus on simplicity
* [Enzyme] - Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output.
* [Websocket] - JavaScript implementation of the WebSocket protocol versions 8 and 13 for Node.
* [Node.js] - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
<br />
<br />

## Available Scripts

In the project directory, you can run:


### `node server/server.js`

Runs the server in the development mode.<br />
To test it from different devices in the same network, change the IP in App.tsx to your own.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br /><br />



## Known issues

* Page is not displayed perfectly on mobile because of [vh viewport problem on mobile](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/) - to be fixed!




[React]: <https://reactjs.org/>
[React-Linkify]: <https://github.com/tasti/react-linkify>
[Jest]: <https://jestjs.io/>
[Enzyme]: <https://enzymejs.github.io/enzyme/>
[Typescript]: <https://www.typescriptlang.org/>
[Websocket]: <https://www.npmjs.com/package/websocket>
[Node.js]: <https://nodejs.org/en/about/>
