import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

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
        <div className="flex flex-col rounded-md bg-gray-100">
          <div className="rounded-t-md bg-gray-200 p-4 font-bold">
            Current Session
          </div>
          <pre className="whitespace-pre-wrap break-all px-4 py-6">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
