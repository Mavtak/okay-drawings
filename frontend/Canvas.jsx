import PropTypes from 'prop-types';
import React from 'react';

const Canvas = ({
  dimensionsPx,
  strokes,
  ...props
}) => (
  <svg
    height={dimensionsPx.height}
    width={dimensionsPx.width}
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
  strokes: PropTypes.arrayOf(
    PropTypes.shape({
      end: coordinatesPropType.isRequired,
      start: coordinatesPropType.isRequired,
    }),
  ),
};

export default Canvas;