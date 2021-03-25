import moment from 'moment';
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
    <hr />
    <div
      style={{
        padding: '5px',
        textAlign: 'center',
      }}
    >
      <div>
        imagined by {drawing.user.username}
      </div>
      {
        drawing.startTime &&
        <div>
          {moment(drawing.startTime).fromNow()}
        </div>
      }
      {
        (drawing.durationMs >= 0) &&
        <div>
          spending {Math.floor(drawing.durationMs/1000)} seconds
        </div>
      }
      

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