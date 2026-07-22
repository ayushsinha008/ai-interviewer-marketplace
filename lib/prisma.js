import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis;

/**
 * Build a discrete pg pool config from a connection string.
 *
 * node-postgres does not reliably percent-decode special characters (e.g. `#`)
 * in the password when parsing a full connection string, which causes
 * "authentication failed" errors. Parsing here and passing decoded fields
 * avoids that entirely.
 */
function poolConfigFromUrl(urlString) {
  const url = new URL(urlString);

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 5432,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, "") || "postgres",
    ssl: url.hostname.includes("supabase")
      ? { rejectUnauthorized: false }
      : undefined,
  };
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is missing. Add it to .env.local and restart the dev server."
    );
  }

  const adapter = new PrismaPg(poolConfigFromUrl(connectionString));
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
