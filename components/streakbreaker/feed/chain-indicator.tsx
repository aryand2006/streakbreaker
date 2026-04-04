"use client";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import type { Chain, User } from "@/lib/types";

interface ChainIndicatorProps {
  chain: Chain;
  users: User[];
}

export function ChainIndicator({ chain, users }: ChainIndicatorProps) {
  if (chain.length <= 1) return null;

  // Find unique user IDs who participated (from receipts in the chain)
  // We show up to 5 avatars
  const displayUsers = users.slice(0, 5);
  const extraCount = Math.max(0, users.length - 5);

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-3 py-2",
        "bg-[#A855F7]/10 border border-[#A855F7]/20"
      )}
    >
      <span className="text-sm select-none">🚀</span>

      {/* Overlapping avatar stack */}
      <div className="flex items-center -space-x-2">
        {displayUsers.map((user) => (
          <div key={user.id} className="ring-2 ring-card rounded-full">
            <UserAvatar user={user} size="sm" />
          </div>
        ))}
        {extraCount > 0 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-card">
            +{extraCount}
          </div>
        )}
      </div>

      <span className="text-xs font-medium text-[#A855F7]">
        {chain.length} people went I&apos;m in
      </span>
    </div>
  );
}
