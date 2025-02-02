import { relations } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { createTable } from "@/server/common/utils/pg-table-creator";

import { lifecycleDates } from "../../utils/lifecycle-dates";
import { Account } from "./account";

export const User = createTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  image: t.varchar({ length: 255 }),
  password: t.varchar({ length: 255 }),
  ...lifecycleDates,
}));

export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
}));

export const NewUserSchema = createInsertSchema(User, {
  name: z.string().max(255),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  image: true,
});

export const UpdateUserSchema = createUpdateSchema(User, {
  name: z.string().max(255),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  image: z.string().max(255),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type NewUserSchema = z.infer<typeof NewUserSchema>;
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
