import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import document from './document.js';

export default () => {
  let element = (
    <App />
  );

  let root = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(element, root);
}
