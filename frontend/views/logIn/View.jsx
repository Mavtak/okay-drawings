import PropTypes from 'prop-types';
import React from 'react';
import userSession from '../../userSession.js';

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      username: '',
    };
  }

  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  handleLogIn = (event) => {
    const {
      onLoggedIn,
    } = this.props;
    const {
      username,
    } = this.state;

    event.preventDefault();

    if (!username) {
      return;
    }

    userSession.logIn({
      username,
    });

    onLoggedIn();
  }

  render = () => {
    const {
      username,
    } = this.state;

    return (
      <form
        onSubmit={this.handleLogIn}
      >
        <p>I trust you. enter the username that feels right.</p>
        <p>
          <input
            onChange={this.handleChangeUsername}
            type="text"
            value={username}
          />
        </p>
        <p>
          <button
            type="submit"
          >
            log in
          </button>
        </p>
      </form>
    );
  }
}

View.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default View;
