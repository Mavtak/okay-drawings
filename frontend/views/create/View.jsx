import React from 'react';
import DrawingPad from './DrawingPad.jsx';
import api from '../../api.js';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawing: {
        dimensionsPx: {
          height: 500,
          width: 800,
        },
        strokes: [],
      },
    };
  }

  handleChangeDrawing = (drawing) => {
    this.setState({
      drawing,
    });
  }

  handleSave = async () => {
    const {
      drawing,
    } = this.state;

    await api.createDrawing(drawing);
  }

  render = () => {
    let {
      drawing,
    } = this.state;

    return (
      <div>
        <div>
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

export default View;
