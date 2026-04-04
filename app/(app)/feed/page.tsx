"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { FeedItem } from "@/components/streakbreaker/feed/feed-item";

type FeedFilter = "all" | "friends" | "trending";

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedFilter>("all");

  const receipts = useAppStore((s) => s.receipts);
  const users = useAppStore((s) => s.users);
  const tasks = useAppStore((s) => s.tasks);
  const reactions = useAppStore((s) => s.reactions);
  const chains = useAppStore((s) => s.chains);
  const currentUser = useAppStore((s) => s.currentUser);

  // Sort receipts by createdAt descending, filter out private
  const feedItems = useMemo(() => {
    const publicReceipts = receipts
      .filter((r) => !r.isPrivate)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    if (filter === "friends" && currentUser) {
      return publicReceipts.filter(
        (r) =>
          currentUser.friendIds.includes(r.userId) || r.userId === currentUser.id
      );
    }

    if (filter === "trending") {
      // Sort by reaction count descending
      return [...publicReceipts].sort((a, b) => {
        const aCount = reactions.filter((rx) => rx.receiptId === a.id).length;
        const bCount = reactions.filter((rx) => rx.receiptId === b.id).length;
        return bCount - aCount;
      });
    }

    return publicReceipts;
  }, [receipts, reactions, filter, currentUser]);

  const filters: { key: FeedFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "friends", label: "Friends" },
    { key: "trending", label: "Trending" },
  ];

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Page header */}
      <motion.div
        className="flex items-center justify-between px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-extrabold text-[#F0F0F5]">Feed</h1>
        <span className="text-xs text-[#71717A]">
          {feedItems.length} receipts
        </span>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="flex items-center gap-2 px-1"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              filter === f.key
                ? "bg-[#F0F0F5] text-[#0A0A0C]"
                : "bg-[#141418] text-[#71717A] hover:bg-[#141418]/80"
            )}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Feed list */}
      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.07 },
          },
        }}
      >
        {feedItems.map((receipt) => {
          const user = users.find((u) => u.id === receipt.userId);
          const task = tasks.find((t) => t.id === receipt.taskId);
          if (!user || !task) return null;

          const receiptReactions = reactions.filter(
            (rx) => rx.receiptId === receipt.id
          );

          const chain = chains.find((c) =>
            c.receiptIds.includes(receipt.id)
          );

          return (
            <FeedItem
              key={receipt.id}
              receipt={receipt}
              user={user}
              task={task}
              reactions={receiptReactions}
              chain={chain}
              allUsers={users}
            />
          );
        })}
      </motion.div>

      {/* Empty state */}
      {feedItems.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center gap-3 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-5xl">📭</span>
          <p className="text-[#71717A] text-sm">No receipts to show</p>
        </motion.div>
      )}
    </div>
  );
}
