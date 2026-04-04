"use client";

import { motion } from "motion/react";
import type { Vibe } from "@/lib/types";
import { VIBE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface VibeStepProps {
  selectedVibe: Vibe | null;
  onSelect: (vibe: Vibe) => void;
  onNext: () => void;
}

const VIBE_DESCRIPTIONS: Record<Vibe, string> = {
  Mild: "Gentle nudges. Low stakes. Still counts.",
  Bold: "Noticeable moves. Some risk. Good stories.",
  Unhinged: "Full send. No regrets. Maximum chaos.",
};

export function VibeStep({ selectedVibe, onSelect, onNext }: VibeStepProps) {
  const vibes: Vibe[] = ["Mild", "Bold", "Unhinged"];

  return (
    <div className="flex flex-1 flex-col px-6">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">
          What&apos;s your vibe?
        </h2>
        <p className="text-sm text-[#71717A]">
          This sets the intensity of your challenges.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col gap-4">
        {vibes.map((vibe, i) => {
          const config = VIBE_CONFIG[vibe];
          const isSelected = selectedVibe === vibe;

          return (
            <motion.button
              key={vibe}
              onClick={() => onSelect(vibe)}
              className={cn(
                "relative flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-colors",
                isSelected
                  ? "bg-[#141418]"
                  : "border-white/[0.06] bg-[#141418] hover:border-white/[0.1]"
              )}
              style={
                isSelected
                  ? {
                      borderColor: `${config.color}1A`,
                    }
                  : undefined
              }
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-4xl">{config.emoji}</span>
              <div className="flex-1">
                <p className="text-lg font-bold" style={{ color: config.color }}>
                  {vibe}
                </p>
                <p className="text-sm text-[#71717A]">
                  {VIBE_DESCRIPTIONS[vibe]}
                </p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: config.color }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-black"
                  >
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="mt-6 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedVibe ? 1 : 0.3 }}
      >
        <button
          onClick={onNext}
          disabled={!selectedVibe}
          className="w-full rounded-full py-3.5 text-lg font-bold text-black disabled:opacity-30"
          style={{
            background: selectedVibe
              ? `linear-gradient(135deg, ${VIBE_CONFIG[selectedVibe].color} 0%, #BFFF00 100%)`
              : "linear-gradient(135deg, #555 0%, #333 100%)",
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
