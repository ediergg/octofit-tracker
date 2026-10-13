import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());
app.get('/api/', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API', baseUrl: apiBaseUrl });
});
app.use(apiRouter);
app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit Tracker API:', error);
  process.exitCode = 1;
});
