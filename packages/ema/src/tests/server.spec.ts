import { expect, test, describe, beforeEach } from "vitest";
import { Server } from "../server";
import { FileDB, MemFs } from "../db/file";
import type { RoleData } from "../db/base";

describe("Server with snapshot functions", () => {
  let server: Server;
  let memFs: MemFs;
  let db: FileDB;

  beforeEach(() => {
    // Create a new MemFs and FileDB for each test
    memFs = new MemFs();
    db = new FileDB("test-db.json", memFs);
    // Mock environment variables to avoid errors
    process.env.OPENAI_API_KEY = "test-key";
    server = new Server(db);
  });

  test("server starts from empty db", async () => {
    const roles = await server.listRoles();
    expect(roles).toEqual([]);
  });

  test("server can insert roles", async () => {
    const role1: RoleData = {
      id: "r1",
      name: "Role 1",
      description: "First test role",
    };

    await server.insertRole(role1);

    const roles = await server.listRoles();
    expect(roles).toHaveLength(1);
    expect(roles[0]).toEqual(role1);
  });

  test("server saved snapshot with roles [r1]", async () => {
    const role1: RoleData = {
      id: "r1",
      name: "Role 1",
      description: "First test role",
    };

    await server.insertRole(role1);
    const snapshot = await server.saveSnapshot();

    expect(snapshot).toHaveLength(1);
    expect(snapshot[0]).toEqual(role1);
  });

  test("server saved snapshot with roles [r2, r3]", async () => {
    const role2: RoleData = {
      id: "r2",
      name: "Role 2",
      description: "Second test role",
    };

    const role3: RoleData = {
      id: "r3",
      name: "Role 3",
      description: "Third test role",
    };

    await server.insertRole(role2);
    await server.insertRole(role3);
    const snapshot = await server.saveSnapshot();

    expect(snapshot).toHaveLength(2);
    expect(snapshot).toContainEqual(role2);
    expect(snapshot).toContainEqual(role3);
  });

  test("server restored from snapshot containing roles [r1]", async () => {
    // First, create some initial roles
    const role2: RoleData = {
      id: "r2",
      name: "Role 2",
      description: "Second test role",
    };

    const role3: RoleData = {
      id: "r3",
      name: "Role 3",
      description: "Third test role",
    };

    await server.insertRole(role2);
    await server.insertRole(role3);

    // Verify initial state
    let roles = await server.listRoles();
    expect(roles).toHaveLength(2);

    // Create a snapshot with only r1
    const snapshotWithR1: RoleData[] = [
      {
        id: "r1",
        name: "Role 1",
        description: "First test role",
      },
    ];

    // Restore from snapshot
    await server.restoreSnapshot(snapshotWithR1);

    // Verify the database now contains only r1
    roles = await server.listRoles();
    expect(roles).toHaveLength(1);
    expect(roles[0]).toEqual(snapshotWithR1[0]);
  });

  test("server can restore empty snapshot", async () => {
    // Insert some roles first
    const role1: RoleData = {
      id: "r1",
      name: "Role 1",
    };

    await server.insertRole(role1);

    // Verify roles exist
    let roles = await server.listRoles();
    expect(roles).toHaveLength(1);

    // Restore empty snapshot
    await server.restoreSnapshot([]);

    // Verify database is now empty
    roles = await server.listRoles();
    expect(roles).toEqual([]);
  });
});
