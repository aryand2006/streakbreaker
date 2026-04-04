"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Badge as BadgeType } from "@/lib/types";

interface BadgeCardProps {
  badge: BadgeType;
  earned: boolean;
}

const RARITY_COLORS: Record<string, string> = {
  common: "#9CA3AF",
  rare: "#3B82F6",
  epic: "#A855F7",
  legendary: "#F59E0B",
};

const RARITY_LABELS: Record<string, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

export function BadgeCard({ badge, earned }: BadgeCardProps) {
  const rarityColor = RARITY_COLORS[badge.rarity];

  return (
    <motion.div
      className={cn(
        "relative flex flex-col gap-2 rounded-2xl border p-5",
        earned
          ? "bg-[#141418]"
          : "border-white/[0.06] bg-[#141418]/30"
      )}
      style={
        earned
          ? {
              borderColor: `${rarityColor}1A`,
            }
          : undefined
      }
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div className="relative">
          <span
            className={cn(
              "text-3xl",
              !earned && "grayscale opacity-40"
            )}
          >
            {badge.emoji}
          </span>
          {!earned && (
            <Lock className="absolute -bottom-1 -right-1 h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: `${rarityColor}1A`,
            color: rarityColor,
          }}
        >
          {RARITY_LABELS[badge.rarity]}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3
          className={cn(
            "text-sm font-semibold",
            !earned && "text-[#71717A]"
          )}
        >
          {badge.name}
        </h3>
        <p
          className={cn(
            "text-xs leading-relaxed",
            earned ? "text-[#A1A1AA]" : "text-[#71717A]/40"
          )}
        >
          {badge.description}
        </p>
      </div>

      {!earned && (
        <p className="mt-auto text-[11px] text-[#71717A] italic">
          {badge.unlockCriteria}
        </p>
      )}
    </motion.div>
  );
}
