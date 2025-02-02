import { index } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { createTable } from "@/server/common/utils/pg-table-creator";

import { lifecycleDates } from "../utils/lifecycle-dates";
import { User } from "./auth/user";

export const posts = createTable(
  "post",
  (t) => ({
    id: t.serial("id").primaryKey(),
    name: t.varchar("name", { length: 256 }).notNull(),
    content: t.text("content").notNull(),
    createdById: t
      .uuid("created_by")
      .notNull()
      .references(() => User.id),
    ...lifecycleDates,
  }),
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const insertPostSchema = createInsertSchema(posts);

export const selectPostSchema = createSelectSchema(posts);
