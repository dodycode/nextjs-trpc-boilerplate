import Link from "next/link";

import { ensureAuth } from "@/lib/auth";

import { SessionViewer } from "./_components/session-viewer";

export default async function Home() {
  await ensureAuth();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">NextAuth Starter</h1>
      <div className="flex flex-col gap-y-4">
        <div>
          This is a starter project that use{" "}
          <Link href="https://nextjs.authjs.dev">NextAuth.js</Link> for
          authentication, tRPC for type-safety API and{" "}
          <Link href="https://ui.shadcn.com/">ShadCN</Link> for components.
        </div>
      </div>
      <SessionViewer />
    </div>
  );
}
