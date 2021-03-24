import {
  shallow,
} from 'enzyme';
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import userSession from './userSession.js';
import UserSessionControls from './UserSessionControls.jsx';

jest.mock('./userSession.js', () => ({
  get: jest.fn(),
  logOut: jest.fn(),
  subscribe: jest.fn(),
}));

describe('UserSessionControls', () => {
  let subject;
  
  beforeEach(() => {
    subject = shallow(
      <UserSessionControls />
    );
  });

  it('has initial state', () => {
    expect(subject.state()).toEqual({
      user: null,
    });
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      jest.spyOn(subject.instance(), 'loadUser');

      subject.instance().componentDidMount();
    });

    it('calls loadUser', () => {
      expect(subject.instance().loadUser).toHaveBeenCalledWith();
    });

    it('subscribes to user session updates', () => {
      expect(userSession.subscribe).toHaveBeenCalledWith(subject.instance().loadUser);
    });
  });

  describe('loadUser', () => {
    it('calls userSession.get', () => {
      subject.instance().loadUser();

      expect(userSession.get).toHaveBeenCalledWith();
    });

    describe('when userSession returns a value', () => {
      beforeEach(() => {
        userSession.get.mockReturnValue({
          username: 'some.user',
        });

       subject.instance().loadUser();
      })

      it('sets the state to that value', () => {
        expect(subject.state().user).toEqual({
          username: 'some.user',
        });
      });
    });

    describe('when userSession returns null', () => {
      beforeEach(() => {
        userSession.get.mockReturnValue(null);

       subject.instance().loadUser();
      })

      it('sets the state to that value', () => {
        expect(subject.state().user).toEqual(null);
      });
    });
  });

  describe('render', () => {
    describe('when user is logged out', () => {
      beforeEach(() => {
        subject.setState({
          user: null,
        });
      });

      it('does not render LoggedIn', () => {
        expect(subject.find(subject.instance().renderLoggedIn).length).toBe(0);
      });

      it('renders LoggedOut', () => {
        expect(subject.find(subject.instance().renderLoggedOut).length).toBe(1);
      });
    });

    describe('when user is logged in', () => {
      beforeEach(() => {
        subject.setState({
          user: {
            username: 'some.user',
          },
        });
      });

      it('renders LoggedIn', () => {
        expect(subject.find(subject.instance().renderLoggedIn).length).toBe(1);
      });

      it('does not render LoggedOut', () => {
        expect(subject.find(subject.instance().renderLoggedOut).length).toBe(0);
      });
    });
  });

  describe('renderLoggedIn', () => {
    const loggedIn = () => shallow(
      <div>
        {
          subject.instance().renderLoggedIn()
        }
      </div>
    ).children();

    beforeEach(() => {
      subject.setState({
        user: {
          username: 'some.user',
        },
      });
    });

    it('renders some text', () => {
      const text = loggedIn()
        .children()
        .map(x => x.text())
        .join('');

      expect(text).toBe('logged in as some.user log out');
    });

    it('renders a button to log out', () => {
      const button = loggedIn().find('button');

      expect(button.length).toBe(1);
      expect(button.props().onClick).toBe(userSession.logOut);
      expect(button.text()).toBe('log out');
    });
  });

  describe('renderLoggedOut', () => {
    const loggedIn = () => shallow(
      <div>
        {
          subject.instance().renderLoggedOut()
        }
      </div>
    ).children();

    it('renders some text', () => {
      const text = loggedIn()
        .children()
        .map(x => x.text())
        .join('');

      expect(text).toBe('log in to draw something');
    });

    it('renders a link to log in', () => {
      const link = loggedIn().find(Link);

      expect(link.length).toBe(1);
      expect(link.props().to).toBe('/log-in');
      expect(link.text()).toBe('log in');
    });
  });
});