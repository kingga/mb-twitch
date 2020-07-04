export interface AuthInterface {
  /**
   * Checks that the token exists and returns if the user and token matches.
   * @param user The user which this token belongs to.
   * @param token The authentication token for the user.
   */
  authenticate(user: string, token: string): boolean;

  /**
   * Create a new user and return the token.
   * @param name The username for this user.
   */
  createUser(name: string): string | null;

  /**
   * Refresh the token, this is useful if you think someone else has gained
   * access to your token. NULL is returned if they are not authenticated.
   * @param user The username.
   * @param token The token for this user.
   */
  refreshToken(user: string, token: string): string | null;
}
