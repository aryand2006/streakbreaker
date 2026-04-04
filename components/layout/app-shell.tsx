"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./bottom-nav";

interface AppShellProps {
  children: React.ReactNode;
}

const EXCLUDED_PATHS = ["/", "/onboarding"];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  if (EXCLUDED_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <main className="flex-1 px-4 pt-4 pb-20">{children}</main>
      <BottomNav />
    </>
  );
}
