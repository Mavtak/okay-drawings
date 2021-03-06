import bodyParser from 'body-parser';
import express from 'express';
import createStorageDirectories from './createStorageDirectories.js'
import createDrawingHandler from './handlers/createDrawing.js';
import deleteDrawingHandler from './handlers/deleteDrawing.js';
import listDrawingsHandler from './handlers/listDrawings.js';
import readDrawingHandler from './handlers/readDrawing.js';

export default async () => {
  await createStorageDirectories();

  const app = express();

  app.use(bodyParser.json({ limit: '1mb' }))
  
  app.get('/drawings', listDrawingsHandler);
  app.post('/drawings', createDrawingHandler);
  app.delete('/drawings/:id', deleteDrawingHandler);
  app.get('/drawings/:id', readDrawingHandler);

  return app;
};
