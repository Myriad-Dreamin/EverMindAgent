import { createMongo } from "../src/db";

// Create in-memory MongoDB instance for testing
const mongo = await createMongo("", "test", "memory");
await mongo.connect();

console.log("MongoDB instance created");
