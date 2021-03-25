import localStorage from './localStorage.js';
import EventStream from './EventStream.js';

const eventStream = new EventStream();

export default {
  get: () => (
    localStorage.currentUser
      ? JSON.parse(localStorage.currentUser)
      : null
  ),

  logIn: (user) => {
    localStorage.currentUser = JSON.stringify(user);
    eventStream.publish();
  },

  logOut: () => {
    delete localStorage.currentUser;
    eventStream.publish();
  },

  subscribe: eventStream.subscribe
};
