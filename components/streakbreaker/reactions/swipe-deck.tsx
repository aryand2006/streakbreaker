"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/stores/app-store";
import { SwipeCard } from "./swipe-card";
import { REACTION_CONFIG } from "@/lib/constants";
import type { Receipt, User, Task, ReactionType } from "@/lib/types";

interface SwipeDeckProps {
  deck: Receipt[];
  users: User[];
  tasks: Task[];
}

/** Card stack variants that respond to swipe direction via `custom` */
const EXIT_TRANSITION = { duration: 0.4, ease: "easeIn" as const };

const cardVariants = {
  initial: { scale: 0.9, y: 20, opacity: 0 },
  exit: (direction: ReactionType | null) => {
    switch (direction) {
      case "lets-gooo":
        return { x: 1000, rotate: 30, opacity: 0, transition: EXIT_TRANSITION };
      case "could-do-more":
        return { x: -1000, rotate: -30, opacity: 0, transition: EXIT_TRANSITION };
      case "im-in":
        return { y: -1000, opacity: 0, transition: EXIT_TRANSITION };
      default:
        return { scale: 0.95, opacity: 0, transition: { duration: 0.3 } };
    }
  },
};

export function SwipeDeck({ deck, users, tasks }: SwipeDeckProps) {
  const swipeReaction = useAppStore((s) => s.swipeReaction);
  const cloneTask = useAppStore((s) => s.cloneTask);

  const [celebration, setCelebration] = useState<{
    emoji: string;
    label: string;
    color: string;
  } | null>(null);

  // Track the last swipe direction so we can pass it to the exit animation
  const [lastSwipeDirection, setLastSwipeDirection] = useState<ReactionType | null>(null);

  const getUserForReceipt = useCallback(
    (receipt: Receipt) => users.find((u) => u.id === receipt.userId),
    [users]
  );

  const getTaskForReceipt = useCallback(
    (receipt: Receipt) => tasks.find((t) => t.id === receipt.taskId),
    [tasks]
  );

  const handleSwipe = useCallback(
    (receiptId: string, direction: ReactionType) => {
      setLastSwipeDirection(direction);
      swipeReaction(receiptId, direction);

      if (direction === "im-in") {
        cloneTask(receiptId);
      }

      // Show celebration
      const config = REACTION_CONFIG[direction];
      setCelebration({ emoji: config.emoji, label: config.label, color: config.color });
      setTimeout(() => setCelebration(null), 1200);
    },
    [swipeReaction, cloneTask]
  );

  // Show at most 3 cards
  const visibleCards = deck.slice(0, 3);

  return (
    <div className="relative w-full" style={{ height: "70vh" }}>
      {/* Card stack */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="popLayout" custom={lastSwipeDirection}>
          {visibleCards.map((receipt, index) => {
            const user = getUserForReceipt(receipt);
            const task = getTaskForReceipt(receipt);
            if (!user || !task) return null;

            const isTop = index === 0;

            return (
              <motion.div
                key={receipt.id}
                className="absolute inset-0"
                style={{
                  zIndex: visibleCards.length - index,
                }}
                custom={lastSwipeDirection}
                variants={cardVariants}
                initial="initial"
                animate={{
                  scale: 1 - index * 0.05,
                  y: index * 10,
                  opacity: 1 - index * 0.15,
                }}
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <SwipeCard
                  receipt={receipt}
                  user={user}
                  task={task}
                  onSwipe={(direction) => handleSwipe(receipt.id, direction)}
                  isTop={isTop}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Celebration toast */}
      <AnimatePresence>
        {celebration && (
          <motion.div
            key="celebration"
            className="pointer-events-none absolute inset-x-0 top-1/3 flex justify-center"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 100 }}
          >
            <div
              className="flex items-center gap-2 rounded-full px-6 py-3 shadow-2xl backdrop-blur-md"
              style={{
                backgroundColor: `${celebration.color}33`,
                borderColor: celebration.color,
                borderWidth: 1,
              }}
            >
              <span className="text-3xl">{celebration.emoji}</span>
              <span
                className="text-lg font-bold"
                style={{ color: celebration.color }}
              >
                {celebration.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
