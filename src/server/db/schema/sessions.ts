import { index, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "@/server/common/utils/pg-table-creator";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// Schema for inserting a user - can be used to validate API requests
export const insertSchema = createInsertSchema(sessions);

// Schema for selecting a user - can be used to validate API responses
export const selectSchema = createSelectSchema(sessions);
