import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Session } from "./auth";

interface SessionContextValue {
  session: Session | null;
  setSession: (s: Session | null) => void;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  setSession: () => {},
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
