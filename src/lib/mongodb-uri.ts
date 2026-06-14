const DEFAULT_DB_NAME = "indiacab";

/**
 * Atlas cluster0.pofxanv.mongodb.net — standard URI fallback when Node.js SRV DNS fails on Windows.
 * Python (pymongo + dnspython) resolves SRV fine; Node uses system DNS which often fails.
 * Replica set name verified from working Python project (osint-pro).
 */
const ATLAS_SRV_FALLBACK: Record<string, { hosts: string; replicaSet: string }> = {
  "cluster0.pofxanv.mongodb.net": {
    hosts:
      "ac-aohypzs-shard-00-00.pofxanv.mongodb.net:27017,ac-aohypzs-shard-00-01.pofxanv.mongodb.net:27017,ac-aohypzs-shard-00-02.pofxanv.mongodb.net:27017",
    replicaSet: "atlas-fgljnc-shard-0",
  },
};

/** Raw connection URL — same as Python project's MONGODB_URL (SRV, no db in path). */
export function resolveMongoUri(): string {
  const raw = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!raw) {
    throw new Error("Please define MONGODB_URI or MONGODB_URL in .env.local");
  }

  const uri = raw.trim();

  // Node.js cannot resolve mongodb+srv on many Windows setups; use standard URI fallback
  if (uri.startsWith("mongodb+srv://")) {
    return convertSrvToStandard(uri);
  }

  return uri;
}

/** Database name — same pattern as Python project's MONGODB_NAME */
export function getMongoDbName(): string {
  return (
    process.env.MONGODB_DB_NAME ||
    process.env.MONGODB_NAME ||
    DEFAULT_DB_NAME
  );
}

function convertSrvToStandard(srvUri: string): string {
  const match = srvUri.match(/^mongodb\+srv:\/\/([^@]+)@([^/?]+)(.*)$/);
  if (!match) return srvUri;

  const credentials = match[1];
  const clusterHost = match[2];
  const tail = match[3] || "";

  const queryOnly =
    tail.includes("?") ? tail.slice(tail.indexOf("?") + 1) : "";

  const cluster = ATLAS_SRV_FALLBACK[clusterHost];
  const hosts = process.env.MONGODB_SHARD_HOSTS || cluster?.hosts;
  if (!hosts) return srvUri;

  const params = new URLSearchParams(queryOnly);
  params.set("ssl", "true");
  params.set("authSource", "admin");

  const replicaSet =
    process.env.MONGODB_REPLICA_SET || cluster?.replicaSet;
  if (replicaSet) params.set("replicaSet", replicaSet);

  return `mongodb://${credentials}@${hosts}/?${params.toString()}`;
}
