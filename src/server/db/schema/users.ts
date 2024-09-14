import { timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "@/server/common/utils/pg-table-creator";
import { relations, sql } from "drizzle-orm";
import { accounts } from "./accounts";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

// Schema for inserting a user - can be used to validate API requests
export const insertSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
export const selectSchema = createSelectSchema(users);
