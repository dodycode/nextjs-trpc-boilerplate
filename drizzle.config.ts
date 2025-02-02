import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE URL");
}

export default {
  schema: "./src/server/db/schema/*",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL, ssl: true },
  casing: "snake_case",
  tablesFilter: ["dodycode-nextjs-boilerplate_*"],
  verbose: true,
  strict: true,
} satisfies Config;
