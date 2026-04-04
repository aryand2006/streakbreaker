"use client";

import { motion } from "motion/react";
import { useAppStore } from "@/stores/app-store";
import { AnimatedCounter } from "@/components/streakbreaker/shared/animated-counter";
import { cn } from "@/lib/utils";

interface StatItemProps {
  emoji: string;
  label: string;
  value: number;
  index: number;
}

function StatItem({ emoji, label, value, index }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "flex shrink-0 flex-col items-center gap-1 rounded-2xl px-4 py-4",
        "bg-[#141418]",
        "border border-white/[0.06]"
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{emoji}</span>
        <AnimatedCounter value={value} className="text-xl font-bold text-[#F0F0F5]" />
      </div>
      <span className="text-[11px] font-medium uppercase tracking-wider text-[#71717A]">
        {label}
      </span>
    </motion.div>
  );
}

export function StatsBar() {
  const currentUser = useAppStore((s) => s.currentUser);

  if (!currentUser) return null;

  const stats = [
    { emoji: "\uD83D\uDD25", label: "Run", value: currentUser.stats.currentRun },
    { emoji: "\u2705", label: "Tasks", value: currentUser.stats.tasksCompleted },
    { emoji: "\uD83D\uDCC8", label: "Influence", value: currentUser.stats.influenceScore },
    { emoji: "\uD83C\uDFB2", label: "Rerolls", value: currentUser.rerolls },
  ];

  return (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide">
      <div className="flex gap-3">
        {stats.map((stat, i) => (
          <StatItem
            key={stat.label}
            emoji={stat.emoji}
            label={stat.label}
            value={stat.value}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
