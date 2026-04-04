"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Badge as BadgeType } from "@/lib/types";

interface BadgeShowcaseProps {
  badgeIds: string[];
  allBadges: BadgeType[];
}

const RARITY_COLORS: Record<string, string> = {
  common: "#9CA3AF",
  rare: "#3B82F6",
  epic: "#A855F7",
  legendary: "#F59E0B",
};

export function BadgeShowcase({ badgeIds, allBadges }: BadgeShowcaseProps) {
  const earned = allBadges.filter((b) => badgeIds.includes(b.id));
  const locked = allBadges.filter((b) => !badgeIds.includes(b.id));
  const ordered = [...earned, ...locked];

  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
      {ordered.map((badge, i) => {
        const isEarned = badgeIds.includes(badge.id);
        const rarityColor = RARITY_COLORS[badge.rarity];

        return (
          <motion.div
            key={badge.id}
            className={cn(
              "relative flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3",
              "min-w-[100px]",
              isEarned
                ? "bg-[#141418]"
                : "opacity-50 bg-[#141418]/30"
            )}
            style={
              isEarned
                ? {
                    borderColor: `${rarityColor}1A`,
                  }
                : { borderColor: 'rgba(255,255,255,0.06)' }
            }
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.05 * i,
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="relative">
              <span
                className={cn(
                  "text-2xl",
                  !isEarned && "grayscale"
                )}
              >
                {badge.emoji}
              </span>
              {!isEarned && (
                <Lock className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>

            <span
              className={cn(
                "text-center text-xs font-medium leading-tight",
                !isEarned && "text-[#71717A]"
              )}
            >
              {badge.name}
            </span>

            <div
              className="h-1 w-6 rounded-full"
              style={{
                backgroundColor: isEarned ? rarityColor : `${rarityColor}30`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
