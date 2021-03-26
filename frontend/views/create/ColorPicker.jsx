import PropTypes from 'prop-types';
import React from 'react';
import Choice from './ColorPicker.Choice.jsx';

const ColorPicker = ({
  choices,
  onChange,
  value,
}) => (
  <div>
    {
      choices.map((color) => (
        <Choice 
          key={color}
          isSelected={color === value}
          onChange={onChange}
          value={color}
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
