"use client";

import { createContext, useContext, useEffect } from "react";

import type { Session } from "@/server/auth";
import { api } from "@/trpc/react";

interface Props {
  children: React.ReactNode;
  initialData: Omit<Session, "sessionToken"> | null;
}

interface SessionContextValue {
  session: Omit<Session, "sessionToken">;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}

const SessionProvider: React.FC<Props> = ({ children, initialData }) => {
  const utils = api.useUtils();
  const { data: session, isLoading } = api.auth.getSession.useQuery(undefined, {
    initialData,
    staleTime: 10_000,
  });

  // Fix Next Auth session bug with tRPC
  useEffect(() => {
    utils.auth.getSession.setData(undefined, initialData);
  }, [initialData, utils.auth.getSession]);

  if (!session) return null;

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider };
