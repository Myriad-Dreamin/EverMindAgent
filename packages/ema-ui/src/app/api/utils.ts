import * as k from "arktype";

// https://dev.to/dzakh/zod-v4-17x-slower-and-why-you-should-care-1m1
// https://arktype.io/
const apiData =
  (extractor = jsonExtractor) =>
  <S>(schema: k.Type<S>) =>
  <F extends (body: S, req: Request) => Promise<Response>>(f: F) =>
  async (req: Request) => {
    const body = await extractor(req);
    const result = schema(body);
    if (result instanceof k.type.errors) {
      return new Response(JSON.stringify({ error: result.summary }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return f(body, req);
  };
const jsonExtractor = (req: Request) => req.json();
const queryExtractor = (req: Request) =>
  Promise.resolve(Object.fromEntries(new URL(req.url).searchParams.entries()));

export const postBody = apiData(jsonExtractor);
export const getQuery = apiData(queryExtractor);
