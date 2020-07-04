import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { AuthInterface } from './AuthInterface';

interface UserTokens {
  [key: string]: string;
}

export default class JsonAuth implements AuthInterface {
  /**
   * The users which have been created.
   */
  private users: UserTokens;

  /**
   * Setup the authentication provider.
   */
  public constructor() {
    this.users = {};
    this.loadUsers();
  }

  /**
   * Authenticate the the username and token match with our system.
   * @param user The username to authenticate the token against.
   * @param token The token of the user.
   */
  public authenticate(user: string, token: string): boolean {
    return (
      typeof this.users[user] !== "undefined" && this.users[user] === token
    );
  }

  /**
   * Create a new user, if the return value is NULL then the user already exists.
   * @param name The username to create.
   */
  public createUser(name: string): string | null {
    if (typeof this.users[name] !== "undefined") {
      return null;
    }

    let token = "";

    do {
      token = this.createToken();
    } while (!token || this.tokenExists(token));

    this.users[name] = token;
    this.saveUsers();
  }

  /**
   * Refresh the token, this is useful if you think someone else has gained
   * access to your token.
   * @param user The username.
   * @param token The token for this user.
   */
  public refreshToken(user: string, token: string): string | null {
    let nToken = "";

    // Authenticate them.
    if (!this.authenticate(user, token)) {
      return null;
    }

    do {
      nToken = this.createToken();
    } while (!nToken || this.tokenExists(nToken));

    this.users[user] = nToken;
    this.saveUsers();

    return nToken;
  }

  /**
   * Create a new token.
   */
  private createToken(): string {
    const len = 32;
    let token = "";
    const charStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+=[]{}:;\"'<,>.?/";
    const chars = charStr.split("");
    const mc = chars.length - 1;

    for (let i = 0; i < len; i++) {
      token += chars[this.rand(0, mc)];
    }

    return token;
  }

  /**
   * Check if a token already exists.
   * @param token The token to check.
   */
  private tokenExists(token: string): boolean {
    return Object.values(this.users).some((t) => t === token);
  }

  /**
   * Pick a random number between two values.
   * @param min The minimum value.
   * @param max The maximum value.
   */
  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Save the users to the JSON file.
   */
  private saveUsers(): void {
    writeFileSync(this.path(), JSON.stringify(this.users));
  }

  /**
   * Load the users from the JSON file.
   */
  private loadUsers(): void {
    this.users = JSON.parse(readFileSync(this.path()).toString());
  }

  /**
   * Get the path to the JSON file.
   */
  private path(): string {
    return resolve(__dirname, "../../data/users.json");
  }
}
