import { AuthInterface } from './AuthInterface';
import JsonAuth from './JsonAuth';

export default class AuthFactory {
  /**
   * Create an instance of the authentication provider.
   */
  public make(): AuthInterface {
    return new JsonAuth();
  }
}
