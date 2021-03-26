import PropTypes from 'prop-types';
import React from 'react';

const Choice = ({
  isSelected,
  onChange,
  value,
}) => (
  <div
    onClick={() => onChange(value)}
    style={{
      display: 'inline-block',
      margin: '5px',
      backgroundColor: value,
      cursor: 'pointer',
      width: '50px',
      height: '50px',
      boxSizing: 'border-box',
      borderRadius: '100%',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: (isSelected)
        ? '3px'
        : '1px',
    }}
  />
);

Choice.propTypes = {
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default Choice;
