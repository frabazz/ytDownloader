import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const usetube = require('usetube');
console.log("qualcosa funziona dio porco?");
var results = usetube.searchChannel("ninja");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
