"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Settings, Zap, Upload, ChevronRight, Lock, Users, Link2 } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { REALM_MAP, VIBE_CONFIG } from "@/lib/constants";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { BadgeShowcase } from "@/components/streakbreaker/profile/badge-showcase";
import { ReceiptGallery } from "@/components/streakbreaker/profile/receipt-gallery";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/utils/date-utils";

type ProfileTab = "activity" | "im-in" | "badges" | "private";

export default function ProfilePage() {
  const [tab, setTab] = useState<ProfileTab>("activity");
  const currentUser = useAppStore((s) => s.currentUser);
  const badges = useAppStore((s) => s.badges);
  const receipts = useAppStore((s) => s.receipts);
  const tasks = useAppStore((s) => s.tasks);
  const users = useAppStore((s) => s.users);
  const chains = useAppStore((s) => s.chains);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-[#71717A]">Loading...</p>
      </div>
    );
  }

  const userReceipts = receipts.filter((r) => r.userId === currentUser.id);
  const publicReceipts = userReceipts.filter((r) => !r.isPrivate);
  const privateReceipts = userReceipts.filter((r) => r.isPrivate);
  const vibe = VIBE_CONFIG[currentUser.vibeChoice];

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "activity", label: "Activity" },
    { key: "im-in", label: "I'm In" },
    { key: "badges", label: "Badges" },
    { key: "private", label: "Private" },
  ];

  // Build "I'm In" data from chains + saved tasks
  const imInItems = chains
    .filter((chain) => {
      // Chains where current user has a receipt
      return chain.receiptIds.some((rId) => {
        const r = receipts.find((rec) => rec.id === rId);
        return r?.userId === currentUser.id;
      });
    })
    .map((chain) => {
      const task = tasks.find((t) => t.id === chain.taskId);
      const originReceipt = receipts.find((r) => r.id === chain.originReceiptId);
      const originUser = originReceipt ? users.find((u) => u.id === originReceipt.userId) : null;
      return { chain, task, originUser };
    })
    .filter((item) => item.task && item.originUser);

  return (
    <div className="flex flex-col pb-24">
      <PageHeader
        title="Profile"
        rightAction={
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.04]"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        }
      />

      {/* Proactive header area */}
      <motion.div
        className="px-4 pt-4 pb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Identity row */}
        <div className="flex items-center gap-4">
          <UserAvatar user={currentUser} size="xl" />

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[#F0F0F5] truncate">
              {currentUser.displayName}
            </h1>
            <p className="text-sm text-[#71717A]">@{currentUser.username}</p>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#71717A]">{currentUser.university}</span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: `${vibe.color}12`, color: vibe.color }}
              >
                {vibe.emoji} {vibe.label}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <p className="mt-3 text-sm text-[#A1A1AA] leading-relaxed">
            {currentUser.bio}
          </p>
        )}

        {/* Current run + quick actions */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1 rounded-xl bg-[#141418] p-3 text-center">
            <p className="text-2xl font-extrabold text-[#BFFF00] tabular-nums">
              {currentUser.stats.currentRun}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#71717A] mt-0.5">
              day run
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-[#141418] p-3 text-center">
            <p className="text-2xl font-extrabold text-[#F0F0F5] tabular-nums">
              {currentUser.stats.tasksCompleted}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#71717A] mt-0.5">
              tasks
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-[#141418] p-3 text-center">
            <p className="text-2xl font-extrabold text-[#A78BFA] tabular-nums">
              {currentUser.stats.influenceScore}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#71717A] mt-0.5">
              influence
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-3 flex gap-2">
          <Link href="/today" className="flex-1">
            <div className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#BFFF00] text-sm font-bold text-black">
              <Zap className="h-3.5 w-3.5" />
              New task
            </div>
          </Link>
          <Link href="/receipt/new" className="flex-1">
            <div className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/[0.06] bg-[#141418] text-sm font-semibold text-[#A1A1AA]">
              <Upload className="h-3.5 w-3.5" />
              Upload
            </div>
          </Link>
        </div>

        {/* Known for tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {currentUser.knownFor.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-[#A1A1AA]"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="mt-4 flex gap-1 px-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 rounded-xl py-2 text-sm font-medium transition-all",
              tab === t.key
                ? "bg-[#F0F0F5] text-[#0A0A0C]"
                : "text-[#71717A] hover:bg-white/[0.04]"
            )}
          >
            {t.label}
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      <div className="mt-4 px-4">
        {tab === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-[#71717A]">Recent receipts</h3>
            <ReceiptGallery receipts={publicReceipts} />

            {/* Stats breakdown */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {[
                { label: "Longest run", value: `${currentUser.stats.longestRun}d`, icon: "🏆" },
                { label: "Realms explored", value: currentUser.stats.realmsExplored, icon: "🗺️" },
                { label: "Friends", value: currentUser.stats.friendCount, icon: "👥" },
                { label: "Reactions received", value: currentUser.stats.reactionsReceived, icon: "💬" },
                { label: "Duo wins", value: currentUser.stats.duoWins, icon: "🤝" },
                { label: "I'm In count", value: currentUser.stats.imInCount, icon: "🚀" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 rounded-xl bg-[#141418] p-3">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#F0F0F5] tabular-nums">{s.value}</p>
                    <p className="text-[10px] text-[#71717A] uppercase tracking-wider">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "im-in" && (
          <motion.div
            key="im-in"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-[#71717A]">The moves you joined.</p>

            {imInItems.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <span className="text-4xl">🚀</span>
                <p className="text-sm text-[#71717A]">No chains joined yet</p>
                <p className="text-xs text-[#3F3F46]">Hit &quot;I&apos;m in&quot; on a receipt to start</p>
              </div>
            ) : (
              imInItems.map(({ chain, task, originUser }) => {
                const realm = task ? REALM_MAP[task.realmSlug] : null;
                return (
                  <motion.div
                    key={chain.id}
                    className="rounded-xl bg-[#141418] p-4 space-y-2.5"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {originUser && <UserAvatar user={originUser} size="sm" />}
                        <div>
                          <p className="text-sm font-semibold text-[#F0F0F5]">
                            {originUser?.displayName}
                          </p>
                          <p className="text-[11px] text-[#71717A]">started this chain</p>
                        </div>
                      </div>
                      {realm && <RealmBadge slug={task!.realmSlug} size="sm" />}
                    </div>

                    <p className="text-sm font-medium text-[#A1A1AA]">
                      {task?.title}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                        <Users className="h-3 w-3" />
                        <span>{chain.length} people in chain</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-[#A78BFA]">
                        View chain
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}

        {tab === "badges" && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-[#71717A] mb-3">
              {currentUser.badgeIds.length} badges earned
            </p>
            <BadgeShowcase badgeIds={currentUser.badgeIds} allBadges={badges} />
          </motion.div>
        )}

        {tab === "private" && (
          <motion.div
            key="private"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-sm text-[#71717A]">
              <Lock className="h-3.5 w-3.5" />
              <span>Only visible to you</span>
            </div>

            {privateReceipts.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <span className="text-4xl">🔒</span>
                <p className="text-sm text-[#71717A]">No private receipts</p>
                <p className="text-xs text-[#3F3F46]">Mark a receipt as private when posting</p>
              </div>
            ) : (
              <ReceiptGallery receipts={privateReceipts} />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
