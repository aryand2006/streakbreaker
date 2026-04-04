"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { FriendGroup } from "@/lib/types";
import { PulseDot } from "@/components/streakbreaker/shared/pulse-dot";

interface PodHeaderProps {
  group: FriendGroup;
  memberCount: number;
}

export function PodHeader({ group, memberCount }: PodHeaderProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-card p-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

      <div className="relative flex items-center gap-3">
        <span className="text-3xl">{group.emoji}</span>
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-bold">{group.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{memberCount} members</span>
            <span className="text-muted-foreground/30">&#x2022;</span>
            <span className="flex items-center gap-1.5">
              <PulseDot color="#4ADE80" size="sm" />
              Active now
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
