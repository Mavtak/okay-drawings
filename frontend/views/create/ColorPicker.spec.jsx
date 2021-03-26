import {
  shallow,
} from 'enzyme';
import React from 'react';
import ColorPicker from './ColorPicker.jsx';
import Choice from './ColorPicker.Choice.jsx';

describe('ColorPicker', () => {
  let onChange;
  let subject;

  beforeEach(() => {
    onChange = jest.fn();

    subject = shallow(
      <ColorPicker
        choices={[
          'red',
          'green',
          'blue',
        ]}
        onChange={onChange}
        value="green"
      />
    );
  });

  it('renders as a div', () => {
    expect(subject.type()).toBe('div');
  });

  it('renders a Choice component for each choice value', () => {
    const choices = subject.find(Choice);

    expect(choices.length).toBe(3);

    expect(choices.at(0).props().isSelected).toBe(false);
    expect(choices.at(0).props().onChange).toBe(onChange);
    expect(choices.at(0).props().value).toBe('red');

    expect(choices.at(1).props().isSelected).toBe(true);
    expect(choices.at(1).props().onChange).toBe(onChange);
    expect(choices.at(1).props().value).toBe('green');

    expect(choices.at(2).props().isSelected).toBe(false);
    expect(choices.at(2).props().onChange).toBe(onChange);
    expect(choices.at(2).props().value).toBe('blue');
  });
});