import {
  shallow,
} from 'enzyme';
import React from 'react';
import Choice from './ColorPicker.Choice.jsx';

describe('Choice', () => {
  let onChange;
  let subject;

  beforeEach(() => {
    onChange = jest.fn();

    subject = shallow(
      <Choice
        isSelected={false}
        onChange={onChange}
        value="red"
      />
    );
  });

  it('renders as a div', () => {
    expect(subject.type()).toBe('div');
  });

  it('is styled with the background color matching the value prop', () => {
    expect(subject.props().style.backgroundColor).toBe('red');
  });

  describe('when the isSelected prop is false', () => {
    beforeEach(() => {
      subject.setProps({
        isSelected: false,
      });
    });

    it('has a border width of 1px', () => {
      expect(subject.props().style.borderWidth).toBe('1px');
    });
  });

  describe('when the selected prop is false', () => {
    beforeEach(() => {
      subject.setProps({
        isSelected: true,
      });
    });

    it('has a border width of 3px', () => {
      expect(subject.props().style.borderWidth).toBe('3px');
    });
  });
});
