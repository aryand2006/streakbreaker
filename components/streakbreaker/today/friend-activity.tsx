"use client";

import { motion } from "motion/react";
import { useAppStore } from "@/stores/app-store";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { cn } from "@/lib/utils";

const ACTIVITY_TEMPLATES = [
  (name: string, run: number) => ({
    text: `is on a ${run}-day run`,
    highlight: `${run}-day run`,
  }),
  (_name: string, _run: number) => ({
    text: "completed a Food task",
    highlight: "Food task",
  }),
  (_name: string, _run: number) => ({
    text: "just got 3 Let's gooo",
    highlight: "Let's gooo",
  }),
  (_name: string, _run: number) => ({
    text: "started a new chain",
    highlight: "new chain",
  }),
  (_name: string, _run: number) => ({
    text: "broke into Comfort Zone",
    highlight: "Comfort Zone",
  }),
  (_name: string, _run: number) => ({
    text: "completed a Tiny Chaos task",
    highlight: "Tiny Chaos",
  }),
];

function PulseDot() {
  return (
    <span className="relative ml-1.5 inline-flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BFFF00] opacity-50" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#BFFF00]" />
    </span>
  );
}

export function FriendActivity() {
  const users = useAppStore((s) => s.users);
  const currentUser = useAppStore((s) => s.currentUser);

  const friends = users
    .filter((u) => !u.isCurrentUser && currentUser?.friendIds.includes(u.id))
    .slice(0, 6);

  if (friends.length === 0) return null;

  return (
    <div className="space-y-4">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm font-bold text-[#F0F0F5]"
      >
        Friend Activity
      </motion.h3>

      <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide">
        <div className="flex gap-3">
          {friends.map((friend, i) => {
            const activity = ACTIVITY_TEMPLATES[i % ACTIVITY_TEMPLATES.length](
              friend.displayName,
              friend.stats.currentRun
            );
            const isRecent = i < 2;

            return (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.45 + i * 0.07,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                className={cn(
                  "flex shrink-0 items-start gap-3 rounded-2xl p-4",
                  "bg-[#141418] border border-white/[0.06]",
                  "w-[220px]"
                )}
              >
                <UserAvatar user={friend} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="truncate text-sm font-semibold text-[#F0F0F5]">
                      {friend.displayName.split(" ")[0]}
                    </span>
                    {isRecent && <PulseDot />}
                  </div>
                  <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#71717A]">
                    {activity.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
