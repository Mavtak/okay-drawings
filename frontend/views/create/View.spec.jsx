import {
  shallow,
} from 'enzyme';
import React from 'react';
import View from './View.jsx';

describe('View', () => {
  let subject;
  let onSave;

  beforeEach(() => {
    onSave = jest.fn();

    subject = shallow(
      <View
        listPath="/some-list-path"
        onSave={onSave}
      />
    );
  });

  it('renders as a div', () => {
    expect(subject.type()).toBe('div');
  });
});
