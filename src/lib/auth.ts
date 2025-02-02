"use server";

import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

// Ensure Auth on server
export async function ensureAuth(
  onRSC = true,
  customMessage = "You are not authenticated",
) {
  const session = await auth();

  if (!session?.user) {
    if (onRSC) {
      redirect("/auth/sign-in");
    } else {
      throw new Error(customMessage);
    }
  }

  return session;
}
