import localStorage from './localStorage.js';

export default {
  get: () => (
    localStorage.currentUser
      ? JSON.parse(localStorage.currentUser)
      : null
  ),

  logIn: (user) => {
    localStorage.currentUser = JSON.stringify(user);
  },

  logOut: () => {
    delete localStorage.currentUser;
  },
};
