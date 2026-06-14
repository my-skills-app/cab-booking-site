/**
 * Quick MongoDB connection test — npm run mongo:test
 */
import { config } from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { resolveMongoUri, getMongoDbName } = await import("../src/lib/mongodb-uri");
  const uri = resolveMongoUri();
  const dbName = getMongoDbName();

  console.log("Database name:", dbName);
  console.log("URI (masked):", uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@"));

  await mongoose.connect(uri, {
    dbName,
    serverSelectionTimeoutMS: 20000,
  });

  const db = mongoose.connection.db;
  if (!db) throw new Error("No database handle");

  const collections = await db.listCollections().toArray();
  console.log("Connected OK");
  console.log("Collections:", collections.map((c) => c.name).join(", ") || "(none yet)");

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("Connection failed:", e.message);
  process.exit(1);
});
