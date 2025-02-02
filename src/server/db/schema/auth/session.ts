import { relations } from "drizzle-orm";

import { createTable } from "@/server/common/utils/pg-table-creator";

import { lifecycleDates } from "../../utils/lifecycle-dates";
import { User } from "./user";

export const Session = createTable("session", (t) => ({
  sessionToken: t.varchar({ length: 255 }).notNull().primaryKey(),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
  ...lifecycleDates,
}));

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
