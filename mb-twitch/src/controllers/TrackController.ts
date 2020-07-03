import Request from '../http/Request';
import { trackState } from '../states/TrackState';

interface TrackStateChanged {
  isPlaying: boolean;
}

interface TrackInfo {
  artist: string;
  album: string;
  track: string;
}

interface TimeChanged {
  time: number;
}

export default class TrackController {
  public stateChanged(request: Request<TrackStateChanged>, token: string) {
    const state = request.data();

    console.log(
      `Track state has changed to ${state.isPlaying ? "play" : "pause."}`
    );

    trackState.setPlaybackState(token, state.isPlaying ? "playing" : "paused");
  }

  public trackChanged(request: Request<TrackInfo>, token: string) {
    const info = request.data();
    const { artist, album, track } = info;

    console.log(`Track playing: ${artist} - ${album} - ${track}`);

    trackState.setTrackState(token, { artist, album, track });
  }

  public timeChanged(request: Request<TimeChanged>, token: string): void {
    const data = request.data();

    console.log(`Track time: ${data.time}`);

    trackState.setTimeState(token, data.time);
  }
}
