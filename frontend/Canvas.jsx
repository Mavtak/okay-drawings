import PropTypes from 'prop-types';
import React from 'react';

const Canvas = ({
  onDraw,
  drawing,
  resize,
  ...props
}) => (
  <svg
    height={resize?.height || drawing.dimensionsPx.height}
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
    width={resize?.width || drawing.dimensionsPx.width}
    viewBox={resize && `0 0 ${drawing.dimensionsPx.height} ${drawing.dimensionsPx.width}`}
    {...props}
  >
    {
      drawing.strokes.map(({
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
  drawing: PropTypes.shape({
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
};

export default Canvas;