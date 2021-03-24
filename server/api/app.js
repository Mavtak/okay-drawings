import bodyParser from 'body-parser';
import express from 'express';
import rootRoute from './rootRoute.js';

export default () => {
  const app = express();

  app.use(bodyParser.json())
  
  app.get('/', rootRoute);

  return app;
};
