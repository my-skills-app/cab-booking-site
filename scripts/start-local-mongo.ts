/**
 * Starts a local MongoDB instance (offline-capable, data persists in ./data/mongodb).
 * Run: npm run mongo:local
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { resolve } from "path";
import { mkdirSync, existsSync } from "fs";

const DB_PATH = resolve(process.cwd(), "data", "mongodb");
const PORT = 27017;

async function main() {
  if (!existsSync(DB_PATH)) {
    mkdirSync(DB_PATH, { recursive: true });
  }

  console.log("Starting local MongoDB...");
  console.log(`Data folder: ${DB_PATH}`);

  const mongo = await MongoMemoryServer.create({
    instance: {
      port: PORT,
      dbPath: DB_PATH,
      dbName: "indiacab",
    },
  });

  const uri = mongo.getUri("indiacab");
  console.log("\n✓ Local MongoDB is running (offline OK)");
  console.log(`  URI: ${uri}`);
  console.log(`  Port: ${PORT}`);
  console.log("\nKeep this terminal open. Use .env.local:");
  console.log(`  MONGODB_URI=${uri}`);
  console.log("\nPress Ctrl+C to stop.\n");

  process.on("SIGINT", async () => {
    await mongo.stop();
    process.exit(0);
  });
}

main().catch((e) => {
  console.error("Failed to start local MongoDB:", e);
  process.exit(1);
});
