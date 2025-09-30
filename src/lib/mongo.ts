import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("Missing environment variable: MONGODB_URI");
}

if (!dbName) {
  throw new Error("Missing environment variable: MONGODB_DB");
}

type CachedMongo = {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongo: CachedMongo | undefined;
}

const cached: CachedMongo = global._mongo ?? {
  client: null,
  promise: null,
};

global._mongo = cached;

const connectClient = async (): Promise<MongoClient> => {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, {
      maxPoolSize: 10,
    });
  }

  cached.client = await cached.promise;
  console.log("Connected to MongoDB");
  return cached.client;
};

export const getDb = async (): Promise<Db> => {
  const client = await connectClient();
  return client.db(dbName);
};
