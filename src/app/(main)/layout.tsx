import { ConfirmationProvider } from "@/components/ui/confirmation-dialog";
import { ThemeToggle } from "@/components/ui/theme";
import { SessionProvider } from "@/contexts/session-provider";
import { ensureAuth } from "@/lib/auth";

import { Navbar } from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: Props) {
  const session = await ensureAuth();

  return (
    <SessionProvider initialData={session}>
      <ConfirmationProvider>
        <Navbar />
        <div className="mx-auto mt-36 min-h-[calc(100dvh-220px)] max-w-6xl px-4 lg:px-0">
          {children}
        </div>
        <div className="sticky bottom-2 flex flex-col items-end p-5">
          <ThemeToggle />
        </div>
      </ConfirmationProvider>
    </SessionProvider>
  );
}
