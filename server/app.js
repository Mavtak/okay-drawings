import express from 'express';
import apiApp from './api/app.js';
import console from './console.js';
import process from './process.js';

export default async (port) => {
  const app = express();

  app.use('/api', await apiApp());

  app.use('/dist', express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile('dist/index.html', {
      root: process.cwd(),
    });
  });

  app.listen(port, () => {
    console.log(`okay-drawings listening on http://localhost:${port}`);
  });

  return app;
};
