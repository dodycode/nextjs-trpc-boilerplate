import { compare, hash } from "bcrypt";

import { userRepository } from "./user.repository";

class UserService {
  public async signIn(
    credentials: Record<"email" | "password", string> | undefined,
  ) {
    if (!credentials?.email || !credentials.password) {
      return null;
    }

    const user = await userRepository.findByEmail(credentials.email);

    if (!user || !user.password) {
      throw new Error(
        "User doesn't exists. Please check your email and password.",
      );
    }

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new Error(
        "User doesn't exists. Please check your email and password.",
      );
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  public async signUp(
    credentials: Record<"email" | "password" | "name", string> | undefined,
  ) {
    if (!credentials?.email || !credentials.password || !credentials.name) {
      return null;
    }

    const existingUser = await userRepository.findByEmail(credentials.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(credentials.password, 10);

    const newUser = await userRepository.create({
      name: credentials.name,
      email: credentials.email,
      password: hashedPassword,
      emailVerified: new Date(), //to keep things simple, let's just make it verified for now
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  }

  public async getByEmail(email: string) {
    if (!email) return null;

    return await userRepository.findByEmail(email);
  }
}

export const userService = new UserService();
