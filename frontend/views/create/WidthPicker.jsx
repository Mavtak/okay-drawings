import PropTypes from 'prop-types';
import React from 'react';

const WidthPicker = ({
  choices,
  onChange,
  value,
}) => (
  <div>
    {
      choices.map((width) => (
        <div
          key={width}
          onClick={() => onChange(width)}
          style={{
            display: 'inline-block',
            margin: '5px',
            backgroundColor: 'white',
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            boxSizing: 'border-box',
            borderRadius: '100%',
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: (width === value)
              ? '3px'
              : '1px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              width: `${width}px`,
              height: `${width}px`,
              backgroundColor: 'black',
              borderRadius: '100%',
              margin: `${((50-width)/2) - ((width === value)?3:1)}px`,
            }}
          />
        </div>
      ))
    }
  </div>
);

WidthPicker.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default WidthPicker;
