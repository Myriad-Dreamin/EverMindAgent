import { OpenAIClient } from "./llm/openai_client";
import type { Message } from "./schema";
import type { RoleDB, RoleData } from "./db/base";

/**
 * The server class for the EverMindAgent.
 * todo: document what specific env are read.
 * todo: read all of the env in config.ts
 */
export class Server {
  private llmClient: OpenAIClient;
  private db: RoleDB;

  constructor(db?: RoleDB) {
    // Initialize OpenAI client with environment variables or defaults
    const apiKey =
      process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || "";
    const apiBase =
      process.env.OPENAI_API_BASE ||
      process.env.GEMINI_API_BASE ||
      "https://generativelanguage.googleapis.com/v1beta/openai/";
    const model =
      process.env.OPENAI_MODEL ||
      process.env.GEMINI_MODEL ||
      "gemini-2.5-flash";
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY or GEMINI_API_KEY env is not set");
    }

    this.llmClient = new OpenAIClient(apiKey, apiBase, model);

    // If no database is provided, we'll need to import FileDB
    if (!db) {
      const { FileDB } = require("./db/file");
      this.db = new FileDB();
    } else {
      this.db = db;
    }
  }

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

  /**
   * Handles chat requests and returns LLM responses.
   *
   * Exposed as `POST /api/roles/chat`.
   *
   * @param messages - Array of conversation messages
   * @returns Promise<{ content: string, thinking?: string }> The LLM response
   *
   * @example
   * // Example usage:
   * const response = await server.chat([
   *   { role: "system", content: "You are a helpful assistant." },
   *   { role: "user", content: "Hello!" }
   * ]);
   * console.log(response.content);
   */
  async chat(messages: Message[]) {
    const response = await this.llmClient.generate(messages);
    return {
      content: response.content,
      thinking: response.thinking,
    };
  }

  /**
   * Inserts or updates a role in the database
   * @param roleData - The role data to insert
   * @returns Promise resolving when the operation completes
   */
  async insertRole(roleData: RoleData): Promise<void> {
    await this.db.upsertRole(roleData);
  }

  /**
   * Lists all roles in the database
   * @returns Promise resolving to an array of role data
   */
  async listRoles(): Promise<RoleData[]> {
    return await this.db.listRoles();
  }

  /**
   * Saves a snapshot of the current database state
   * @returns Promise resolving to the snapshot data
   */
  async saveSnapshot(): Promise<RoleData[]> {
    return await this.db.listRoles();
  }

  /**
   * Restores the database from a snapshot
   * @param snapshot - Array of role data to restore
   * @returns Promise resolving when the restore completes
   */
  async restoreSnapshot(snapshot: RoleData[]): Promise<void> {
    // Clear existing roles
    const existingRoles = await this.db.listRoles();
    for (const role of existingRoles) {
      await this.db.deleteRole(role.id);
    }

    // Restore roles from snapshot
    for (const role of snapshot) {
      await this.db.upsertRole(role);
    }
  }
}
