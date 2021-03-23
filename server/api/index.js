import express from 'express';

const api = express();

api.get('/', (req, res) => {
  res.json({
    message: 'I am a very good API',
  });
});

export default api;
