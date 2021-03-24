import PropTypes from 'prop-types';
import React from 'react';

const View = ({
  id,
}) => (
  <div>
    view view for {id}
  </div>
);

View.propTypes = {
  id: PropTypes.string.isRequired,
};

export default View;
