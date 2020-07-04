import { IContainer } from '@kingga/kc-container';
import * as https from 'https';
import * as WebSocket from 'ws';

import Request, { Message } from '../http/Request';
import wsRoutes from '../routes/ws.routes';
import ProviderInterface from './ProviderInterface';

export default class WebSocketProvider implements ProviderInterface {
  public register(container: IContainer): void {
    const server = container.make<https.Server>("Server");

    const wss = new WebSocket.Server({
      server,
      port: process.env.WS_PORT || 13337,
    });

    // Create the routes for the websocket server.
    wss.on("connection", (ws) => {
      console.log("Connection has been made.");

      ws.on("message", (message) => {
        const msg = JSON.parse(message) as Message;

        if (typeof wsRoutes[msg.channel] === "function") {
          wsRoutes[msg.channel](new Request(msg));
        } else {
          console.error(
            `Unhandled channel: ${msg.channel}, data: ${JSON.stringify(
              msg.data
            )}`
          );
        }
      });
    });

    // Bind the websockets to the client.
    container.singleton(WebSocket.Server, () => wss);
  }

  public boot(container: IContainer): void {
    //
  }
}
