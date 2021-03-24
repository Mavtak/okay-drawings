import localStorage from './localStorage.js';
import userSession from './userSession.js';

let eventStream

jest.mock('./EventStream.js', () => jest.fn(() => {
  return eventStream = {
    publish: jest.fn(),
    subscribe: jest.fn(),
  };
}));

jest.mock('./localStorage.js', () => ({}));

describe('userSession', () => {
  describe('getUser', () => {
    describe('when localStorage.currentUser is not set', () => {
      beforeEach(() => {
        delete localStorage.currentUser;
      });

      it('returns null', () => {
        const actual = userSession.get();

        expect(actual).toBe(null);
      });
    });
    
    describe('when localStorage.currentUser is set', () => {
      beforeEach(() => {
        localStorage.currentUser = `{
          "username": "some.username"
        }`;
      });

      it('returns the user', () => {
        const actual = userSession.get();

        expect(actual).toEqual({
          username: 'some.username',
        });
      });
    });
  });

  describe('logIn', () => {
    beforeEach(() => {
      userSession.logIn({
        extraData: 'could be anything',
        username: 'some-username',
      });
    });

    it('sets the user', () => {
      expect(localStorage.currentUser).toEqual('{"extraData":"could be anything","username":"some-username"}');
    });

    it('publishes an event', () => {
      expect(eventStream.publish).toHaveBeenCalledWith();
    });
  });

  describe('logOut', () => {
    describe('when localStorage.currentUser is set', () => {
      beforeEach(() => {
        localStorage.currentUser = `{
          "username": "some.username",
        }`;

        userSession.logOut();
      });

      it('clears localStorage.currentUser', () => {
        expect(localStorage.currentUser).toBeUndefined();
      });

      it('publishes an event', () => {
        expect(eventStream.publish).toHaveBeenCalledWith();
      });
    });

    describe('when localStorage.currentUser is not set', () => {
      beforeEach(() => {
        delete localStorage.currentUser;

        userSession.logOut();
      });

      it('maintains localStorage.currentUser as undefined', () => {
        expect(localStorage.currentUser).toBeUndefined();
      });

      it('publishes an event', () => {
        expect(eventStream.publish).toHaveBeenCalledWith();
      });
    });
  });

  describe('subscribe', () => {
    it('is eventStream.subscribe', () => {
      expect(userSession.subscribe).toBe(eventStream.subscribe);
    });
  });
});
