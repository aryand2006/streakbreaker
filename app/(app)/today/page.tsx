"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Upload, Clock, AlertTriangle, Bell } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { REALM_MAP, VIBE_CONFIG, SOCIAL_RISK_LABELS } from "@/lib/constants";
import { RealmCard } from "@/components/streakbreaker/today/realm-card";
import { ActionButtons } from "@/components/streakbreaker/today/action-buttons";
import { StatsBar } from "@/components/streakbreaker/today/stats-bar";
import { FriendActivity } from "@/components/streakbreaker/today/friend-activity";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const WITTY_HEADERS = [
  "Today feels suspiciously predictable.",
  "Another day, another pattern to break.",
  "Your comfort zone called. We hung up.",
  "Routine is just fear wearing a schedule.",
  "Plot twist incoming.",
];

function getDateDisplay() {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getDailyHeader() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return WITTY_HEADERS[dayOfYear % WITTY_HEADERS.length];
}

function TodaySkeleton() {
  return (
    <div className="space-y-6 pb-24">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-40 bg-white/[0.06]" />
        <Skeleton className="h-5 w-64 bg-white/[0.06]" />
      </div>

      {/* Realm card skeleton */}
      <Skeleton className="h-64 w-full rounded-3xl bg-white/[0.06]" />

      {/* Action buttons skeleton */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-14 w-full rounded-2xl bg-white/[0.06]" />
        <Skeleton className="h-14 w-full rounded-2xl bg-white/[0.04]" />
        <Skeleton className="h-14 w-full rounded-2xl bg-white/[0.04]" />
      </div>

      {/* Stats bar skeleton */}
      <div className="flex justify-between gap-3">
        <Skeleton className="h-16 flex-1 rounded-xl bg-white/[0.06]" />
        <Skeleton className="h-16 flex-1 rounded-xl bg-white/[0.06]" />
        <Skeleton className="h-16 flex-1 rounded-xl bg-white/[0.06]" />
      </div>

      {/* Friend activity skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28 bg-white/[0.06]" />
        <div className="flex gap-3">
          <Skeleton className="h-20 w-[220px] shrink-0 rounded-xl bg-white/[0.06]" />
          <Skeleton className="h-20 w-[220px] shrink-0 rounded-xl bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

export default function TodayPage() {
  const todayRealm = useAppStore((s) => s.todayRealm);
  const todayTask = useAppStore((s) => s.todayTask);
  const taskSource = useAppStore((s) => s.taskSource);
  const notifications = useAppStore((s) => s.notifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!todayRealm) {
    return <TodaySkeleton />;
  }

  const realm = REALM_MAP[todayRealm.slug];

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#71717A]">
            {getDateDisplay()}
          </p>
          <h1 className="text-lg font-semibold text-[#A1A1AA]">
            {getDailyHeader()}
          </h1>
        </div>

        {/* Notification bell */}
        <Link
          href="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] transition-colors hover:bg-white/[0.1]"
        >
          <Bell className="h-4.5 w-4.5 text-[#71717A]" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
      </motion.div>

      {/* Realm Card - Hero */}
      <RealmCard realm={realm} />

      {/* Task Card OR Action Buttons */}
      {todayTask ? (
        <TaskCard />
      ) : (
        <ActionButtons />
      )}

      {/* Stats Bar */}
      <StatsBar />

      {/* Friend Activity */}
      <FriendActivity />
    </div>
  );
}

function TaskCard() {
  const todayTask = useAppStore((s) => s.todayTask);
  const taskSource = useAppStore((s) => s.taskSource);

  if (!todayTask) return null;

  const realm = REALM_MAP[todayTask.realmSlug];
  const vibe = VIBE_CONFIG[todayTask.vibe];
  const riskLabel = SOCIAL_RISK_LABELS[todayTask.socialRisk];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl bg-[#141418]"
      style={{
        border: `1px solid ${realm.accentHex}1A`,
      }}
    >
      {/* Subtle top accent */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${realm.accentHex}, ${realm.accentHex}66)`,
        }}
      />

      <div className="space-y-4 p-5">
        {/* Source tag */}
        {taskSource && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[11px] font-medium uppercase tracking-wider text-[#71717A]"
          >
            {taskSource === "lucky"
              ? "Feeling Lucky pick"
              : taskSource === "picked"
              ? "Your pick"
              : taskSource === "friend-picked"
              ? "Friend picked for you"
              : "Today's task"}
          </motion.p>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold leading-tight text-[#F0F0F5]">
          {todayTask.title}
        </h2>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#A1A1AA]">
          {todayTask.description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <RealmBadge slug={todayTask.realmSlug} size="sm" />

          {/* Vibe badge */}
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${vibe.color}1A`,
              color: vibe.color,
            }}
          >
            <span>{vibe.emoji}</span>
            <span>{vibe.label}</span>
          </span>

          {/* Social risk */}
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              "bg-white/[0.06] text-[#71717A]"
            )}
          >
            <AlertTriangle className="h-3 w-3" />
            <span>{riskLabel}</span>
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-[#71717A]">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {todayTask.timeEstimate}
          </span>
          <span className="text-[#71717A]/30">|</span>
          <span>
            Proof: {todayTask.proofSuggestion}
          </span>
        </div>

        {/* Upload Receipt CTA */}
        <Link href="/receipt/new" className="block">
          <motion.div
            className={cn(
              "flex items-center justify-center gap-2 rounded-2xl px-5 py-3",
              "bg-[#BFFF00] font-bold text-[#0A0A0C]"
            )}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Receipt</span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
