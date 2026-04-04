"use client";

import { motion } from "motion/react";
import type { Realm } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RealmCardProps {
  realm: Realm;
}

export function RealmCard({ realm }: RealmCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl"
      style={{
        border: `1px solid ${realm.accentHex}1A`,
      }}
    >
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${realm.accentHex}0D 0%, transparent 70%)`,
        }}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center p-8 text-center",
          `bg-gradient-to-b ${realm.bgGradient}`
        )}
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: realm.accentHex }}
        >
          {realm.tagline}
        </motion.p>

        {/* Animated emoji */}
        <motion.span
          className="mb-4 text-6xl"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {realm.emoji}
        </motion.span>

        {/* Realm name */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-2 text-3xl font-bold tracking-tight text-[#F0F0F5]"
        >
          {realm.name}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="max-w-xs text-sm font-medium leading-relaxed text-[#71717A]"
        >
          {realm.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
