"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getDailyRealm } from "@/lib/utils/realm-utils";
import { REALM_MAP } from "@/lib/constants";

interface RealmRevealStepProps {
  onFinish: () => void;
}

export function RealmRevealStep({ onFinish }: RealmRevealStepProps) {
  const [phase, setPhase] = useState(0);
  // phase 0: dark
  // phase 1: emoji appears (500ms)
  // phase 2: name appears letter by letter (1500ms)
  // phase 3: subtitle fades in (2500ms)
  // phase 4: CTA fades in (3000ms)

  const realmSlug = getDailyRealm();
  const realm = REALM_MAP[realmSlug];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const realmName = realm.name.toUpperCase();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      {/* Background glow */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: `radial-gradient(circle at 50% 45%, ${realm.accentHex}15 0%, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Emoji */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="mb-8 text-8xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 8,
              stiffness: 100,
              mass: 1.2,
            }}
          >
            <motion.div
              animate={{
                filter: [
                  `drop-shadow(0 0 20px ${realm.accentHex}66)`,
                  `drop-shadow(0 0 50px ${realm.accentHex}99)`,
                  `drop-shadow(0 0 20px ${realm.accentHex}66)`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="select-none">{realm.emoji}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realm name - letter by letter */}
      <div className="mb-4 flex h-12 items-center justify-center overflow-hidden">
        {phase >= 2 &&
          realmName.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="text-4xl font-black tracking-wider sm:text-5xl"
              style={{ color: realm.accentHex }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
      </div>

      {/* Subtitle */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.p
            className="mb-12 text-lg text-[#A1A1AA]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your first realm.
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.button
            onClick={onFinish}
            className="rounded-full px-10 py-3.5 text-lg font-bold text-black"
            style={{
              background: `linear-gradient(135deg, ${realm.accentHex} 0%, #BFFF00 100%)`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let&apos;s break some streaks.
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
