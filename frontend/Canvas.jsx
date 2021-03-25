import PropTypes from 'prop-types';
import React from 'react';

const Canvas = ({
  onDraw,
  dimensionsPx,
  resize,
  strokes,
  ...props
}) => (
  <svg
    height={resize?.height || dimensionsPx.height}
    onMouseDown={onDraw && (() => {
      onDraw({
        penDown: true,
      });
    })}
    onMouseMove={onDraw && ((event) => {
      const svg = event.target.tagName !==  'svg'
        ? event.target.parentElement
        : event.target;
      const containerRects = svg.getClientRects()[0];
      const point = {
        x: event.clientX - containerRects.x,
        y: event.clientY - containerRects.y
      };

      onDraw({
        point,
      });
    })}
    onMouseUp={onDraw && (() => {
      onDraw({
        penDown: false,
      });
    })}
    width={resize?.width || dimensionsPx.width}
    viewBox={resize && `0 0 ${dimensionsPx.height} ${dimensionsPx.width}`}
    {...props}
  >
    {
      strokes.map(({
        start, end
      }, i) => (
        <line
          key={i}
          style={{
            stroke: 'purple',
            strokeWidth: 1,
          }}
          x1={start.x}
          x2={end.x}
          y1={start.y}
          y2={end.y}
        />
      ))
    }
  </svg>
);

const coordinatesPropType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

Canvas.propTypes = {
  dimensionsPx: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  onDraw: PropTypes.func,
  resize: PropTypes.shape({
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }),
  strokes: PropTypes.arrayOf(
    PropTypes.shape({
      end: coordinatesPropType.isRequired,
      start: coordinatesPropType.isRequired,
    }),
  ),
};

export default Canvas;