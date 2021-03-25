import PropTypes from 'prop-types';
import React from 'react';

const ColorPicker = ({
  choices,
  onChange,
  value,
}) => (
  <div>
    {
      choices.map((color) => (
        <div
          key={color}
          onClick={() => onChange(color)}
          style={{
            display: 'inline-block',
            margin: '5px',
            backgroundColor: color,
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            boxSizing: 'border-box',
            borderRadius: '100%',
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: (color === value)
              ? '3px'
              : '1px',
          }}
        />
      ))
    }
  </div>
);

ColorPicker.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorPicker;
