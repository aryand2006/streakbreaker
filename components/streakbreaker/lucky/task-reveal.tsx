"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, AlertTriangle, Shuffle, Check } from "lucide-react";
import type { Task, Realm } from "@/lib/types";
import { VIBE_CONFIG, SOCIAL_RISK_LABELS } from "@/lib/constants";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { cn } from "@/lib/utils";

interface TaskRevealProps {
  task: Task;
  realm: Realm;
  onAccept: () => void;
  onReroll: () => void;
  canReroll: boolean;
  rerollsLeft: number;
}

type RevealPhase = "realm-pulse" | "realm-name" | "card-reveal" | "ready";

const WITTY_LABELS = [
  "This one has chain potential",
  "Friend bait",
  "Low effort, high chaos",
  "Main character moment",
  "Plot twist material",
  "Your comfort zone won't know what hit it",
  "This is the one",
  "Certified unhinged pick",
  "Sleeper hit incoming",
  "The algorithm has spoken",
];

export function TaskReveal({
  task,
  realm,
  onAccept,
  onReroll,
  canReroll,
  rerollsLeft,
}: TaskRevealProps) {
  const [phase, setPhase] = useState<RevealPhase>("realm-pulse");
  const [typedName, setTypedName] = useState("");

  const wittyLabel = useMemo(
    () => WITTY_LABELS[Math.floor(Math.random() * WITTY_LABELS.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [task.id]
  );

  const vibe = VIBE_CONFIG[task.vibe];
  const riskLabel = SOCIAL_RISK_LABELS[task.socialRisk];

  // Animation sequence state machine
  useEffect(() => {
    setPhase("realm-pulse");
    setTypedName("");

    const t1 = setTimeout(() => setPhase("realm-name"), 800);
    const t2 = setTimeout(() => setPhase("card-reveal"), 1500);
    const t3 = setTimeout(() => setPhase("ready"), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [task.id]);

  // Typewriter effect for realm name
  useEffect(() => {
    if (phase !== "realm-name" && phase !== "card-reveal" && phase !== "ready")
      return;

    let index = 0;
    const name = realm.name;
    setTypedName("");

    const interval = setInterval(() => {
      index++;
      setTypedName(name.slice(0, index));
      if (index >= name.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === "realm-name"]);

  const showCard = phase === "card-reveal" || phase === "ready";

  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center px-4">
      {/* Background realm glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${realm.accentHex}44, transparent 70%)`,
        }}
        animate={{
          opacity: phase === "realm-pulse" ? [0.2, 0.4, 0.2] : 0.15,
        }}
        transition={{
          duration: 2,
          repeat: phase === "realm-pulse" ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Realm emoji */}
      <motion.div
        className="relative z-10 mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: showCard ? 0.8 : [1, 1.1, 1],
          opacity: 1,
          y: showCard ? -20 : 0,
        }}
        transition={{
          scale: {
            duration: showCard ? 0.4 : 1.5,
            repeat: showCard ? 0 : Infinity,
            ease: "easeInOut",
          },
          y: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      >
        <span className="text-7xl">{realm.emoji}</span>
        {/* Glow ring behind emoji */}
        <motion.div
          className="absolute -inset-4 -z-10 rounded-full"
          style={{
            background: `radial-gradient(circle, ${realm.accentHex}33, transparent 70%)`,
          }}
          animate={{
            scale: phase === "realm-pulse" ? [1, 1.3, 1] : 1,
            opacity: phase === "realm-pulse" ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{
            duration: 1.5,
            repeat: phase === "realm-pulse" ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Realm name (typewriter) */}
      <AnimatePresence>
        {(phase === "realm-name" || showCard) && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: showCard ? -16 : 0 }}
            className="relative z-10 mb-6 text-center text-lg font-semibold tracking-wide"
            style={{ color: realm.accentHex }}
          >
            {typedName}
            {typedName.length < realm.name.length && (
              <motion.span
                className="inline-block w-0.5 bg-current"
                style={{ height: "1.1em", verticalAlign: "text-bottom" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Task card */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 80, scale: 0.85, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 22,
            }}
          >
            {/* Witty label */}
            <motion.p
              className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-[#71717A]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {wittyLabel}
            </motion.p>

            {/* Card */}
            <div
              className="overflow-hidden rounded-2xl bg-[#141418]"
              style={{
                border: `1px solid ${realm.accentHex}1A`,
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${realm.accentHex}, ${realm.accentHex}66)`,
                }}
              />

              <div className="space-y-4 p-5">
                {/* Title */}
                <motion.h2
                  className="text-2xl font-bold leading-tight text-[#F0F0F5]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {task.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-sm leading-relaxed text-[#A1A1AA]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {task.description}
                </motion.p>

                {/* Badges row */}
                <motion.div
                  className="flex flex-wrap items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <RealmBadge slug={task.realmSlug} size="sm" />

                  {/* Vibe badge */}
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${vibe.color}1A`,
                      color: vibe.color,
                    }}
                  >
                    <span>{vibe.emoji}</span>
                    <span>{vibe.label}</span>
                  </span>

                  {/* Social risk */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-[#71717A]">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{riskLabel}</span>
                  </span>
                </motion.div>

                {/* Meta row */}
                <motion.div
                  className="flex items-center gap-4 text-xs text-[#71717A]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {task.timeEstimate}
                  </span>
                  <span className="text-[#71717A]/30">|</span>
                  <span>Proof: {task.proofSuggestion}</span>
                </motion.div>
              </div>
            </div>

            {/* Action buttons */}
            <motion.div
              className="mt-5 flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Accept button */}
              <motion.button
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-2xl h-14",
                  "bg-[#BFFF00] font-bold text-black"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={onAccept}
              >
                <Check className="h-4 w-4" />
                <span>Accept</span>
              </motion.button>

              {/* Reroll button */}
              <motion.button
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl border h-14 px-5 font-semibold transition-colors",
                  canReroll
                    ? "border-white/[0.06] text-[#F0F0F5] hover:border-white/[0.1] hover:bg-white/[0.04]"
                    : "cursor-not-allowed border-white/[0.06] text-[#71717A]/50"
                )}
                whileHover={canReroll ? { scale: 1.02 } : undefined}
                whileTap={canReroll ? { scale: 0.97 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={canReroll ? onReroll : undefined}
                disabled={!canReroll}
              >
                <Shuffle className="h-4 w-4" />
                <span>
                  {canReroll ? `Reroll (${rerollsLeft})` : "No rerolls left"}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
