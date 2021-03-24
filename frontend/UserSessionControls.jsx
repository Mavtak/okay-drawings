import React from 'react';
import {
  Link,
} from 'react-router-dom';
import userSession from './userSession.js';

class UserSessionControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {
    this.loadUser();
    userSession.subscribe(this.loadUser);
  }

  loadUser = () => {
    const user = userSession.get();

    this.setState({
      user,
    });
  };

  render = () => {
    const {
      user,
    } = this.state;
    const {
      renderLoggedIn: LoggedIn,
      renderLoggedOut : LoggedOut,
    } = this;
    
    return (
      <div
        style={{
          border: '1px solid black',
          borderRadius: '3px',
          padding: '6px',
        }}
      >
        {
          user
            ? (
              <LoggedIn />
            )
            : (
              <LoggedOut />
            )
        }
      </div>
    );
  }

  renderLoggedIn = () => {
    const {
      user,
    } = this.state;

    return (
      <>
        <span>logged in as <strong>{user.username}</strong> </span>
        <button
          onClick={userSession.logOut}
        >
          log out
        </button>
      </>
    );
  }

  renderLoggedOut = () => (
    <>
      <Link
        to="/log-in"
      >
        log in
      </Link>
      <span> to draw something</span>
    </>
  )
}

export default UserSessionControls;
