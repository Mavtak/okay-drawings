import PropTypes from 'prop-types';
import React from 'react';
import Canvas from '../../Canvas.jsx';

class DrawingPad extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      penDown: false,
      currentStrokeStart: null,
    };
  }

  handleDraw = (updates) => {
    const {
      brushColor,
      brushWidthPx,
      onChange,
      value,
    } = this.props;
    const {
      currentStrokeStart,
      penDown,
      point,
    } = {
      ...this.state,
      ...updates,
    };
    let strokes = value.strokes;

    if (!penDown) {
      this.setState({
        currentStrokeStart: null,
        penDown: false,
      });

      return;
    }

    let stroke;

    if (currentStrokeStart != null) {
      stroke = {
        end: point,
        brush: {
          color: brushColor,
          widthPx: brushWidthPx,
        },
        start: currentStrokeStart,
      };
    }

    this.setState({
      currentStrokeStart: point,
      penDown,
    });

    if (stroke) {
      onChange({
        ...value,
        strokes: [
          ...strokes,
          stroke
        ],
      });
    }
  }

  render = () => {
    const {
      value,
    } = this.props;

    return (
      <Canvas
        drawing={value}
        onDraw={this.handleDraw}
        style={{
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      />
    );
  }
}

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
