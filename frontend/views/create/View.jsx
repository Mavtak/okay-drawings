import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import ColorPicker from './ColorPicker.jsx';
import DrawingPad from './DrawingPad.jsx';
import WidthPicker from './WidthPicker.jsx';
import api from '../../api.js';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brushColor: 'purple',
      brushWidthPx: 1,
      drawing: {
        dimensionsPx: {
          height: 500,
          width: 800,
        },
        strokes: [],
      },
    };
  }

  handleChangeBrushColor = (color) => {
    this.setState({
      brushColor: color,
    });
  }

  handleChangeBrushWidth = (width) => {
    this.setState({
      brushWidthPx: width,
    });
  }

  handleChangeDrawing = (drawing) => {
    this.setState({
      drawing,
    });
  }

  handleSave = async () => {
    const {
      onSave,
    } = this.props;
    const {
      drawing,
    } = this.state;

    const id = await api.createDrawing(drawing);

    onSave(id);
  }

  render = () => {
    let {
      listPath,
    } = this.props;
    let {
      brushColor,
      brushWidthPx,
      drawing,
    } = this.state;

    return (
      <div>
        <div>
          <Link
            to={listPath}
          >
            back to listing
          </Link>
        </div>
        <div>
          <ColorPicker
            choices={[
              'purple',
              'orangered',
              'green',
              'yellow',
              'skyblue',
            ]}
            onChange={this.handleChangeBrushColor}
            value={brushColor}
          />
          <WidthPicker
            choices={[
              1,
              3,
              5,
              10,
              18,
            ]}
            onChange={this.handleChangeBrushWidth}
            value={brushWidthPx}
          />
          <DrawingPad
            brushColor={brushColor}
            brushWidthPx={brushWidthPx}
            onChange={this.handleChangeDrawing}
            value={drawing}
          />
        </div>
        <div>
          <button
            onClick={this.handleSave}
          >
          save
          </button>
        </div>
        
      </div>
    );
  }
}

View.propTypes = {
  listPath: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default View;
