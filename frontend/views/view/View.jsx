import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import api from '../../api.js';
import Canvas from '../../Canvas.jsx';
import LoadingView from '../Loading/View.jsx';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawing: null,
      loading: true,
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
      loading: false,
    });
  }

  render = () => {
    const {
      listPath,
    } = this.props;
    let {
      drawing,
      loading,
    } = this.state;

    if (loading) {
      return (
        <LoadingView />
      );
    }

    return (
      <div>
        <div>
          <Link
            to={listPath}
          >
          back to listing
          </Link>
        </div>
        {
          drawing &&
          <Canvas
            drawing={drawing}
          />
        }
      </div>
    );
  }
}

View.propTypes = {
  listPath: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default View;
