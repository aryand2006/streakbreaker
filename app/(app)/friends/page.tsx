"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { REALM_MAP } from "@/lib/constants";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { InviteCard } from "@/components/streakbreaker/friends/invite-card";
import type { FriendGroup } from "@/lib/types";

export default function FriendsPage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const users = useAppStore((s) => s.users);
  const groups = useAppStore((s) => s.groups);
  const duoPairings = useAppStore((s) => s.duoPairings);
  const receipts = useAppStore((s) => s.receipts);
  const tasks = useAppStore((s) => s.tasks);

  const [selectedGroup, setSelectedGroup] = useState<FriendGroup | null>(null);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-[#71717A]">Loading...</p>
      </div>
    );
  }

  const userGroups = groups.filter((g) => g.memberIds.includes(currentUser.id));

  // Group profile view
  if (selectedGroup) {
    const members = users.filter((u) => selectedGroup.memberIds.includes(u.id));
    const groupReceipts = receipts
      .filter((r) => selectedGroup.memberIds.includes(r.userId) && !r.isPrivate)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    // Find trending task in this group
    const taskCounts: Record<string, number> = {};
    groupReceipts.forEach((r) => {
      taskCounts[r.taskId] = (taskCounts[r.taskId] || 0) + 1;
    });
    const trendingTaskId = Object.entries(taskCounts).sort(([, a], [, b]) => b - a)[0]?.[0];
    const trendingTask = trendingTaskId ? tasks.find((t) => t.id === trendingTaskId) : null;

    // Weekly pair cards for this group
    const groupDuos = duoPairings.filter(
      (d) => d.userIds.every((uid) => selectedGroup.memberIds.includes(uid))
    );

    return (
      <div className="flex flex-col pb-24">
        {/* Back header */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <button
            onClick={() => setSelectedGroup(null)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-[#71717A] hover:bg-white/[0.08] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h1 className="text-lg font-bold text-[#F0F0F5]">
            {selectedGroup.emoji} {selectedGroup.name}
          </h1>
        </div>

        <div className="px-4 space-y-6">
          {/* Group header card */}
          <motion.div
            className="rounded-2xl bg-[#141418] p-5 space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center">
              <span className="text-5xl">{selectedGroup.emoji}</span>
              <h2 className="mt-2 text-xl font-bold text-[#F0F0F5]">{selectedGroup.name}</h2>
              <p className="text-sm text-[#71717A]">{members.length} members</p>
            </div>

            {/* Members */}
            <div className="flex justify-center -space-x-2">
              {members.slice(0, 8).map((m) => (
                <div key={m.id} className="rounded-full ring-2 ring-[#141418]">
                  <UserAvatar user={m} size="md" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trending task this week */}
          {trendingTask && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                What this circle is doing this week
              </h3>
              <div className="rounded-xl bg-[#141418] p-4 flex items-center gap-3">
                <RealmBadge slug={trendingTask.realmSlug} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#F0F0F5] truncate">{trendingTask.title}</p>
                  <p className="text-xs text-[#71717A]">
                    {taskCounts[trendingTask.id]} people did this
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent receipts */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Recent receipts
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {groupReceipts.map((r) => {
                const user = users.find((u) => u.id === r.userId);
                const task = tasks.find((t) => t.id === r.taskId);
                const realm = task ? REALM_MAP[task.realmSlug] : null;
                return (
                  <div
                    key={r.id}
                    className="relative aspect-square overflow-hidden rounded-xl"
                  >
                    {r.photoImage ? (
                      <img src={r.photoImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{ background: r.photoGradient }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
                      {user && <UserAvatar user={user} size="sm" />}
                      <span className="text-[10px] font-medium text-white/80 truncate max-w-[60px]">
                        {user?.displayName.split(" ")[0]}
                      </span>
                    </div>
                    {realm && (
                      <span className="absolute top-1.5 right-1.5 text-sm">{realm.emoji}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Weekly pair challenges */}
          {groupDuos.length > 0 && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Weekly pair challenges
              </h3>
              {groupDuos.map((pairing) => {
                const [u1, u2] = pairing.userIds.map((uid) => users.find((u) => u.id === uid));
                const pairingTask = pairing.taskId ? tasks.find((t) => t.id === pairing.taskId) : null;
                const realm = REALM_MAP[pairing.realmSlug];
                const status = pairing.completed
                  ? "Completed"
                  : pairing.sharedReceiptIds.length > 0
                  ? "In progress"
                  : "Not started";
                const statusColor = pairing.completed
                  ? "#4ADE80"
                  : pairing.sharedReceiptIds.length > 0
                  ? "#BFFF00"
                  : "#71717A";

                return (
                  <motion.div
                    key={pairing.id}
                    className="rounded-xl bg-[#141418] p-4 space-y-3"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {u1 && (
                            <div className="rounded-full ring-2 ring-[#141418]">
                              <UserAvatar user={u1} size="sm" />
                            </div>
                          )}
                          {u2 && (
                            <div className="rounded-full ring-2 ring-[#141418]">
                              <UserAvatar user={u2} size="sm" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#F0F0F5]">
                            {u1?.displayName.split(" ")[0]} & {u2?.displayName.split(" ")[0]}
                          </p>
                        </div>
                      </div>
                      <RealmBadge slug={pairing.realmSlug} size="sm" />
                    </div>

                    {pairingTask && (
                      <p className="text-xs text-[#A1A1AA]">{pairingTask.title}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: statusColor }}
                      >
                        {status}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#71717A]">
                        View challenge
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Pods list view
  return (
    <div className="flex flex-col pb-24">
      <PageHeader title="Friends" />

      <div className="flex flex-col gap-4 px-4 pt-2">
        <p className="text-sm text-[#71717A]">Your circles</p>

        {userGroups.map((group, gi) => {
          const members = users.filter((u) => group.memberIds.includes(u.id));
          const recentReceipts = receipts
            .filter((r) => group.memberIds.includes(r.userId) && !r.isPrivate)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          const activeCount = members.filter((m) => m.stats.currentRun > 0).length;

          return (
            <motion.button
              key={group.id}
              className="w-full rounded-2xl bg-[#141418] p-4 text-left space-y-3 transition-colors hover:bg-[#1a1a1f]"
              onClick={() => setSelectedGroup(group)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + gi * 0.08, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <div>
                    <h3 className="text-base font-bold text-[#F0F0F5]">{group.name}</h3>
                    <p className="text-xs text-[#71717A]">
                      {members.length} members · {activeCount} active
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-[#71717A]" />
              </div>

              {/* Member avatars */}
              <div className="flex -space-x-1.5">
                {members.slice(0, 6).map((m) => (
                  <div key={m.id} className="rounded-full ring-2 ring-[#141418]">
                    <UserAvatar user={m} size="sm" />
                  </div>
                ))}
                {members.length > 6 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] ring-2 ring-[#141418] text-[10px] font-medium text-[#71717A]">
                    +{members.length - 6}
                  </div>
                )}
              </div>

              {/* Recent activity hint */}
              {recentReceipts.length > 0 && (
                <p className="text-[11px] text-[#71717A]">
                  {recentReceipts.length} receipts this week
                </p>
              )}
            </motion.button>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <InviteCard />
        </motion.div>
      </div>
    </div>
  );
}
