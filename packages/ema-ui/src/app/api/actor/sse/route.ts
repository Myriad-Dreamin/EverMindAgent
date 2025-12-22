/**
 * Chat API endpoint.
 * See https://nextjs.org/blog/building-apis-with-nextjs#32-multiple-http-methods-in-one-file
 */

import { getServer } from "../../shared-server";
import * as k from "arktype";
import { getQuery } from "../../utils";
import type { ActorResponse } from "ema";

const ActorWsRequest = k.type({
  userId: "string.numeric",
  actorId: "string.numeric",
});

export const GET = getQuery(ActorWsRequest)(async (body, req) => {
  const server = await getServer();
  const actor = await server.getActor(
    Number.parseInt(body.userId),
    Number.parseInt(body.actorId),
  );
  const encoder = new TextEncoder();
  let subscribe: (response: ActorResponse) => void;

  const customReadable = new ReadableStream({
    start(controller) {
      // interval = setInterval(() => {
      //   const message = new Date().toLocaleString();
      //   // actor
      //   controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      // }, 1000);

      actor.subscribe(
        (subscribe = (response) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(response)}\n\n`),
          );
        }),
      );
    },
    cancel() {
      if (subscribe) {
        actor.unsubscribe(subscribe);
      }
    },
  });

  return new Response(customReadable, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
});
