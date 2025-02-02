import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

import { AuthSider } from "./_components/auth-sider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthSider>{children}</AuthSider>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/placeholder.svg"
          alt="placeholder"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
        />
      </div>
    </div>
  );
}
