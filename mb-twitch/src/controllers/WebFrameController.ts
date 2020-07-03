import { Request, Response } from 'express';

import { trackState } from '../states/TrackState';

export default class WebFrameController {
  public currentTrack(req: Request, res: Response): void {
    // TODO: setup vue.
    res.send(JSON.stringify(trackState.getState()));
  }
}
