"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Lock, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
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
  const feedUnlocked = useAppStore((s) => s.feedUnlocked);

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

  // Feed locked state
  if (!feedUnlocked) {
    return (
      <div className="relative flex flex-col gap-4 pb-6 min-h-[80vh]">
        {/* Blurred preview of feed behind */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="filter blur-lg opacity-40 pointer-events-none space-y-4 px-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-[#F0F0F5]">Feed</h1>
            </div>
            <div className="flex items-center gap-2">
              {filters.map((f) => (
                <span
                  key={f.key}
                  className="rounded-full px-4 py-1.5 text-sm font-medium bg-[#141418] text-[#71717A]"
                >
                  {f.label}
                </span>
              ))}
            </div>
            {/* Fake feed cards */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#141418] border border-white/[0.04] p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/[0.06]" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-24 bg-white/[0.06] rounded" />
                    <div className="h-2 w-16 bg-white/[0.04] rounded" />
                  </div>
                </div>
                <div className="h-36 rounded-xl bg-white/[0.04]" />
                <div className="h-3 w-48 bg-white/[0.04] rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Lock overlay */}
        <motion.div
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06]"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock className="h-8 w-8 text-[#71717A]" />
          </motion.div>

          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-[#F0F0F5]">
              Break first. Lurk later.
            </h2>
            <p className="text-sm text-[#71717A] max-w-[260px]">
              Complete a task and upload your receipt to unlock the feed.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            <Link href="/receipt/new" className="block">
              <motion.div
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#BFFF00] font-bold text-black text-sm"
                whileTap={{ scale: 0.97 }}
              >
                <Upload className="h-4 w-4" />
                Upload receipt
              </motion.div>
            </Link>

            <Link href="/today" className="block">
              <motion.div
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-[#141418] font-semibold text-[#A1A1AA] text-sm"
                whileTap={{ scale: 0.97 }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to today
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
