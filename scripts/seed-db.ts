/**
 * Run: npm run mongo:seed
 * Requires local MongoDB running on 127.0.0.1:27017
 */
import mongoose from "mongoose";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { resolveMongoUri, getMongoDbName } = await import("../src/lib/mongodb-uri");
  const uri = resolveMongoUri();
  const dbName = getMongoDbName();
  console.log("Database:", dbName);
  console.log("Connecting to", uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@"));
  await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 15000 });
  console.log("Connected!");

  const { forceSeedDatabase, getSeedCounts } = await import("../src/lib/seed");
  await forceSeedDatabase();

  const counts = await getSeedCounts();
  console.log("\nStatic data inserted into local MongoDB:");
  console.log(counts);

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
