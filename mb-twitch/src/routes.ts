import TrackController from './controllers/TrackController';
import checkLogin from './middleware/CheckLogin';

interface Routes {
  [key: string]: CallableFunction;
}

const trackController = new TrackController();

const routes: Routes = {
  "track.state": checkLogin(trackController.stateChanged),
  "track.time": checkLogin(trackController.timeChanged),
  "track.changed": checkLogin(trackController.trackChanged),
};

export default routes;
