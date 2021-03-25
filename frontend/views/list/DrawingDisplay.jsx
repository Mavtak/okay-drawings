import PropTypes from 'prop-types';
import React from 'react';
import Canvas from '../../Canvas.jsx';
import MetadataOverlay from './MetadataOverlay.jsx';

const DrawingDisplay = ({
  drawing,
}) => (
  <div
    style={{
      display: 'inline-block',
      border: '1px solid black',
      margin: '10px',
      width: '200px',
      height: '200px',
    }}
  >
    <Canvas
      drawing={drawing}
      resize={{
        height: '200px',
        width: '200px',
      }}
    />
    <MetadataOverlay
      drawing={drawing}
    />
  </div>
);

DrawingDisplay.propTypes = {
  drawing: PropTypes.shape({
    dimensionsPx: Canvas.propTypes.dimensionsPx,
    strokes: Canvas.propTypes.strokes,
  }).isRequired,
};

export default DrawingDisplay;