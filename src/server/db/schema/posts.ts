import { index, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "@/server/common/utils/pg-table-creator";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    content: text("content").notNull(),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

// Schema for inserting a user - can be used to validate API requests
export const insertSchema = createInsertSchema(posts);

// Schema for selecting a user - can be used to validate API responses
export const selectSchema = createSelectSchema(posts);
