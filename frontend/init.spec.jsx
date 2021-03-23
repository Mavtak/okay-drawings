import React from 'react';
import ReactDOM from 'react-dom';
import document from './document.js';
import init from './init.jsx';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('./App.jsx', () => () => (
  <div>
    mocked App component
  </div>
));

jest.mock('./document.js', () => ({
  body: {
    appendChild: jest.fn(),
  },
  createElement: jest.fn(() => 'some div'),
}));

describe('init', () => {
  beforeEach(() => {
    init();
  });

  it('creates a root element', () => {
    expect(document.createElement).toHaveBeenCalledWith('div');
  });

  it('appends the element to the body', () => {
    expect(document.body.appendChild).toHaveBeenCalledWith('some div');
  });

  it('calls ReactDOM.render with the App and the root element', () => {
    expect(ReactDOM.render).toHaveBeenCalledWith(expect.anything(), 'some div');
  });
});
