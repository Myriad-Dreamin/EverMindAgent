/**
 * The server class for the EverMindAgent.
 */
export class Server {
  constructor() {}

  /**
   * The user login function exposed as `GET /api/users/login`.
   */
  login() {
    return {
      id: 1,
      name: "alice",
      email: "alice@example.com",
    };
  }
}
