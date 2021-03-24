import localStorage from './localStorage.js';

export default {
  get: () => localStorage.currentUser || null,

  logIn: (user) => {
    localStorage.currentUser = user;
  },

  logOut: () => {
    delete localStorage.currentUser;
  },
};
