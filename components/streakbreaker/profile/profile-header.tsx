"use client";

import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { VIBE_CONFIG } from "@/lib/constants";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const vibe = VIBE_CONFIG[user.vibeChoice];

  return (
    <motion.div
      className="flex flex-col items-center gap-3 px-4 pt-6 pb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <UserAvatar user={user} size="xl" />
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        <motion.h1
          className="text-2xl font-bold tracking-tight text-[#F0F0F5]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {user.displayName}
        </motion.h1>

        <motion.p
          className="text-sm text-[#71717A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          @{user.username}
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-1.5 rounded-full bg-[#141418] px-3 py-1 text-sm text-[#71717A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <span>{user.university}</span>
          {user.isVerified && (
            <BadgeCheck className="h-4 w-4 text-blue-400" />
          )}
        </motion.div>
      </div>

      {user.bio && (
        <motion.p
          className="max-w-xs text-center text-sm text-[#A1A1AA]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {user.bio}
        </motion.p>
      )}

      <motion.div
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
        style={{
          backgroundColor: `${vibe.color}1A`,
          color: vibe.color,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      >
        <span>{vibe.emoji}</span>
        <span>{vibe.label} Vibe</span>
      </motion.div>
    </motion.div>
  );
}
