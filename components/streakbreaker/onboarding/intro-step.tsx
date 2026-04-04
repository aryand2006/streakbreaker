"use client";

import { motion } from "motion/react";

interface IntroStepProps {
  onNext: () => void;
}

export function IntroStep({ onNext }: IntroStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      {/* Animated dice emoji with glow */}
      <motion.div
        className="mb-8 text-7xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 150, delay: 0.2 }}
      >
        <motion.div
          animate={{
            filter: [
              "drop-shadow(0 0 20px rgba(191,255,0,0.4))",
              "drop-shadow(0 0 40px rgba(191,255,0,0.7))",
              "drop-shadow(0 0 20px rgba(191,255,0,0.4))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="select-none">🎲</span>
        </motion.div>
      </motion.div>

      {/* Animated gradient title */}
      <motion.h1
        className="mb-4 text-5xl font-extrabold tracking-tighter sm:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #BFFF00 0%, #00E5FF 40%, #A855F7 70%, #FF3366 100%)",
            backgroundSize: "200% 200%",
            animation: "gradientShift 4s ease infinite",
          }}
        >
          STREAKBREAKER
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="mb-2 text-xl font-semibold text-[#F0F0F5]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Break the streak of sameness.
      </motion.p>

      {/* Subtitle */}
      <motion.p
        className="mb-12 max-w-xs text-sm text-[#71717A]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        A social game that pushes you out of your patterns.
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={onNext}
        className="rounded-full px-10 py-3.5 text-lg font-bold text-black"
        style={{
          background: "linear-gradient(135deg, #BFFF00 0%, #00E5FF 100%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring", damping: 15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Let&apos;s go
      </motion.button>

      {/* CSS animation for gradient shift */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
