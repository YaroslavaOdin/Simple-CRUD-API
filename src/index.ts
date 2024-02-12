import { createServer } from './server';
import { Server } from 'http';
import { config } from 'dotenv';

config();

const PORT: number = Number(process.env.PORT) || 4000;

const server: Server = createServer();

server.listen(PORT, () => {
    console.log(`The server is running at the address localhost:${PORT}.`);
});