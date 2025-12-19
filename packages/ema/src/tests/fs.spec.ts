import { expect, test, describe } from "vitest";
import { MemFs } from "../db/file";

describe("MemFs", () => {
  test("should read empty object when file doesn't exist", async () => {
    const fs = new MemFs();
    const content = await fs.read("nonexistent.json");
    expect(content).toBe("{}");
  });

  test("should write and read file content", async () => {
    const fs = new MemFs();
    await fs.write("test.json", '{"key": "value"}');
    const content = await fs.read("test.json");
    expect(content).toBe('{"key": "value"}');
  });

  test("should return false when file doesn't exist", async () => {
    const fs = new MemFs();
    const exists = await fs.exists("nonexistent.json");
    expect(exists).toBe(false);
  });

  test("should return true when file exists", async () => {
    const fs = new MemFs();
    await fs.write("test.json", '{"key": "value"}');
    const exists = await fs.exists("test.json");
    expect(exists).toBe(true);
  });

  test("should write multiple files independently", async () => {
    const fs = new MemFs();
    await fs.write("file1.json", '{"id": 1}');
    await fs.write("file2.json", '{"id": 2}');

    const content1 = await fs.read("file1.json");
    const content2 = await fs.read("file2.json");

    expect(content1).toBe('{"id": 1}');
    expect(content2).toBe('{"id": 2}');
    expect(await fs.exists("file1.json")).toBe(true);
    expect(await fs.exists("file2.json")).toBe(true);
  });

  test("should overwrite existing file", async () => {
    const fs = new MemFs();
    await fs.write("test.json", '{"version": 1}');
    await fs.write("test.json", '{"version": 2}');

    const content = await fs.read("test.json");
    expect(content).toBe('{"version": 2}');
  });
});
