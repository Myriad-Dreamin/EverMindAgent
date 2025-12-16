/**
 * See https://nextjs.org/blog/building-apis-with-nextjs#32-multiple-http-methods-in-one-file
 */

import { Server } from "ema";

const server = new Server();

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const user = server.login();
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
