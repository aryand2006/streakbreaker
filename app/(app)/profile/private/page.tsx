"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Lock, Heart, Users, Eye, EyeOff, Trophy } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { GlowCard } from "@/components/streakbreaker/shared/glow-card";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { REALM_MAP, VIBE_CONFIG, RECEIPT_GRADIENTS } from "@/lib/constants";
import { timeAgo } from "@/lib/utils/date-utils";
import { cn } from "@/lib/utils";
import type { Receipt, DuoPairing, User } from "@/lib/types";

/* mock previous duo history */
const PAST_DUOS = [
  { partner: "Maya Patel", realm: "tiny-chaos" as const, task: "Leave a sticky note somewhere unexpected", week: "3 weeks ago", completed: true },
  { partner: "Leo Rivera", realm: "place" as const, task: "Find the quietest spot on campus", week: "5 weeks ago", completed: true },
];

export default function PrivateProfilePage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const users = useAppStore((s) => s.users);
  const receipts = useAppStore((s) => s.receipts);
  const tasks = useAppStore((s) => s.tasks);
  const reactions = useAppStore((s) => s.reactions);
  const duoPairings = useAppStore((s) => s.duoPairings);

  const userMap = useMemo(
    () => Object.fromEntries(users.map((u) => [u.id, u])),
    [users]
  );

  const taskMap = useMemo(
    () => Object.fromEntries(tasks.map((t) => [t.id, t])),
    [tasks]
  );

  // Private receipts
  const privateReceipts = useMemo(
    () => receipts.filter((r) => r.isPrivate),
    [receipts]
  );

  // Active duo with current user
  const activeDuo = useMemo(
    () =>
      duoPairings.find(
        (d) => !d.completed && d.userIds.includes(currentUser?.id ?? "")
      ),
    [duoPairings, currentUser]
  );

  const duoPartner = useMemo(() => {
    if (!activeDuo || !currentUser) return null;
    const partnerId = activeDuo.userIds.find((id) => id !== currentUser.id);
    return partnerId ? userMap[partnerId] ?? null : null;
  }, [activeDuo, currentUser, userMap]);

  const duoTask = activeDuo?.taskId ? taskMap[activeDuo.taskId] ?? null : null;
  const duoRealm = activeDuo ? REALM_MAP[activeDuo.realmSlug] : null;

  // Close friends reactions summary (reactions from friends on user's receipts)
  const closeFriendsReactions = useMemo(() => {
    if (!currentUser) return { total: 0, letsGooo: 0, couldDoMore: 0, imIn: 0 };
    const myReceiptIds = receipts.filter((r) => r.userId === currentUser.id).map((r) => r.id);
    const friendReactions = reactions.filter(
      (r) => myReceiptIds.includes(r.receiptId) && currentUser.friendIds.includes(r.userId)
    );
    return {
      total: friendReactions.length,
      letsGooo: friendReactions.filter((r) => r.type === "lets-gooo").length,
      couldDoMore: friendReactions.filter((r) => r.type === "could-do-more").length,
      imIn: friendReactions.filter((r) => r.type === "im-in").length,
    };
  }, [currentUser, receipts, reactions]);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="Friends Only" showBack />

      <div className="space-y-6 p-4 pb-24">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-card p-4"
        >
          <Lock className="h-5 w-5 text-[#A855F7]" />
          <div>
            <h2 className="text-sm font-bold">Private Zone</h2>
            <p className="text-xs text-muted-foreground">
              Only you and your close friends can see this
            </p>
          </div>
        </motion.div>

        {/* ─── Active Duo ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionLabel icon={Users} color="#00E5FF" label="Active Duo" />

          {activeDuo && duoPartner && duoRealm ? (
            <GlowCard color={duoRealm.accentHex} className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <UserAvatar user={currentUser} size="md" />
                  <div className="absolute -right-2 -bottom-1">
                    <UserAvatar user={duoPartner} size="sm" />
                  </div>
                </div>
                <div className="flex-1 pl-2">
                  <p className="text-sm font-bold">
                    You & {duoPartner.displayName.split(" ")[0]}
                  </p>
                  <RealmBadge slug={activeDuo.realmSlug} size="sm" />
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    activeDuo.completed
                      ? "bg-[#4ADE80]/10 text-[#4ADE80]"
                      : "bg-[#FF8C42]/10 text-[#FF8C42]"
                  )}
                >
                  {activeDuo.completed ? "Completed" : "In Progress"}
                </span>
              </div>

              {duoTask && (
                <div className="rounded-lg bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold">{duoTask.title}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground line-clamp-2">
                    {duoTask.description}
                  </p>
                </div>
              )}

              <div className="text-[10px] text-muted-foreground">
                {activeDuo.sharedReceiptIds.length} / 2 receipts submitted
              </div>
            </GlowCard>
          ) : (
            <div className="mt-3 rounded-2xl border border-dashed border-white/10 p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-muted-foreground/30" />
              <p className="mt-2 text-sm text-muted-foreground">No active duo this week</p>
            </div>
          )}
        </motion.div>

        {/* ─── Private Receipts ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionLabel icon={EyeOff} color="#FF6B8A" label="Private Receipts" />

          {privateReceipts.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-white/10 p-6 text-center">
              <EyeOff className="mx-auto h-8 w-8 text-muted-foreground/30" />
              <p className="mt-2 text-sm text-muted-foreground">No private receipts yet</p>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {privateReceipts.map((receipt, i) => {
                const task = taskMap[receipt.taskId];
                const author = userMap[receipt.userId];
                const realm = task ? REALM_MAP[task.realmSlug] : null;

                return (
                  <motion.div
                    key={receipt.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="flex gap-3 rounded-xl border border-white/[0.06] bg-card p-3"
                  >
                    {/* gradient thumbnail */}
                    <div
                      className="h-14 w-14 shrink-0 rounded-lg"
                      style={{ background: receipt.photoGradient }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Lock className="h-3 w-3 text-[#FF6B8A]/60" />
                        <span className="text-xs font-bold truncate">
                          {task?.title ?? "Unknown task"}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-2">
                        {receipt.caption}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        {author && (
                          <span className="text-[10px] text-muted-foreground">
                            by {author.displayName.split(" ")[0]}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground/50">
                          {timeAgo(receipt.createdAt)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* ─── Close Friends Reactions ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionLabel icon={Heart} color="#FF3366" label="Close Friends Reactions" />

          <div className="mt-3 grid grid-cols-3 gap-2">
            <ReactionStat emoji="🔥" label="Let's gooo" count={closeFriendsReactions.letsGooo} color="#BFFF00" />
            <ReactionStat emoji="😏" label="Could do more" count={closeFriendsReactions.couldDoMore} color="#FF6B8A" />
            <ReactionStat emoji="🚀" label="I'm in" count={closeFriendsReactions.imIn} color="#A855F7" />
          </div>

          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            {closeFriendsReactions.total} total reactions from close friends
          </p>
        </motion.div>

        {/* ─── Duo History ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionLabel icon={Trophy} color="#BFFF00" label="Your Duo History" />

          <div className="mt-3 space-y-2">
            {/* Current duo */}
            {activeDuo && duoPartner && (
              <DuoHistoryItem
                partner={duoPartner.displayName}
                realmSlug={activeDuo.realmSlug}
                task={duoTask?.title ?? "Unknown"}
                week="This week"
                completed={activeDuo.completed}
                isCurrent
              />
            )}

            {/* Past duos */}
            {PAST_DUOS.map((duo, i) => (
              <DuoHistoryItem
                key={i}
                partner={duo.partner}
                realmSlug={duo.realm}
                task={duo.task}
                week={duo.week}
                completed={duo.completed}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Section Label ─── */
function SectionLabel({
  icon: Icon,
  color,
  label,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4" style={{ color }} />
      <h3 className="text-sm font-bold">{label}</h3>
    </div>
  );
}

/* ─── Reaction Stat Card ─── */
function ReactionStat({
  emoji,
  label,
  count,
  color,
}: {
  emoji: string;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl border border-white/[0.06] bg-card p-3"
      style={{ boxShadow: `0 0 12px ${color}11` }}
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-lg font-black tabular-nums" style={{ color }}>
        {count}
      </span>
      <span className="text-[9px] text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

/* ─── Duo History Item ─── */
function DuoHistoryItem({
  partner,
  realmSlug,
  task,
  week,
  completed,
  isCurrent,
}: {
  partner: string;
  realmSlug: "food" | "place" | "social" | "communication" | "style" | "tiny-chaos" | "campus" | "comfort-zone";
  task: string;
  week: string;
  completed: boolean;
  isCurrent?: boolean;
}) {
  const realm = REALM_MAP[realmSlug];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card p-3",
        isCurrent ? "border-white/10" : "border-white/[0.04]"
      )}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
        style={{ background: `${realm.accentHex}1A` }}
      >
        {realm.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold truncate">
          w/ {partner.split(" ")[0]}
          {isCurrent && (
            <span className="ml-1.5 text-[10px] font-normal text-[#00E5FF]">active</span>
          )}
        </p>
        <p className="text-[10px] text-muted-foreground truncate">{task}</p>
      </div>
      <div className="text-right shrink-0">
        <span
          className={cn(
            "block text-[10px] font-semibold",
            completed ? "text-[#4ADE80]" : "text-[#FF8C42]"
          )}
        >
          {completed ? "Done" : "Active"}
        </span>
        <span className="block text-[9px] text-muted-foreground/50">{week}</span>
      </div>
    </div>
  );
}
