import express from 'express';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});
