import React from 'react';
import errorStream from './errorStream.js';
import Debouncer from './Debouncer.js';

const errorDisplayTimeMs = 3000;

class ErrorOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.debouncer = new Debouncer();

    this.state = {
      error: null,
    };
  }

  componentDidMount = () => {
    this.unsubscribeFromErrorStream = errorStream.subscribe(this.handleError);
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFromErrorStream) {
      this.unsubscribeFromErrorStream();
    }
  }

  handleError = async (error) => {
    this.setState({
      error,
    });

    if (!(await this.debouncer.debounce(errorDisplayTimeMs))) {
      return;
    }

    this.setState({
      error: null,
    });
  }

  render = () => {
    const {
      error,
    } = this.state;

    if (!error) {
      return null;
    }

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          backgroundColor: 'red',
          borderLeft: '1px solid black',
          borderBottom: '1px solid black',
          padding: '10px',
          color: 'white',
          fontSize: '150%',
        }}
      >
        {error.message}
      </div>
    );
  }
}

export default ErrorOverlay;
