import send from './api.send.js';
import userSession from './userSession.js';

export default {
  createDrawing: async (drawing) => {
    const user = userSession.get();
    const response = await send({
      body: {
        ...drawing,
        user,
      },
      method: 'POST',
      path: [
        'drawings',
      ],
    });
    const id = response.body.id;

    return id;
  },

  deleteDrawing: async (id) => {
    await send({
      method: 'DELETE',
      path: [
        'drawings',
        id
      ],
    });
  },

  listDrawings: async () => {
    const user = userSession.get();
    const response = await send({
      method: 'GET',
      path: [
        'drawings',
      ],
      query: {
        username: user?.username,
      },
    });

    return response.body;
  },

  readDrawing: async (id) => {
    const response = await send({
      method: 'GET',
      path: [
        'drawings',
        id
      ],
    });

    return response.body;
  }
};
