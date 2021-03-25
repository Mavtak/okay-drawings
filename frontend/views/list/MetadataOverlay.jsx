import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import userSession from '../../userSession.js';

const MetadataOverlay = ({
  drawing,
  onDelete,
}) => (
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
    {
      (drawing.user.username === userSession.get()?.username) &&
      <button
        onClick={(event) => {
          event.preventDefault();

          onDelete();
        }}
      >
        delete
      </button>
    }
  </div>
);

MetadataOverlay.propTypes = {
  drawing: PropTypes.shape({
    durationMs: PropTypes.number,
    startTime: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default MetadataOverlay;