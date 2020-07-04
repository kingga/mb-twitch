import { IContainer } from '@kingga/kc-container';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import webRoutes from '../routes/web.routes';
import ProviderInterface from './ProviderInterface';

export default class HttpProvider implements ProviderInterface {
  public register(container: IContainer): void {
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

    // Load the routes.
    webRoutes(app);

    // Bind the server to the container.
    container.singleton("Server", () => server);
  }

  public boot(container: IContainer): void {
    const server = container.make<https.Server>("Server");

    server.listen(process.env.HTTP_PORT || 8080, () => {
      console.log(`HTTP server started on port ${server.address().port}.`);
    });
  }
}
