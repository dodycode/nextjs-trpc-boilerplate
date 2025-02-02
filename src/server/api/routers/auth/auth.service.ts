import type { InferInsertModel } from "drizzle-orm";

import type { User } from "@/server/db/schema";
import { userService } from "@/server/api/routers/user/user.service";
import { signInSchema, signUpSchema } from "@/validators/auth";

class AuthService {
  public async getSignUpUser(credentials: InferInsertModel<typeof User>) {
    const signupInput = signUpSchema.safeParse(credentials);

    if (!signupInput.success) {
      throw new Error("Invalid sign up credentials", signupInput.error);
    }

    const { email, password, name } = signupInput.data;

    const signUpUser = await userService.signUp({
      email,
      password,
      name,
    });

    return signUpUser;
  }

  public async getSignInUser(
    credentials: Omit<InferInsertModel<typeof User>, "name">,
  ) {
    const signinInput = signInSchema.safeParse(credentials);

    if (!signinInput.success) {
      throw new Error("Invalid sign up credentials", signinInput.error);
    }

    const { email, password } = signinInput.data;

    const signInUser = await userService.signIn({
      email,
      password,
    });

    return signInUser;
  }
}

export const authService = new AuthService();
