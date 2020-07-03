import 'reflect-metadata';

import { config } from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as WebSocket from 'ws';

import WebFrameController from './controllers/WebFrameController';
import Request, { Message } from './http/Request';
import routes from './routes';

config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
  port: process.env.SERVER_PORT || 13337,
});

wss.on("connection", (ws) => {
  console.log("Connection has been made.");

  ws.on("message", (message) => {
    const msg = JSON.parse(message) as Message;

    if (typeof routes[msg.channel] === "function") {
      routes[msg.channel](new Request(msg));
    } else {
      console.error(
        `Unhandled channel: ${msg.channel}, data: ${JSON.stringify(msg.data)}`
      );
    }
  });
});

const webFrameController = new WebFrameController();
app.get("/", webFrameController.currentTrack);

server.listen(8080, () => {
  console.log(`HTTP server started on port ${server.address().port}.`);
});
