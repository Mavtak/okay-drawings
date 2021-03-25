import {
  shallow,
} from 'enzyme';
import React from 'react';
import View from './View.jsx';

describe('View', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(
      <View
        createPath="/some-create-path"
      />
    );
  });

  it('renders as a div', () => {
    expect(subject.type()).toBe('div');
  });
});
