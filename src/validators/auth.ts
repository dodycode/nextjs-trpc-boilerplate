import type { z } from "zod";

import { NewUserSchema } from "@/server/db/schema";

export const signInSchema = NewUserSchema.omit({
  name: true,
  emailVerified: true,
});

export const signUpSchema = NewUserSchema.omit({
  emailVerified: true,
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
