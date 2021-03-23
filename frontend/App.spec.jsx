import {
  shallow,
} from 'enzyme';
import React from 'react';
import App from './App.jsx';

describe('App', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(
      <App />
    );
  });

  it('is a div', () => {
    expect(subject.type()).toBe('div');
  });

  it('contains text', () => {
    expect(subject.text()).toBe('this is fine!');
  });
});
