"use client";

import { motion } from "motion/react";
import type { Task, User } from "@/lib/types";
import { REALM_MAP, VIBE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ReceiptPreviewProps {
  photoGradient: string;
  photoImage?: string | null;
  caption: string;
  task: Task | null;
  user: User | null;
}

export function ReceiptPreview({
  photoGradient,
  photoImage,
  caption,
  task,
  user,
}: ReceiptPreviewProps) {
  const realm = task ? REALM_MAP[task.realmSlug] : null;
  const vibe = task ? VIBE_CONFIG[task.vibe] : null;

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#71717A]">
        Preview
      </p>

      <motion.div
        className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141418]"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Gradient photo area */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {photoImage ? (
            <img src={photoImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div
              className="h-full w-full"
              style={{ background: photoGradient || "linear-gradient(135deg, #1a1a2e, #16213e)" }}
            />
          )}
          {/* Subtle shimmer on gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

          {/* Task name overlay at bottom of photo */}
          {task && realm && (
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{realm.emoji}</span>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: realm.accentHex }}
                >
                  {realm.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="space-y-2.5 p-3.5">
          {/* Task title */}
          {task && (
            <p className="text-sm font-semibold leading-snug text-[#F0F0F5]">
              {task.title}
            </p>
          )}

          {/* Caption */}
          <motion.p
            className={cn(
              "min-h-[1.25rem] text-[13px] leading-relaxed",
              caption ? "text-[#A1A1AA]" : "text-[#3F3F46] italic"
            )}
            layout
          >
            {caption || "Your caption will appear here..."}
          </motion.p>

          {/* Badges */}
          {task && vibe && (
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${vibe.color}1A`,
                  color: vibe.color,
                }}
              >
                <span>{vibe.emoji}</span>
                <span>{vibe.label}</span>
              </span>
            </div>
          )}

          {/* User info */}
          {user && (
            <div className="flex items-center gap-2 border-t border-white/[0.05] pt-2.5">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-[#F0F0F5]"
                style={{ background: user.avatarGradient }}
              >
                {user.displayName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-[#A1A1AA]">
                {user.displayName}
              </span>
              <span className="text-[10px] text-[#3F3F46]">just now</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
