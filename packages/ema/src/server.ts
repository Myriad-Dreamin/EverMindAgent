/**
 * The server class for the EverMindAgent.
 */
export class Server {
  constructor() {}

  /**
   * Handles user login and returns a user object.
   *
   * Exposed as `GET /api/users/login`.
   *
   * @returns {{ id: number, name: string, email: string }} The logged-in user object.
   *
   * @example
   * // Example usage:
   * const user = server.login();
   * console.log(user.id); // 1
   */
  login() {
    return {
      id: 1,
      name: "alice",
      email: "alice@example.com",
    };
  }
}
