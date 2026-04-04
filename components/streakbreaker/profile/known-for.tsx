"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { REALMS } from "@/lib/constants";

interface KnownForProps {
  knownFor: string[];
}

export function KnownFor({ knownFor }: KnownForProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4">
      {knownFor.map((tag, i) => {
        const accent = REALMS[i % REALMS.length].accentHex;

        return (
          <motion.span
            key={tag}
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: `${accent}1A`,
              color: accent,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.05 + i * 0.06,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {tag}
          </motion.span>
        );
      })}
    </div>
  );
}
