"use client";

import { motion } from "motion/react";

export function EmptyDeck() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Animated party emoji */}
      <motion.span
        className="text-7xl select-none"
        animate={{
          rotate: [0, -10, 10, -5, 5, 0],
          scale: [1, 1.1, 1.05, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
      >
        🎉
      </motion.span>

      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          You&apos;re all caught up
        </h2>
        <p className="max-w-[260px] text-sm text-muted-foreground leading-relaxed">
          Check back when your friends post more receipts
        </p>
      </div>

      {/* Floating emojis */}
      <div className="relative h-16 w-40">
        {["🎊", "✨", "🥳"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl select-none"
            style={{
              left: `${20 + i * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
