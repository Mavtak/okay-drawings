import bodyParser from 'body-parser';
import express from 'express';
import createStorageDirectories from './createStorageDirectories.js'
import rootRoute from './rootRoute.js';

export default async () => {
  await createStorageDirectories();

  const app = express();

  app.use(bodyParser.json())
  
  app.get('/', rootRoute);

  return app;
};
