import React from 'react';
import DrawingPad from './DrawingPad.jsx';

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

  render = () => {
    let {
      drawing,
    } = this.state;

    return (
      <div>
        <DrawingPad
          onChange={this.handleChangeDrawing}
          value={drawing}
        />
      </div>
    );
  }
}

export default View;
