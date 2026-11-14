import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { membershipsQuery, type Membership } from "@/lib/queries";

type OrgValue = {
  memberships: Membership[];
  current: Membership | null;
  setCurrentOrgId: (id: string) => void;
  isLoading: boolean;
  error: Error | null;
};

const OrgContext = createContext<OrgValue | null>(null);
const STORAGE_KEY = "samgrove.organization";

export function OrgProvider({ userId, children }: { userId: string; children: ReactNode }) {
  const { data, isLoading, error } = useQuery(membershipsQuery(userId));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedId(window.localStorage.getItem(STORAGE_KEY));
  }, []);

  const value = useMemo<OrgValue>(() => {
    const memberships = data ?? [];
    const current =
      memberships.find((m) => m.organizationId === selectedId) ?? memberships[0] ?? null;
    return {
      memberships,
      current,
      isLoading,
      error: error as Error | null,
      setCurrentOrgId: (id) => {
        setSelectedId(id);
        window.localStorage.setItem(STORAGE_KEY, id);
      },
    };
  }, [data, selectedId, isLoading, error]);

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error("useOrg must be used inside OrgProvider");
  return ctx;
}
