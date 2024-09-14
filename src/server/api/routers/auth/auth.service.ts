import { insertSchema, users } from "@/server/db/schema/users";
import { InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import { userService } from "@/server/api/routers/user/user.service";

class AuthService {
  public async getSignUpUser(credentials: InferInsertModel<typeof users>) {
    const signupInput = insertSchema
      .extend({
        action: z.enum(["signin", "signup"]),
      })
      .safeParse(credentials);

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
    credentials: Omit<InferInsertModel<typeof users>, "name">,
  ) {
    const signinInput = insertSchema
      .omit({
        name: true,
      })
      .extend({
        action: z.enum(["signin", "signup"]),
      })
      .safeParse(credentials);

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
