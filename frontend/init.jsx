import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

function init() {
  let element = (
    <App />
  );

  let root = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(element, root);
}

export default init;
