import { Express } from 'express-serve-static-core';

import WebFrameController from '../controllers/WebFrameController';

export default (app: Express) => {
  const webFrameController = new WebFrameController();

  app.get("/", webFrameController.currentTrack);
};
