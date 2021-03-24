import localStorage from './localStorage.js';
import userSession from './userSession.js';

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
        localStorage.currentUser = {
          username: 'some.username',
        };
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
    it('sets the user', () => {
      userSession.logIn({
        extraData: 'could be anything',
        username: 'some-username',
      });

      expect(localStorage.currentUser).toEqual({
        extraData: 'could be anything',
        username: 'some-username',
      })
    });
  });

  describe('logOut', () => {
    describe('when localStorage.currentUser is set', () => {
      beforeEach(() => {
        localStorage.currentUser = {
          username: 'some.username',
        };
      });

      it('clears localStorage.currentUser', () => {
        userSession.logOut();

        expect(localStorage.currentUser).toBeUndefined();
      });
    });

    describe('when localStorage.currentUser is not set', () => {
      beforeEach(() => {
        delete localStorage.currentUser;
      });

      it('maintains localStorage.currentUser as undefined', () => {
        userSession.logOut();

        expect(localStorage.currentUser).toBeUndefined();
      });
    });
  });
});
