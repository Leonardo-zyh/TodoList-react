import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

let div = document.getElementById('root')
ReactDOM.render(<App />,div );  
//render,把标签渲染且放置在div
//XML

