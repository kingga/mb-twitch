type PlaybackState = "playing" | "paused";

interface Track {
  artist: string;
  album: string;
  track: string;
}

interface CurrentTrack {
  track: Track;
  time: number;
  state: PlaybackState;
}

interface State {
  [key: string]: CurrentTrack;
}

class TrackState {
  private states: State;

  public constructor() {
    this.states = {};
  }

  public setTrackState(token: string, track: Track): void {
    this.createState(token);
    this.states[token].track = track;
  }

  public setTimeState(token: string, time: number): void {
    this.createState(token);
    this.states[token].time = time;
  }

  public setPlaybackState(token: string, state: PlaybackState): void {
    this.createState(token);
    this.states[token].state = state;
  }

  public getState(): State {
    return this.states;
  }

  private createState(token: string): void {
    if (typeof this.states[token] !== "undefined") {
      return;
    }

    this.states[token] = {
      track: { artist: "", album: "", track: "" },
      time: 0,
      state: "paused",
    };
  }
}

const trackState = new TrackState();

export { trackState };
