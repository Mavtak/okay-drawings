import {
  shallow,
} from 'enzyme';
import React from 'react';
import View from './View.jsx';

describe('View', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(
      <View />
    );
  });

  it('renders as a div', () => {
    expect(subject.type()).toBe('div');
  });
});
