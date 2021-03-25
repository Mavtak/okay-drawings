import userSession from './userSession.js';

export default {
  createDrawing: async (drawing) => {
    const user = userSession.get();
    const response = await fetch('/api/drawings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...drawing,
        user,
      }),
    });
    const responseBody = await response.json();
    const id = responseBody.id;

    return id;
  },

  listDrawings: async () => {
    const user = userSession.get();
    const response = await fetch(`/api/drawings?username=${encodeURIComponent(user?.username)}`);
    const responseBody = await response.json();

    return responseBody;
  },

  readDrawing: async (id) => {
    const response = await fetch(`/api/drawings/${encodeURIComponent(id)}`);
    const responseBody = await response.json();

    return responseBody;
  }
};
