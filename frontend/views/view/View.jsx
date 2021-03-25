import PropTypes from 'prop-types';
import React from 'react';
import api from '../../api.js';
import Canvas from '../../Canvas.jsx';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawing: null,
    };
  }

  componentDidMount = async () => {
    await this.loadDrawing();
  };

  loadDrawing = async () => {
    const {
      id,
    } = this.props;

    const drawing = await api.readDrawing(id);

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
        {
          drawing &&
          <Canvas
            {...drawing}
          />
        }
      </div>
    );
  }
}

View.propTypes = {
  id: PropTypes.string.isRequired,
};

export default View;
