import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

var _ = require('lodash');

//to calculate vh properly and make it work on mobile devices
const resize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', () => {
  _.debounce(resize, 150);    //debounce the window resize event to disable visual jumps while resizing the browser
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
