import {
  useState,
} from 'react';
import useOnDraw from './useOnDraw.js';

jest.mock('react', () => ({
  useState: jest.fn(),
}));

describe('useOnDraw', () => {
  let currentStrokeStart;
  let penDown
  let setCurrentStrokeStart;
  let setPenDown;

  beforeEach(() => {
    currentStrokeStart = null;
    penDown = null;
    setCurrentStrokeStart = jest.fn();
    setPenDown = jest.fn();

    useState.mockImplementationOnce(() => [currentStrokeStart, setCurrentStrokeStart]);
    useState.mockImplementationOnce(() => [penDown, setPenDown]);
  });

  it('calls useState with initial values', () => {
    useOnDraw({});

    expect(useState.mock.calls).toEqual([
      [null],
      [false],
    ]);
  });

  it('returns a function (onDraw)', () => {
    const actual = useOnDraw({});

    expect(actual).toEqual(expect.any(Function));
  });

  describe('onDraw', () => {
    let onChange;
    let onDraw;

    beforeEach(() => {
      onChange = jest.fn();

      onDraw = (...args) => useOnDraw({
        brushColor: 'some-brush-color',
        brushWidthPx: 5,
        onChange,
        value: {
          otherProperties: 'just passed along',
          strokes: [
            {
              whateverExistingStrokes: 'derp',
            },
          ],
        },
      })(...args);
    });

    describe('when penDown state is true', () => {
      beforeEach(() => {
        penDown = true;
      });

      describe('when currentStrokeStart state has a value', () => {
        beforeEach(() => {
          currentStrokeStart = {x: 123, y: 456};
        });

        describe('when called with penDown = false', () => {
          beforeEach(() => {
            onDraw({
              penDown: false,
            });
          });

          it('sets penDown state to false', () => {
            expect(setPenDown).toHaveBeenCalledWith(false);
          });

          it('sets currentStrokeStart state to null', () => {
            expect(setCurrentStrokeStart).toHaveBeenCalledWith(null);
          });

          it('does not call onChange', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
        });
        
        describe('when called with a point', () => {
          beforeEach(() => {
            onDraw({
              point: {
                x: 70,
                y: 80,
              },
            });
          });

          it('sets penDown state to true', () => {
            expect(setPenDown).toHaveBeenCalledWith(true);
          });

          it('sets currentStrokeStart state to the point', () => {
            expect(setCurrentStrokeStart).toHaveBeenCalledWith({
              x: 70,
              y: 80,
            });
          });

          it('calls onChange with updated strokes', () => {
            expect(onChange).toHaveBeenCalledWith({
              otherProperties: 'just passed along',
              strokes: [
                {
                  whateverExistingStrokes: 'derp',
                },
                {
                  brush: {
                    color: 'some-brush-color',
                    widthPx: 5,
                  },
                  end: {
                    x: 70,
                    y: 80,
                  },
                  start: {
                    x: 123,
                    y: 456,
                  },
                },
              ],
            });
          });
        });
      });

      describe('when currentStrokeStart state does not have a value', () => {
        beforeEach(() => {
          currentStrokeStart = null;
        });

        describe('when called with penDown = false', () => {
          beforeEach(() => {
            onDraw({
              penDown: false,
            });
          });

          it('sets penDown state to false', () => {
            expect(setPenDown).toHaveBeenCalledWith(false);
          });

          it('sets currentStrokeStart state to null', () => {
            expect(setCurrentStrokeStart).toHaveBeenCalledWith(null);
          });

          it('does not call onChange', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
        });
        
        describe('when called with a point', () => {
          beforeEach(() => {
            onDraw({
              point: {
                x: 123,
                y: 456,
              },
            });
          });

          it('sets penDown state to true', () => {
            expect(setPenDown).toHaveBeenCalledWith(true);
          });

          it('sets currentStrokeStart state to the point', () => {
            expect(setCurrentStrokeStart).toHaveBeenCalledWith({
              x: 123,
              y: 456,
            });
          });

          it('does not call onChange', () => {
            expect(onChange).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('when penDown state is false (currentStrokeStart state is null)', () => {
      beforeEach(() => {
        penDown = false;
        currentStrokeStart = null;
      });

      describe('when called with a point and penDown not set', () => {
        beforeEach(() => {
          onDraw({
            point: {
              x: 123,
              y: 456,
            },
          });
        });

        it('sets penDown state to false', () => {
          expect(setPenDown).toHaveBeenCalledWith(false);
        });

        it('set currentStrokeStart state to null', () => {
          expect(setCurrentStrokeStart).toHaveBeenCalledWith(null);
        });

        it('does not call onChange', () => {
          expect(onChange).not.toHaveBeenCalled();
        });
      });
      
      describe('when called with a point and penDown = true', () => {
        beforeEach(() => {
          onDraw({
            penDown: true,
            point: {
              x: 123,
              y: 456,
            },
          });
        });

        it('sets penDown state to true', () => {
          expect(setPenDown).toHaveBeenCalledWith(true);
        });

        it('sets currentStrokeStart state to the point', () => {
          expect(setCurrentStrokeStart).toHaveBeenCalledWith({
            x: 123,
            y: 456,
          });
        });

        it('does not call onChange', () => {
          expect(onChange).not.toHaveBeenCalled();
        });
      });
    });
  });
});
