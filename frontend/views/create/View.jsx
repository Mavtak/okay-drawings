import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import ColorPicker from './ColorPicker.jsx';
import DrawingPad from './DrawingPad.jsx';
import api from '../../api.js';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brushColor: 'purple',
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
          <DrawingPad
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
