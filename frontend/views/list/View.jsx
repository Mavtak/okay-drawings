import React from 'react';
import api from '../../api.js';
import DrawingDisplay from './DrawingDisplay.jsx';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawings: [],
    };
  }

  componentDidMount = async () => {
    await this.loadDrawings();
  }

  loadDrawings = async () => {
    const drawings = await api.listDrawings();

    this.setState({
      drawings: drawings.results,
    });
  }

  render = () => {
    const {
      drawings,
    } = this.state;

    return (
      <div>
        {
          drawings.map((drawing, index) => (
            <DrawingDisplay
              drawing={drawing}
              key={index}
            />
          ))
        }
      </div>
    );
  }

}
export default View;
