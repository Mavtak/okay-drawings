import send from './api.send.js';

export default {
  createDrawing: async (drawing) => {
    const response = await send({
      body: drawing,
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
    const response = await send({
      method: 'GET',
      path: [
        'drawings',
      ],
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
