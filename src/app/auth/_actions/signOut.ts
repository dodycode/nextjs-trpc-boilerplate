"use server";

import { redirect } from "next/navigation";

import { AuthError, signOut } from "@/server/auth";

export const signOutAction = async () => {
  try {
    await signOut({ redirectTo: "/auth/sign-in" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/auth/sign-in?error=${error.cause?.err}`);
    }
  }
};
