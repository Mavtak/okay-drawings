import bodyParser from 'body-parser';
import express from 'express';
import createStorageDirectories from './createStorageDirectories.js'
import createDrawingHandler from './handlers/createDrawing.js';
import listDrawingsHandler from './handlers/listDrawings.js';
import readDrawingHandler from './handlers/readDrawing.js';
import rootRoute from './rootRoute.js';

export default async () => {
  await createStorageDirectories();

  const app = express();

  app.use(bodyParser.json())
  
  app.get('/', rootRoute);

  app.get('/drawings', listDrawingsHandler);
  app.post('/drawings', createDrawingHandler);
  app.get('/drawings/:id', readDrawingHandler);

  return app;
};
