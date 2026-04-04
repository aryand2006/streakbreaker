"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Flame,
  Rocket,
  Users,
  UserPlus,
  Award,
  TrendingUp,
  RefreshCw,
  Settings,
  MessageCircle,
  Check,
} from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/utils/date-utils";
import type { Notification } from "@/lib/types";

const TYPE_CONFIG: Record<
  Notification["type"],
  { icon: React.ElementType; color: string }
> = {
  reaction: { icon: Flame, color: "#FF8C42" },
  "im-in": { icon: Rocket, color: "#A855F7" },
  "friend-pick": { icon: UserPlus, color: "#FF6B8A" },
  duo: { icon: Users, color: "#00E5FF" },
  invite: { icon: UserPlus, color: "#4ADE80" },
  badge: { icon: Award, color: "#BFFF00" },
  trend: { icon: TrendingUp, color: "#FF3366" },
  reroll: { icon: RefreshCw, color: "#818CF8" },
  system: { icon: Settings, color: "#64748B" },
};

function groupNotifications(notifications: Notification[]) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const today: Notification[] = [];
  const thisWeek: Notification[] = [];
  const older: Notification[] = [];

  for (const n of notifications) {
    const d = new Date(n.createdAt);
    if (d >= todayStart) {
      today.push(n);
    } else if (d >= weekStart) {
      thisWeek.push(n);
    } else {
      older.push(n);
    }
  }

  return { today, thisWeek, older };
}

export default function NotificationsPage() {
  const notifications = useAppStore((s) => s.notifications);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);
  const users = useAppStore((s) => s.users);

  const sorted = useMemo(
    () =>
      [...notifications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [notifications]
  );

  const unreadCount = sorted.filter((n) => !n.read).length;
  const grouped = useMemo(() => groupNotifications(sorted), [sorted]);

  const userMap = useMemo(
    () => Object.fromEntries(users.map((u) => [u.id, u])),
    [users]
  );

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Notifications"
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-semibold text-[#BFFF00] transition-opacity hover:opacity-80"
            >
              Read all
            </button>
          ) : undefined
        }
      />

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-32 text-center">
          <MessageCircle className="h-12 w-12 text-[#71717A]/30" />
          <p className="mt-4 text-sm text-[#71717A]">No notifications yet</p>
        </div>
      ) : (
        <div className="pb-8">
          {grouped.today.length > 0 && (
            <NotificationGroup
              label="Today"
              items={grouped.today}
              userMap={userMap}
              onMarkRead={markNotificationRead}
            />
          )}
          {grouped.thisWeek.length > 0 && (
            <NotificationGroup
              label="Earlier this week"
              items={grouped.thisWeek}
              userMap={userMap}
              onMarkRead={markNotificationRead}
            />
          )}
          {grouped.older.length > 0 && (
            <NotificationGroup
              label="Older"
              items={grouped.older}
              userMap={userMap}
              onMarkRead={markNotificationRead}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Group ─── */
function NotificationGroup({
  label,
  items,
  userMap,
  onMarkRead,
}: {
  label: string;
  items: Notification[];
  userMap: Record<string, { id: string; displayName: string; avatarGradient: string }>;
  onMarkRead: (id: string) => void;
}) {
  return (
    <div className="mt-2">
      <div className="sticky top-14 z-20 bg-background/80 px-4 py-2 backdrop-blur-md">
        <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
          {label}
        </span>
      </div>
      <div>
        {items.map((notif, i) => (
          <NotificationItem
            key={notif.id}
            notification={notif}
            user={notif.avatarUserId ? userMap[notif.avatarUserId] ?? null : null}
            index={i}
            onMarkRead={onMarkRead}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Item ─── */
function NotificationItem({
  notification,
  user,
  index,
  onMarkRead,
}: {
  notification: Notification;
  user: { id: string; displayName: string; avatarGradient: string } | null;
  index: number;
  onMarkRead: (id: string) => void;
}) {
  const config = TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      onClick={() => {
        if (!notification.read) onMarkRead(notification.id);
      }}
      className={cn(
        "relative flex w-full gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-white/[0.02]",
        !notification.read
          ? "bg-[#141418] border border-white/[0.06]"
          : ""
      )}
      style={
        !notification.read
          ? { borderLeftColor: config.color, borderLeftWidth: 2 }
          : undefined
      }
    >

      {/* Avatar or Icon */}
      <div className="shrink-0 pt-0.5">
        {user ? (
          <UserAvatar user={user} size="sm" />
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: `${config.color}1A` }}
          >
            <Icon className="h-4 w-4" style={{ color: config.color }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-tight">
          <span className={cn("font-semibold", !notification.read && "text-[#F0F0F5]")}>
            {notification.title}
          </span>
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-[#A1A1AA] line-clamp-2">
          {notification.body}
        </p>
        <p className="mt-1 text-[10px] text-[#71717A]">
          {timeAgo(notification.createdAt)}
        </p>
      </div>

      {/* Read indicator */}
      {notification.read && (
        <div className="shrink-0 pt-1">
          <Check className="h-3 w-3 text-[#71717A]/30" />
        </div>
      )}
    </motion.button>
  );
}
