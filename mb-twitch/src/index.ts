import 'reflect-metadata';

import { config } from 'dotenv';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import * as WebSocket from 'ws';

import Request, { Message } from './http/Request';
import webRoutes from './routes/web.routes';
import wsRoutes from './routes/ws.routes';

config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
let server: http.Server | https.Server;

if (process.env.PRIVATE_KEY_PATH && process.env.CERT_PATH) {
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8"),
      cert: fs.readFileSync(process.env.CERT_PATH, "utf8"),
    },
    app
  );
} else {
  server = http.createServer(app);
}

const wss = new WebSocket.Server({
  server,
  port: process.env.WS_PORT || 13337,
});

wss.on("connection", (ws) => {
  console.log("Connection has been made.");

  ws.on("message", (message) => {
    const msg = JSON.parse(message) as Message;

    if (typeof wsRoutes[msg.channel] === "function") {
      wsRoutes[msg.channel](new Request(msg));
    } else {
      console.error(
        `Unhandled channel: ${msg.channel}, data: ${JSON.stringify(msg.data)}`
      );
    }
  });
});

webRoutes(app);

server.listen(process.env.HTTP_PORT || 8080, () => {
  console.log(`HTTP server started on port ${server.address().port}.`);
});
