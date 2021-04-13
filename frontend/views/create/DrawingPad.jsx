import PropTypes from 'prop-types';
import React, {
  useState,
} from 'react';
import Canvas from '../../Canvas.jsx';

const DrawingPad = ({
  brushColor,
  brushWidthPx,
  onChange,
  value,
}) => {
  const [currentStrokeStart, setCurrentStrokeStart] = useState(null);
  const [penDown, setPenDown] = useState(false);
  const handleDraw = (updates) => {
    const {
      currentStrokeStart: newCurrentStrokeStart,
      penDown: newPenDown,
      point,
    } = {
      currentStrokeStart,
      penDown,
      ...updates,
    };
    let strokes = value.strokes;

    if (!newPenDown) {
      setCurrentStrokeStart(null);
      setPenDown(false);

      return;
    }

    let stroke;

    if (newCurrentStrokeStart != null) {
      stroke = {
        end: point,
        brush: {
          color: brushColor,
          widthPx: brushWidthPx,
        },
        start: newCurrentStrokeStart,
      };
    }

    setCurrentStrokeStart(point);
    setPenDown(newPenDown);

    if (stroke) {
      onChange({
        ...value,
        strokes: [
          ...strokes,
          stroke
        ],
      });
    }
  };

  return (
    <Canvas
      drawing={value}
      onDraw={handleDraw}
      style={{
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    />
  );
};

DrawingPad.propTypes = {
  brushColor: PropTypes.string.isRequired,
  brushWidthPx: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    dimensionsPx: Canvas.propTypes.dimensionsPx,
    strokes: Canvas.propTypes.strokes,
  }),
};

export default DrawingPad;
