import express from 'express';
import api from './api/index.js';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api', api);

app.use('/dist', express.static('dist'));

app.listen(port, () => {
  console.log(`okay-drawings listening on http://localhost:${port}`);
});
