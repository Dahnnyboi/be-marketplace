import express from 'express';
import loaders from 'loaders';
import { SERVER_PORT } from 'constants/environments';

async function startServer(): Promise<void> {
  const app = express();

  await loaders(app);
  app.listen(SERVER_PORT, () => {
    console.log('Server running...');
  });
}

startServer().catch(() => process.exit(1));
