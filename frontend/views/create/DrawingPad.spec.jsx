import {
  shallow,
} from 'enzyme';
import React from 'react';
import Canvas from '../../Canvas.jsx';
import DrawingPad from './DrawingPad.jsx';

describe('DrawingPad', () => {
  let onChange;
  let subject;

  beforeEach(() => {
    onChange = jest.fn();

    subject = shallow(
      <DrawingPad
        brushColor="somecolor"
        brushWidthPx={123}
        onChange={onChange}
        value={{
          dimensionsPx: {
            height: 222,
            width: 333,
          },
          strokes: [
            {
              end: {
                x: 1,
                y: 2,
              },
              start: {
                x: 9,
                y: 8,
              },
            },
          ],
        }}
      />
    );
  });

  it('renders as a Canvas', () => {
    expect(subject.type()).toBe(Canvas);
  });

  it('passes through the value prop to the Canvas as the drawing prop', () => {
    expect(subject.props().drawing).toEqual({
      dimensionsPx: {
        height: 222,
        width: 333,
      },
      strokes: [
        {
          end: {
            x: 1,
            y: 2,
          },
          start: {
            x: 9,
            y: 8,
          },
        },
      ],
    });
  });

  it('sets a border on the Canvas', () => {
    expect(subject.props().style).toEqual({
      border: '1px solid black',
      boxSizing: 'border-box',
    });
  });
});
