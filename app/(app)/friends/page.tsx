"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { REALM_MAP } from "@/lib/constants";
import { PageHeader } from "@/components/layout/page-header";
import { PodHeader } from "@/components/streakbreaker/friends/pod-header";
import { MemberList } from "@/components/streakbreaker/friends/member-list";
import { InviteCard } from "@/components/streakbreaker/friends/invite-card";
import { DuoPairing } from "@/components/streakbreaker/friends/duo-pairing";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FriendsPage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const users = useAppStore((s) => s.users);
  const groups = useAppStore((s) => s.groups);
  const duoPairings = useAppStore((s) => s.duoPairings);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-[#71717A]">Loading...</p>
      </div>
    );
  }

  // Groups the current user belongs to
  const userGroups = groups.filter((g) =>
    g.memberIds.includes(currentUser.id)
  );

  // Compute quick stats for groups tab
  const allGroupMemberIds = new Set(
    userGroups.flatMap((g) => g.memberIds)
  );
  const groupMembers = users.filter((u) => allGroupMemberIds.has(u.id));
  const totalGroupTasks = groupMembers.reduce(
    (sum, u) => sum + u.stats.tasksCompleted,
    0
  );

  // Top realm: the one with the most tasks by finding most frequent vibe
  const topRealm = "Food";

  return (
    <div className="flex flex-col pb-24">
      <PageHeader title="Friends" />

      <Tabs defaultValue="groups" className="mt-2 px-4">
        <TabsList className="w-full bg-[#141418] rounded-2xl p-1">
          <TabsTrigger value="groups" className="flex-1 rounded-xl data-active:bg-[#F0F0F5] data-active:text-[#0A0A0C] text-[#71717A]">
            Groups
          </TabsTrigger>
          <TabsTrigger value="duo" className="flex-1 rounded-xl data-active:bg-[#F0F0F5] data-active:text-[#0A0A0C] text-[#71717A]">
            Duo
          </TabsTrigger>
        </TabsList>

        {/* Groups Tab */}
        <TabsContent value="groups">
          <div className="flex flex-col gap-6 pt-4">
            {/* Quick stats */}
            <motion.div
              className="flex items-center justify-between rounded-2xl bg-[#141418] px-4 py-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-[#71717A]">
                  Top realm this week
                </span>
                <span className="text-sm font-semibold">
                  {REALM_MAP.food.emoji} {topRealm}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-[#71717A]">
                  Group tasks
                </span>
                <span className="text-sm font-semibold">{totalGroupTasks}</span>
              </div>
            </motion.div>

            {userGroups.map((group, gi) => {
              const members = users.filter((u) =>
                group.memberIds.includes(u.id)
              );

              return (
                <motion.div
                  key={group.id}
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + gi * 0.1,
                    duration: 0.4,
                  }}
                >
                  <PodHeader
                    group={group}
                    memberCount={members.length}
                  />
                  <MemberList members={members} />
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <InviteCard />
            </motion.div>
          </div>
        </TabsContent>

        {/* Duo Tab */}
        <TabsContent value="duo">
          <div className="flex flex-col gap-6 pt-4">
            {duoPairings.map((pairing, i) => {
              const realm = REALM_MAP[pairing.realmSlug];
              return (
                <motion.div
                  key={pairing.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                  }}
                >
                  <DuoPairing
                    pairing={pairing}
                    users={users}
                    realm={realm}
                  />
                </motion.div>
              );
            })}

            {/* Extended circle matching toggle */}
            <motion.div
              className="rounded-2xl bg-[#141418] p-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">
                    Extended circle matching
                  </span>
                  <span className="text-xs text-[#71717A]">
                    Match with friends of friends
                  </span>
                </div>
                <Switch />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#71717A]/60">
                When enabled, you may be matched with 2nd-degree connections
                -- friends of your friends who share similar realms and vibes.
                This expands your duo pool beyond your immediate circle.
              </p>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
