"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Heart, Newspaper, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

const NAV_ITEMS = [
  { label: "Feed", icon: Newspaper, href: "/feed" },
  { label: "React", icon: Heart, href: "/react" },
  { label: "Today", icon: Zap, href: "/today" },
  { label: "Friends", icon: Users, href: "/friends" },
  { label: "Profile", icon: User, href: "/profile" },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const swipeDeckCount = useAppStore((s) => s.swipeDeck.length);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#0A0A0C]/90 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          const showBadge = item.href === "/react" && swipeDeckCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-colors",
                isActive ? "text-[#BFFF00]" : "text-[#71717A]"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />

                {showBadge && (
                  <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold leading-none text-white">
                    {swipeDeckCount > 9 ? "9+" : swipeDeckCount}
                  </span>
                )}
              </div>

              <span className="text-[11px] font-medium leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
