import { primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "@/server/common/utils/pg-table-creator";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// Schema for inserting a user - can be used to validate API requests
export const insertSchema = createInsertSchema(verificationTokens);

// Schema for selecting a user - can be used to validate API responses
export const selectSchema = createSelectSchema(verificationTokens);
