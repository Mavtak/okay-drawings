import PropTypes from 'prop-types';
import React from 'react';
import Canvas from '../../Canvas.jsx';
import useOnDraw from './useOnDraw.js';

const DrawingPad = ({
  brushColor,
  brushWidthPx,
  onChange,
  value,
}) => {
  const onDraw = useOnDraw({
    brushColor,
    brushWidthPx,
    onChange,
    value,
  });

  return (
    <Canvas
      drawing={value}
      onDraw={onDraw}
      style={{
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    />
  );
};

DrawingPad.propTypes = {
  brushColor: PropTypes.string.isRequired,
  brushWidthPx: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    dimensionsPx: Canvas.propTypes.dimensionsPx,
    strokes: Canvas.propTypes.strokes,
  }),
};

export default DrawingPad;
