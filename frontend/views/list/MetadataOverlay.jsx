import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

const MetadataOverlay = ({
  drawing,
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
  </div>
);

MetadataOverlay.propTypes = {
  drawing: PropTypes.shape({
    durationMs: PropTypes.number,
    startTime: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  })
};

export default MetadataOverlay;