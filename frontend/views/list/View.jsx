import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
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
      createPath,
    } = this.props;
    const {
      drawings,
    } = this.state;

    return (
      <div>
        <div>
          <Link
            to={createPath}
          >
            draw something
          </Link>
        </div>
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

View.propTypes = {
  createPath: PropTypes.string.isRequired,
};

export default View;
