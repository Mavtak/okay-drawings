import app from './app.js';

const args = process.argv.slice(2);
const port = args[0] || 8080;

app(port);
