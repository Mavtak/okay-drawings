import express from 'express';
import rootRoute from './rootRoute.js';

export default () => {
  const app = express();
  
  app.get('/', rootRoute);

  return app;
};
