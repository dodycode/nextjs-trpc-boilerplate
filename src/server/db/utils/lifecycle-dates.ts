import { timestamp } from "drizzle-orm/pg-core";

// store timestamps with timezone https://stackoverflow.com/a/5876276
export const lifecycleDates = {
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at", { mode: "date", withTimezone: true }),
};
