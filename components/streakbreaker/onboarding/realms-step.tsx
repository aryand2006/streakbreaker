"use client";

import { motion } from "motion/react";
import { REALMS } from "@/lib/constants";
import type { RealmSlug } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RealmsStepProps {
  selectedRealms: RealmSlug[];
  onToggle: (slug: RealmSlug) => void;
  onNext: () => void;
}

export function RealmsStep({ selectedRealms, onToggle, onNext }: RealmsStepProps) {
  const canProceed = selectedRealms.length >= 3;

  return (
    <div className="flex flex-1 flex-col px-6">
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">
          Pick your favorite realms
        </h2>
        <p className="text-sm text-[#71717A]">
          Choose at least 3 &mdash;{" "}
          <span
            className={cn(
              "font-semibold",
              canProceed ? "text-[#BFFF00]" : "text-[#71717A]"
            )}
          >
            {selectedRealms.length} selected
          </span>
        </p>
      </motion.div>

      <div className="grid flex-1 grid-cols-2 gap-3">
        {REALMS.map((realm, i) => {
          const isSelected = selectedRealms.includes(realm.slug);

          return (
            <motion.button
              key={realm.slug}
              onClick={() => onToggle(realm.slug)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-center transition-colors",
                isSelected
                  ? "bg-[#141418]"
                  : "border-white/[0.06] bg-[#141418] hover:border-white/[0.1]"
              )}
              style={
                isSelected
                  ? {
                      borderColor: `${realm.accentHex}1A`,
                    }
                  : undefined
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl">{realm.emoji}</span>
              <p className="text-sm font-bold" style={isSelected ? { color: realm.accentHex } : undefined}>
                {realm.name}
              </p>
              <p className="line-clamp-2 text-[11px] leading-tight text-[#71717A]">
                {realm.tagline}
              </p>
              {isSelected && (
                <motion.div
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: realm.accentHex }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="black"
                      strokeWidth="2.5"
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
        animate={{ opacity: canProceed ? 1 : 0.3 }}
      >
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full rounded-full py-3.5 text-lg font-bold text-black disabled:opacity-30"
          style={{
            background: canProceed
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
