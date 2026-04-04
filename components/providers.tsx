"use client";

import { useEffect, useRef } from "react";
import { getDemoState } from "@/lib/data/demo-state";
import { useAppStore } from "@/stores/app-store";

interface DemoProviderProps {
  children: React.ReactNode;
}

export function DemoProvider({ children }: DemoProviderProps) {
  const initializeStore = useAppStore((s) => s.initializeStore);
  const hasData = useAppStore((s) => s.currentUser !== null);
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized in this instance or if the store
    // already has data (e.g. populated by onboarding before navigation)
    if (initialized.current || hasData) return;
    initialized.current = true;

    const demo = getDemoState();
    initializeStore({
      users: demo.users,
      tasks: demo.tasks,
      receipts: demo.receipts,
      reactions: demo.reactions,
      notifications: demo.notifications,
      badges: demo.badges,
      duoPairings: demo.duos,
      chains: demo.chains,
      groups: demo.groups,
      currentUser: demo.currentUser,
      todayRealm: demo.todayRealmData,
      swipeDeck: demo.swipeDeck,
    });
  }, [initializeStore, hasData]);

  return <>{children}</>;
}
