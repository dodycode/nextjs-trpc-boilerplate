"use server";

import { redirect } from "next/navigation";

import { AuthError, signIn } from "@/server/auth";

export const signInAction = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      action: "sign-in",
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/auth/sign-in?error=${error.cause?.err}`);
    }
  }
};
