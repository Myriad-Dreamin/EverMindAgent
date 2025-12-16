import { expect, test } from "vitest";

import { OpenAIClient } from "./openai";

describe("OpenAI", () => {
  test("should make a simple completion", async () => {
    const client = new OpenAIClient(
      process.env.GEMINI_API_KEY || "",
      "https://generativelanguage.googleapis.com/v1beta/openai/",
      // gemini model
      "gemini-2.5-flash"
    );

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Say 'Hello from OpenAI!' and nothing else." },
    ];

    const response = await client.generate(messages);
    expect(response).toBeDefined();
    expect(/hello/i.test(response.content)).toBeTruthy();
  });
});
