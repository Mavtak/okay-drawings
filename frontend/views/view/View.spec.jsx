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
        listPath="/some-list-path"
        id="some-id"
      />
    );
  });

  describe('when not loading', () => {
    beforeEach(() => {
      subject.setState({
        loading: false,
      });
    });

    it('renders as a div', () => {
      expect(subject.type()).toBe('div');
    });
  });
});
