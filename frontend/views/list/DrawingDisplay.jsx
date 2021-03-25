import PropTypes from 'prop-types';
import React from 'react';
import Canvas from '../../Canvas.jsx';

const DrawingDisplay = ({
  drawing,
}) => (
  <div
    style={{
      display: 'inline-block',
      border: '1px solid black',
      margin: '10px',
    }}
  >
    <Canvas
      dimensionsPx={drawing.dimensionsPx}
      resize={{
        height: '200px',
        width: '200px',
      }}
      strokes={drawing.strokes}
    />
    <hr />
    <div
      style={{
        padding: '5px',
        textAlign: 'center',
      }}
    >
      imagined by {drawing.user.username}
    </div>
  </div>
);

DrawingDisplay.propTypes = {
  drawing: PropTypes.shape({
    dimensionsPx: Canvas.propTypes.dimensionsPx,
    strokes: Canvas.propTypes.strokes,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  })
};

export default DrawingDisplay;