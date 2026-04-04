"use client";

import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { cn } from "@/lib/utils";
import { REALM_MAP, REACTION_CONFIG } from "@/lib/constants";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { timeAgo } from "@/lib/utils/date-utils";
import type { Receipt, User, Task, ReactionType } from "@/lib/types";

interface SwipeCardProps {
  receipt: Receipt;
  user: User;
  task: Task;
  onSwipe: (direction: ReactionType) => void;
  isTop: boolean;
}

export function SwipeCard({ receipt, user, task, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  // Overlay opacities
  const leftOverlayOpacity = useTransform(x, [-150, -50], [1, 0]);
  const rightOverlayOpacity = useTransform(x, [50, 150], [0, 1]);
  const upOverlayOpacity = useTransform(y, [-150, -50], [1, 0]);

  const realm = REALM_MAP[task.realmSlug];

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const { offset, velocity } = info;

    if (offset.x > 100 || velocity.x > 500) {
      onSwipe("lets-gooo");
    } else if (offset.x < -100 || velocity.x < -500) {
      onSwipe("could-do-more");
    } else if (offset.y < -100 || velocity.y < -500) {
      onSwipe("im-in");
    }
    // Otherwise card snaps back via dragConstraints
  }

  return (
    <motion.div
      className={cn(
        "absolute inset-0 cursor-grab active:cursor-grabbing",
        !isTop && "pointer-events-none"
      )}
      style={{
        x,
        y,
        rotate,
        zIndex: isTop ? 10 : 0,
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#141418] border border-white/[0.06]">
        {/* ── Photo / gradient area ─────────────────────────────────── */}
        <div className="relative flex h-[55%] items-center justify-center overflow-hidden">
          {receipt.photoImage ? (
            <img src={receipt.photoImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" style={{ background: receipt.photoGradient }} />
          )}

          {/* Large realm emoji */}
          <span className="absolute text-8xl select-none drop-shadow-lg">{realm.emoji}</span>

          {/* Subtle gradient overlay at bottom for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141418] to-transparent" />
        </div>

        {/* ── Info section ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 p-5">
          {/* User row */}
          <div className="flex items-center gap-3">
            <UserAvatar user={user} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#F0F0F5] truncate">
                {user.displayName}
              </p>
              <p className="text-xs text-[#71717A]">
                @{user.username} · {timeAgo(receipt.createdAt)}
              </p>
            </div>
            <RealmBadge slug={task.realmSlug} size="sm" />
          </div>

          {/* Task title */}
          <p className="font-bold text-base text-[#F0F0F5] leading-snug">
            {task.title}
          </p>

          {/* Caption */}
          <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3">
            {receipt.caption}
          </p>
        </div>

        {/* ── Directional overlays ──────────────────────────────────── */}

        {/* LEFT — "Could do more 😏" */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl"
          style={{
            opacity: leftOverlayOpacity,
            background: `linear-gradient(135deg, ${REACTION_CONFIG["could-do-more"].color}CC 0%, ${REACTION_CONFIG["could-do-more"].color}66 100%)`,
          }}
        >
          <div className="flex flex-col items-center gap-2 -rotate-12">
            <span className="text-6xl">😏</span>
            <span className="rounded-xl bg-white/20 px-6 py-2 text-xl font-bold text-white backdrop-blur-sm">
              Could do more
            </span>
          </div>
        </motion.div>

        {/* RIGHT — "Let's gooo 🔥" */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl"
          style={{
            opacity: rightOverlayOpacity,
            background: `linear-gradient(135deg, ${REACTION_CONFIG["lets-gooo"].color}CC 0%, ${REACTION_CONFIG["lets-gooo"].color}66 100%)`,
          }}
        >
          <div className="flex flex-col items-center gap-2 rotate-12">
            <span className="text-6xl">🔥</span>
            <span className="rounded-xl bg-white/20 px-6 py-2 text-xl font-bold text-white backdrop-blur-sm">
              Let&apos;s gooo
            </span>
          </div>
        </motion.div>

        {/* UP — "I'm in 🚀" */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl"
          style={{
            opacity: upOverlayOpacity,
            background: `linear-gradient(135deg, ${REACTION_CONFIG["im-in"].color}CC 0%, ${REACTION_CONFIG["im-in"].color}66 100%)`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl">🚀</span>
            <span className="rounded-xl bg-white/20 px-6 py-2 text-xl font-bold text-white backdrop-blur-sm">
              I&apos;m in
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
