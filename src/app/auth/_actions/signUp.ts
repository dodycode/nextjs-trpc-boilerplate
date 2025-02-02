"use server";

import { redirect } from "next/navigation";

import { AuthError, signIn } from "@/server/auth";

export const signUpAction = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    await signIn("credentials", {
      name: name,
      email: email,
      password: password,
      action: "sign-up",
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/auth/sign-up?error=${error.cause?.err}`);
    }
  }
};
