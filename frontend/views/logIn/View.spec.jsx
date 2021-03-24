import {
  shallow,
} from 'enzyme';
import React from 'react';
import userSession from '../../userSession.js';
import View from './View.jsx';

jest.mock('../../userSession.js', () => ({
  logIn: jest.fn(),
}));

describe('View', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(
      <View />
    );
  });

  it('has initial state', () => {
    expect(subject.state()).toEqual({
      username: '',
    });
  });

  describe('handleChangeUsername', () => {
    it('sets the state', () => {
      const event = {
        target: {
          value: 'new value',
        },
      };

      subject.instance().handleChangeUsername(event);

      expect(subject.state().username).toBe('new value');
    });
  });

  describe('handleLogIn', () => {
    let event;

    beforeEach(() => {
      event = {
        preventDefault: jest.fn(),
      };
    });

    it('prevents the browser form submitting', () => {
      subject.instance().handleLogIn(event);

      expect(event.preventDefault).toHaveBeenCalledWith();
    });

    describe('when the username is blank', () => {
      beforeEach(() => {
        subject.setState({
          username: '',
        });

        subject.instance().handleLogIn(event);
      });

      it('does not call userSession.logIn', () => {
        expect(userSession.logIn).not.toHaveBeenCalled();
      });
    });

    describe('when the username is set', () => {
      beforeEach(() => {
        subject.setState({
          username: 'some.user',
        });

        subject.instance().handleLogIn(event);
      });

      it('calls userSession.logIn', () => {
        expect(userSession.logIn).toHaveBeenCalledWith({
          username: 'some.user',
        });
      });
    });
  });

  describe('render', () => {
    it('renders as a form', () => {
      expect(subject.type()).toBe('form');
    });
  });
});
