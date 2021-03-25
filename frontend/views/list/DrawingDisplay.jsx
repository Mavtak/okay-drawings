import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Canvas from '../../Canvas.jsx';
import MetadataOverlay from './MetadataOverlay.jsx';

const DrawingDisplay = ({
  drawing,
}) => (
  <Link
    to={`/view/${encodeURIComponent(drawing.id)}`}
    style={{
      color: 'black',
    }}
  >
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        border: '1px solid black',
        margin: '10px',
      }}
    >
      <Canvas
        drawing={drawing}
        resize={{
          height: '200px',
          width: '200px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <MetadataOverlay
          drawing={drawing}
        />
      </div>
    </div>
  </Link>
);

DrawingDisplay.propTypes = {
  drawing: PropTypes.shape({
    dimensionsPx: Canvas.propTypes.dimensionsPx,
    id: PropTypes.string.isRequired,
    strokes: Canvas.propTypes.strokes,
  }).isRequired,
};

export default DrawingDisplay;