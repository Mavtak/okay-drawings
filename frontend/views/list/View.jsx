import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import api from '../../api.js';
import errorStream from '../../errorStream.js';
import DrawingDisplay from './DrawingDisplay.jsx';
import userSession from '../../userSession.js';
import LoadingView from '../loading/View.jsx';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      drawings: [],
    };
  }

  componentDidMount = async () => {
    await this.loadDrawings();
    this.unsubscribeFromUserSession = userSession.subscribe(this.loadDrawings);
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFromUserSession) {
      this.unsubscribeFromUserSession();
    }
  }

  handleDelete = async (drawing) => {
    this.setState({
      drawings: this.state.drawings
        .map(x => (
          x.id === drawing.id
            ? {
              ...drawing,
              isDeleting: true,
            }
            : x
        )),
    });

    try {
      await api.deleteDrawing(drawing.id);
    }
    catch {
      errorStream.publish({
        message: 'hmm... looks like I ran into trouble deleting that, but it\'s so pretty anyway',
      });

      this.setState({
        drawings: this.state.drawings
          .map(x => (
            x.id === drawing.id
              ? {
                ...drawing,
                isDeleting: false,
              }
              : x
          )),
      });

      return;
    }
    
    this.setState({
      drawings: this.state.drawings
        .filter(x => x.id !== drawing.id),
    });
  }

  loadDrawings = async () => {
    this.setState({
      loading: true,
    });

    const drawings = await api.listDrawings();

    if (drawings === null) {
      errorStream.publish({
        message: '😭 I couldn\'t load all of these gorgeous creations',
      });

      this.setState({
        loading: false,
      });

      return;
    }

    this.setState({
      loading: false,
      drawings: drawings.results,
    });
  }

  render = () => {
    const {
      createPath,
    } = this.props;
    const {
      loading,
      drawings,
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
            to={createPath}
          >
            draw something
          </Link>
        </div>
        {
          drawings.map((drawing) => (
            !drawing.isDeleting &&
              <DrawingDisplay
                drawing={drawing}
                onDelete={() => this.handleDelete(drawing)}
                key={drawing.id}
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
