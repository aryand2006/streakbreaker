"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { UserStats } from "@/lib/types";
import { AnimatedCounter } from "@/components/streakbreaker/shared/animated-counter";

interface StatsGridProps {
  stats: UserStats;
}

const STAT_CARDS: {
  key: keyof UserStats;
  label: string;
  icon: string;
  suffix?: string;
}[] = [
  { key: "currentRun", label: "Current Run", icon: "🔥", suffix: "d" },
  { key: "tasksCompleted", label: "Tasks Completed", icon: "✅" },
  { key: "influenceScore", label: "Influence", icon: "💎" },
  { key: "realmsExplored", label: "Realms Explored", icon: "🗺️" },
  { key: "friendCount", label: "Friends", icon: "👥" },
  { key: "duoWins", label: "Duo Wins", icon: "🤝" },
];

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {STAT_CARDS.map((card, i) => (
        <motion.div
          key={card.key}
          className="flex flex-col items-center gap-1 rounded-2xl bg-[#141418] p-5"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.1 + i * 0.06,
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <span className="text-xl">{card.icon}</span>
          <AnimatedCounter
            value={stats[card.key]}
            suffix={card.suffix}
            className="text-2xl font-extrabold text-[#F0F0F5] tabular-nums"
          />
          <span className="text-[11px] text-[#71717A] font-medium uppercase tracking-wider">{card.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
