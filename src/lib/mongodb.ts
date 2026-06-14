import mongoose from "mongoose";
import { getMongoDbName, resolveMongoUri } from "@/lib/mongodb-uri";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  const uri = resolveMongoUri();
  const dbName = getMongoDbName();

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // dbName option matches Python: client[MONGODB_NAME]
    cached.promise = mongoose.connect(uri, {
      dbName,
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 10,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
