import {
  shallow,
} from 'enzyme';
import React from 'react';
import Canvas from '../../Canvas.jsx';
import DrawingPad from './DrawingPad.jsx';
import useOnDraw from './useOnDraw.js';

jest.mock('./useOnDraw.js', () => jest.fn());

describe('DrawingPad', () => {
  const onDraw = () => {};
  const onChange = () => {};
  let subject;

  beforeEach(() => {
    useOnDraw.mockReturnValue(onDraw);

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

  it('calls useOnDraw', () => {
    expect(useOnDraw).toHaveBeenCalledWith({
      brushColor: 'somecolor',
      brushWidthPx: 123,
      onChange: onChange,
      value: {
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
      },
    });
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

  it('sets the onDraw prop to the result of useOnDraw', () => {
    expect(subject.props().onDraw).toBe(onDraw);
  });

  it('sets a border on the Canvas', () => {
    expect(subject.props().style).toEqual({
      border: '1px solid black',
      boxSizing: 'border-box',
    });
  });
});
