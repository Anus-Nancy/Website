import { createServer } from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { registerSocketHandlers } from './sockets/index.js';

const app = createApp();
const server = createServer(app);
const io = new Server(server, { cors: { origin: env.corsOrigin } });
app.set('io', io);
registerSocketHandlers(io);

server.listen(env.port, () => {
  console.log(`FixIt Now API listening on http://localhost:${env.port}`);
});
