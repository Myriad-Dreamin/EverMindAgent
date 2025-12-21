import { expect, test, describe, beforeEach, afterEach } from "vitest";
import {
  createMongo,
  LanceVectorMemorySearcher,
  MongoLongTermMemoryDB,
} from "../../db";

import type {
  LongTermMemoryEmbeddingEngine,
  EmbeddingInterestedLTMFields,
  LongTermMemoryEntity,
  Mongo,
} from "../../db";
import * as lancedb from "@lancedb/lancedb";

class SimpleEmbeddingEngine implements LongTermMemoryEmbeddingEngine {
  async createEmbedding(
    dim: number,
    entity: EmbeddingInterestedLTMFields,
  ): Promise<number[] | undefined> {
    const text = JSON.stringify(entity);
    const data = new TextEncoder().encode(text);
    const f32array = Array.from(data).map((byte) => byte / 255);
    while (f32array.length < dim) {
      f32array.push(0);
    }
    return f32array.slice(0, dim);
  }
}

describe("LanceVectorMemorySearcher with in-memory LanceDB", () => {
  let mongo: Mongo;
  let lance: lancedb.Connection;
  let db: MongoLongTermMemoryDB;
  let searcher: LanceVectorMemorySearcher;
  const embeddingEngine = new SimpleEmbeddingEngine();
  const 绘画 = {
    index0: "绘画",
    index1: "水墨画",
    keywords: ["山水画", "花鸟画"],
  };
  const 书法 = {
    index0: "书法",
    index1: "楷书",
    keywords: ["楷书", "行书"],
  };

  const memory11 = (): LongTermMemoryEntity => ({
    actorId: 1,
    os: "Test OS",
    statement: "Test statement",
    messages: [1, 2],
    ...绘画,
  });
  const memory12 = (): LongTermMemoryEntity => ({
    actorId: 1,
    os: "Test OS 2",
    statement: "Test statement 2",
    messages: [3, 4],
    ...书法,
  });
  const memory21 = (): LongTermMemoryEntity => ({
    actorId: 2,
    os: "Test OS 3",
    statement: "Test statement 3",
    messages: [1, 2],
    ...绘画,
  });
  const memory22 = (): LongTermMemoryEntity => ({
    actorId: 2,
    os: "Test OS 4",
    statement: "Test statement 4",
    messages: [3, 4],
    ...书法,
  });

  beforeEach(async () => {
    // Create in-memory MongoDB instance for testing
    mongo = await createMongo("", "test", "memory");
    await mongo.connect();
    lance = await lancedb.connect("memory://ema");
    db = new MongoLongTermMemoryDB(mongo);
    searcher = new LanceVectorMemorySearcher(mongo, lance, embeddingEngine);

    await searcher.createIndices();
  });

  afterEach(async () => {
    await mongo.close();
    await lance.close();
  });

  test("should search long term memories", async () => {
    const memories = await searcher.searchLongTermMemories({
      actorId: 1,
    });
    expect(memories).toEqual([]);
  });

  test("should search long term memories", async () => {
    const mem11 = memory11();
    const mem21 = memory21();
    const mem12 = memory12();
    const mem22 = memory22();

    for (const mem of [mem11, mem21, mem12, mem22]) {
      mem.id = await db.appendLongTermMemory(mem);
      await searcher.indexLongTermMemory(mem);
    }

    // Validates that we never find memories from other actors
    const results = await searcher.searchLongTermMemories(mem11);
    expect(results).toContainEqual(mem11);
    expect(results).not.toContainEqual(mem21);
    // Validates that we never find memories from other actors 2
    const results2 = await searcher.searchLongTermMemories(mem21);
    expect(results2).toContainEqual(mem22);
    expect(results2).not.toContainEqual(mem12);
  });
});
