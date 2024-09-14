import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["nextjs-trpc-boilerplate_*"],
  verbose: true,
  strict: true,
} satisfies Config;
