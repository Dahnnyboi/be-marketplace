import express from 'express';
import loaders from './src/loaders';
import {SERVER_PORT} from './src/constants/environments';

async function startServer(): Promise<void> {
    const app = express();

    await loaders(app);
    app.listen(SERVER_PORT, () => {
        console.log('Server running...')
    })
}

startServer();