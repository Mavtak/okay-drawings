import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import api from '../../api.js';
import errorStream from '../../errorStream.js';
import userSession from '../../userSession.js';
import LoadingView from '../Loading/View.jsx';
import ColorPicker from './ColorPicker.jsx';
import DrawingPad from './DrawingPad.jsx';
import WidthPicker from './WidthPicker.jsx';

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
        isPublic: true,
        strokes: [],
      },
      submitting: false,
    };
  }

  checkLoggedIn = () => {
    const {
      onLoggedOut,
    } = this.props;
    const user = userSession.get();

    if (!user) {
      onLoggedOut();
    }
  }

  componentDidMount = () => {
    this.checkLoggedIn();

    this.unsubscribeFromUserSession = userSession.subscribe(this.checkLoggedIn);
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFromUserSession) {
      this.unsubscribeFromUserSession();
    }
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
    if (!drawing.startTime) {
      drawing = {
        ...drawing,
        startTime: new Date(),
      };
    }

    this.setState({
      drawing,
    });
  }

  handleChangeIsPublic = (event) => {
    const {
      drawing,
    } = this.state;

    this.setState({
      drawing: {
        ...drawing,
        isPublic: event.target.checked,
      },
    });
  }

  handleSave = async () => {
    const {
      onSave,
    } = this.props;
    const {
      drawing,
    } = this.state;
    const durationMs = drawing.startTime
      ? new Date() - drawing.startTime
      : 0;
    const drawingToSave = {
      ...drawing,
      durationMs,
    };

    this.setState({
      submitting: true,
    });

    const id = await api.createDrawing(drawingToSave);

    if (!id) {
      errorStream.publish({
        message: 'oh no!  I couldn\'d save your masterpiece.',
      });

      this.setState({
        submitting: false,
      });

      return;
    }

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
      submitting,
    } = this.state;

    if (submitting) {
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
          <label>
            <input
              type="checkbox"
              checked={drawing.isPublic}
              onChange={this.handleChangeIsPublic}
            />
            share with the world
          </label>
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
  onLoggedOut: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default View;
