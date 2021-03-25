import {
  shallow,
} from 'enzyme';
import React from 'react';
import View from './View.jsx';

describe('View', () => {
  let onLoggedOut;
  let onSave;
  let subject;

  beforeEach(() => {
    onLoggedOut = jest.fn();
    
    onSave = jest.fn();

    subject = shallow(
      <View
        listPath="/some-list-path"
        onLoggedOut={onLoggedOut}
        onSave={onSave}
      />
    );
  });

  it('renders as a div', () => {
    expect(subject.type()).toBe('div');
  });
});
