"use client";

import { motion } from "motion/react";
import { AVATAR_GRADIENTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AvatarStepProps {
  username: string;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
}

export function AvatarStep({
  username,
  selectedIndex,
  onSelect,
  onNext,
}: AvatarStepProps) {
  const initial = username ? username.charAt(0).toUpperCase() : "A";
  const gradients = AVATAR_GRADIENTS.slice(0, 8);

  return (
    <div className="flex flex-1 flex-col px-6">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">
          Pick your look
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose a gradient avatar that represents you.
        </p>
      </motion.div>

      {/* Preview of selected */}
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black text-white"
          style={{
            background:
              selectedIndex !== null
                ? gradients[selectedIndex]
                : "linear-gradient(135deg, #333 0%, #555 100%)",
          }}
          animate={
            selectedIndex !== null
              ? {
                  boxShadow: [
                    "0 0 20px rgba(191,255,0,0.2)",
                    "0 0 40px rgba(191,255,0,0.4)",
                    "0 0 20px rgba(191,255,0,0.2)",
                  ],
                }
              : undefined
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          layout
        >
          {initial}
        </motion.div>
      </motion.div>

      {/* Grid of avatars */}
      <div className="mx-auto grid max-w-xs grid-cols-4 gap-4">
        {gradients.map((gradient, i) => {
          const isSelected = selectedIndex === i;

          return (
            <motion.button
              key={i}
              onClick={() => onSelect(i)}
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.06,
                type: "spring",
                damping: 15,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white",
                  isSelected && "ring-[3px] ring-[#BFFF00] ring-offset-2 ring-offset-background"
                )}
                style={{ background: gradient }}
                animate={
                  isSelected
                    ? {
                        boxShadow: [
                          "0 0 10px rgba(191,255,0,0.3)",
                          "0 0 25px rgba(191,255,0,0.5)",
                          "0 0 10px rgba(191,255,0,0.3)",
                        ],
                      }
                    : { boxShadow: "none" }
                }
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {initial}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex-1" />

      <motion.div
        className="mt-6 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedIndex !== null ? 1 : 0.3 }}
      >
        <button
          onClick={onNext}
          disabled={selectedIndex === null}
          className="w-full rounded-full py-3.5 text-lg font-bold text-black disabled:opacity-30"
          style={{
            background:
              selectedIndex !== null
                ? "linear-gradient(135deg, #BFFF00 0%, #00E5FF 100%)"
                : "linear-gradient(135deg, #555 0%, #333 100%)",
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
