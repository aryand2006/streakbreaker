"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Search, Users } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { cn } from "@/lib/utils";

export function ActionButtons() {
  const users = useAppStore((s) => s.users);
  const currentUser = useAppStore((s) => s.currentUser);

  const friends = users
    .filter((u) => !u.isCurrentUser && currentUser?.friendIds.includes(u.id))
    .slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Feeling Lucky - Primary */}
      <motion.div variants={item}>
        <Link href="/lucky" className="block">
          <motion.div
            className={cn(
              "flex h-14 items-center justify-center gap-2.5 rounded-2xl px-6",
              "bg-[#BFFF00] font-bold text-black"
            )}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-base">Feeling Lucky</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Pick My Own */}
      <motion.div variants={item}>
        <Link href="/realms" className="block">
          <motion.div
            className={cn(
              "flex h-14 items-center justify-center gap-2.5 rounded-2xl border border-white/[0.06] px-6",
              "bg-[#141418] font-semibold text-[#F0F0F5]",
              "transition-colors hover:bg-white/5"
            )}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Search className="h-5 w-5" />
            <span className="text-base">Pick My Own</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Ask a Friend */}
      <motion.div variants={item}>
        <Link href="/ask-friend" className="block">
          <motion.div
            className={cn(
              "flex h-14 items-center justify-center gap-2.5 rounded-2xl border border-white/[0.06] px-6",
              "bg-[#141418] font-semibold text-[#F0F0F5]",
              "transition-colors hover:bg-white/5"
            )}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="rounded-full ring-2 ring-background"
                  >
                    <UserAvatar user={friend} size="sm" />
                  </div>
                ))
              ) : (
                <Users className="h-5 w-5" />
              )}
            </div>
            <span className="text-base">Ask a Friend</span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
