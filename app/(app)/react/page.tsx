"use client";

import { motion } from "motion/react";
import { useAppStore } from "@/stores/app-store";
import { SwipeDeck } from "@/components/streakbreaker/reactions/swipe-deck";
import { EmptyDeck } from "@/components/streakbreaker/reactions/empty-deck";
import { REACTION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ReactPage() {
  const swipeDeck = useAppStore((s) => s.swipeDeck);
  const users = useAppStore((s) => s.users);
  const tasks = useAppStore((s) => s.tasks);

  const hasCards = swipeDeck.length > 0;

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Page header */}
      <motion.div
        className="flex items-center justify-between px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-extrabold text-[#F0F0F5]">React</h1>
        {hasCards && (
          <span className="text-sm text-[#71717A]">
            {swipeDeck.length} receipt{swipeDeck.length !== 1 ? "s" : ""} left
          </span>
        )}
      </motion.div>

      {/* Deck or empty state */}
      {hasCards ? (
        <SwipeDeck deck={swipeDeck} users={users} tasks={tasks} />
      ) : (
        <EmptyDeck />
      )}

      {/* Swipe direction hints */}
      {hasCards && (
        <motion.div
          className="flex items-center justify-center gap-3 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {(
            [
              { type: "could-do-more" as const, arrow: "←" },
              { type: "im-in" as const, arrow: "↑" },
              { type: "lets-gooo" as const, arrow: "→" },
            ] as const
          ).map(({ type, arrow }) => {
            const config = REACTION_CONFIG[type];
            return (
              <div
                key={type}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  "text-xs font-medium"
                )}
                style={{
                  backgroundColor: `${config.color}1A`,
                  color: config.color,
                }}
              >
                <span className="text-sm">{arrow}</span>
                <span>{config.emoji}</span>
                <span>{config.label}</span>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
