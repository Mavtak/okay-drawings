import {
  useState,
} from 'react';

export default ({
  brushColor,
  brushWidthPx,
  onChange,
  value,
}) => {
  const [currentStrokeStart, setCurrentStrokeStart] = useState(null);
  const [penDown, setPenDown] = useState(false);

  return (updates) => {
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
};
