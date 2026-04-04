"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { REALM_MAP } from "@/lib/constants";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { ReactionSummary } from "./reaction-summary";
import { ChainIndicator } from "./chain-indicator";
import { timeAgo } from "@/lib/utils/date-utils";
import { useAppStore } from "@/stores/app-store";
import type { Receipt, User, Task, Reaction, Chain } from "@/lib/types";

interface FeedItemProps {
  receipt: Receipt;
  user: User;
  task: Task;
  reactions: Reaction[];
  chain: Chain | undefined;
  allUsers: User[];
}

export function FeedItem({
  receipt,
  user,
  task,
  reactions,
  chain,
  allUsers,
}: FeedItemProps) {
  const cloneTask = useAppStore((s) => s.cloneTask);
  const currentUser = useAppStore((s) => s.currentUser);
  const allReceipts = useAppStore((s) => s.receipts);
  const realm = REALM_MAP[task.realmSlug];

  // Get the users who are part of this chain by resolving receipt -> userId
  const chainUsers =
    chain && chain.length > 1
      ? (() => {
          const chainUserIds = new Set<string>();
          for (const rId of chain.receiptIds) {
            const r = allReceipts.find((rec) => rec.id === rId);
            if (r) chainUserIds.add(r.userId);
          }
          return allUsers.filter((u) => chainUserIds.has(u.id));
        })()
      : [];

  const isOwnReceipt = currentUser?.id === receipt.userId;

  return (
    <motion.div
      className="overflow-hidden rounded-2xl bg-[#141418] border border-white/[0.06]"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
    >
      {/* Header: user + timestamp */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <UserAvatar user={user} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-[#F0F0F5] truncate">
              {user.displayName}
            </p>
            {user.isVerified && (
              <span className="text-xs text-blue-400">✓</span>
            )}
          </div>
          <p className="text-xs text-[#71717A]">
            @{user.username} · {timeAgo(receipt.createdAt)}
          </p>
        </div>
        <RealmBadge slug={task.realmSlug} size="sm" />
      </div>

      {/* Photo area with gradient */}
      <div className="relative mx-4 mt-2 flex h-48 items-center justify-center overflow-hidden rounded-xl">
        {receipt.photoImage ? (
          <img src={receipt.photoImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: receipt.photoGradient }} />
        )}
        <span className="absolute text-7xl select-none drop-shadow-lg">{realm.emoji}</span>
        {/* Subtle vignette */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-4 py-3">
        {/* Caption */}
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          {receipt.caption}
        </p>

        {/* Task title */}
        <p className="text-xs text-[#71717A]">
          <span className="font-medium" style={{ color: realm.accentHex }}>
            {realm.emoji} {task.title}
          </span>
        </p>

        {/* Chain indicator */}
        {chain && chain.length > 1 && (
          <ChainIndicator chain={chain} users={chainUsers} />
        )}

        {/* Reaction summary + "I'm in" button */}
        <div className="flex items-center justify-between pt-1">
          <ReactionSummary reactions={reactions} />

          {!isOwnReceipt && (
            <button
              onClick={() => cloneTask(receipt.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                "text-xs font-semibold transition-all",
                "bg-[#A78BFA]/10 text-[#A78BFA] hover:bg-[#A78BFA]/20",
                "active:scale-95"
              )}
            >
              <span>🚀</span>
              <span>I&apos;m in</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
