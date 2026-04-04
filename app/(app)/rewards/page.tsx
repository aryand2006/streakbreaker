"use client";

import { motion } from "motion/react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { BadgeCard } from "@/components/streakbreaker/rewards/badge-card";
import { ProgressRing } from "@/components/streakbreaker/rewards/progress-ring";

const MILESTONES = [
  { label: "Complete 10 tasks", threshold: 10, key: "tasks10" },
  { label: "Reach a 7-day run", threshold: 7, key: "run7" },
  { label: "Get 5 I'm in reactions", threshold: 5, key: "imin5" },
  { label: "Explore all 8 realms", threshold: 8, key: "realms8" },
  { label: "Complete 25 tasks", threshold: 25, key: "tasks25" },
  { label: "Win 3 duo pairings", threshold: 3, key: "duo3" },
  { label: "Reach 100 influence", threshold: 100, key: "inf100" },
  { label: "Complete 50 tasks", threshold: 50, key: "tasks50" },
];

export default function RewardsPage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const badges = useAppStore((s) => s.badges);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const { stats } = currentUser;
  const taskProgress = Math.min(100, Math.round((stats.tasksCompleted / 100) * 100));
  const influenceProgress = Math.min(100, Math.round((stats.influenceScore / 500) * 100));

  const earned = badges.filter((b) => currentUser.badgeIds.includes(b.id));
  const locked = badges.filter((b) => !currentUser.badgeIds.includes(b.id));
  const orderedBadges = [...earned, ...locked];

  function isMilestoneComplete(key: string): boolean {
    switch (key) {
      case "tasks10":
        return stats.tasksCompleted >= 10;
      case "run7":
        return stats.longestRun >= 7;
      case "imin5":
        return stats.imInCount >= 5;
      case "realms8":
        return stats.realmsExplored >= 8;
      case "tasks25":
        return stats.tasksCompleted >= 25;
      case "duo3":
        return stats.duoWins >= 3;
      case "inf100":
        return stats.influenceScore >= 100;
      case "tasks50":
        return stats.tasksCompleted >= 50;
      default:
        return false;
    }
  }

  return (
    <div className="flex flex-col pb-24">
      <PageHeader title="Rewards & Progress" showBack />

      {/* Progress rings */}
      <motion.div
        className="flex items-center justify-center gap-8 px-4 pt-6 pb-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <ProgressRing
          progress={taskProgress}
          color="#BFFF00"
          size={120}
          label="Task Progress"
        />
        <ProgressRing
          progress={influenceProgress}
          color="#A855F7"
          size={120}
          label="Influence"
        />
      </motion.div>

      {/* Badges */}
      <motion.div
        className="mt-6 px-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className="mb-3 text-base font-semibold">Your Badges</h2>
        <div className="grid grid-cols-2 gap-3">
          {orderedBadges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.04,
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <BadgeCard
                badge={badge}
                earned={currentUser.badgeIds.includes(badge.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        className="mt-8 px-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <h2 className="mb-3 text-base font-semibold">Milestones</h2>
        <div className="flex flex-col gap-2">
          {MILESTONES.map((milestone, i) => {
            const done = isMilestoneComplete(milestone.key);
            return (
              <motion.div
                key={milestone.key}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3",
                  done ? "bg-card" : "bg-card/30"
                )}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.55 + i * 0.04,
                  duration: 0.3,
                }}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    done
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-muted text-muted-foreground/40"
                  )}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                </div>

                <span
                  className={cn(
                    "text-sm",
                    done
                      ? "font-medium text-foreground"
                      : "text-muted-foreground/60"
                  )}
                >
                  {milestone.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
