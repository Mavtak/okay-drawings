import express from 'express';
import api from './api/index.js';

const args = process.argv.slice(2);
const app = express();
const port = args[0] || 8080;

app.use('/api', api);

app.use('/dist', express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile('dist/index.html', {
    root: process.cwd(),
  });
});

app.listen(port, () => {
  console.log(`okay-drawings listening on http://localhost:${port}`);
});
