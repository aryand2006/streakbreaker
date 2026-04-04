"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { REALMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ---------- animated counter ---------- */
function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, target, { duration, ease: "easeOut" });
    return controls.stop;
  }, [isInView, motionVal, target, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ---------- floating emojis ---------- */
const FLOAT_EMOJIS = REALMS.map((r) => r.emoji);

function FloatingEmojis() {
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      emoji: FLOAT_EMOJIS[i % FLOAT_EMOJIS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 10,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none opacity-[0.07]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 20, -20, 10, 0],
            rotate: [0, 15, -15, 5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- step card ---------- */
const STEPS = [
  {
    emoji: "🌀",
    title: "Get Your Realm",
    desc: "Each day, you're assigned a vibe category",
    color: "#A855F7",
  },
  {
    emoji: "🎯",
    title: "Choose Your Task",
    desc: "Go random, pick your own, or let a friend decide",
    color: "#BFFF00",
  },
  {
    emoji: "📸",
    title: "Upload Your Receipt",
    desc: "Prove you did it. Photo or text.",
    color: "#00E5FF",
  },
  {
    emoji: "🔥",
    title: "React & Spread",
    desc: "Swipe on friends. Copy their moves. Start trends.",
    color: "#FF3366",
  },
];

/* ---------- stat items ---------- */
const STATS = [
  { label: "tasks completed today", value: 2847 },
  { label: "active campuses", value: 12 },
  { label: "users", value: 4200, prefix: "", suffix: "+" },
];

/* ---------- main page ---------- */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <FloatingEmojis />

        {/* gradient orb */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#BFFF00]/10 via-[#A855F7]/10 to-[#FF3366]/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          <h1
            className="text-6xl font-extrabold tracking-tight sm:text-8xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-[#BFFF00] via-[#00E5FF] to-[#A855F7] animate-gradient-x"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            STREAKBREAKER
          </h1>

          <motion.p
            className="max-w-md text-lg text-[#71717A] font-medium sm:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Break the streak of sameness.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              href="/onboarding"
              className="relative inline-flex h-14 items-center justify-center rounded-full bg-[#BFFF00] px-10 text-sm font-bold text-black transition-all hover:brightness-110 hover:scale-105 active:scale-95"
            >
              Enter Demo
            </Link>
            <Link
              href="/today"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/[0.06] px-10 text-sm font-semibold text-[#F0F0F5] transition-all hover:border-white/[0.12] hover:bg-white/5 active:scale-95"
            >
              Skip to App
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-10 w-6 rounded-full border-2 border-white/[0.06] flex items-start justify-center pt-2">
            <div className="h-2 w-1 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeading>How it works</SectionHeading>

          <div className="mt-16 grid grid-cols-1 gap-0 sm:grid-cols-4 sm:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* connector line (not on first) */}
                {i > 0 && (
                  <div className="hidden sm:block absolute -left-2 top-8 h-px w-4 bg-gradient-to-r from-white/10 to-white/5" />
                )}

                {/* mobile connector */}
                {i > 0 && (
                  <div className="sm:hidden mx-auto mb-4 h-8 w-px bg-gradient-to-b from-white/[0.06] to-transparent" />
                )}

                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
                  style={{
                    background: `${step.color}1A`,
                    border: `1px solid ${step.color}1A`,
                  }}
                >
                  {step.emoji}
                </div>

                <span
                  className="mt-2 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: step.color }}
                >
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-base font-bold text-[#F0F0F5]">{step.title}</h3>
                <p className="mt-1 text-sm text-[#71717A] font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="relative py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#BFFF00]/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-4xl font-extrabold tabular-nums text-[#F0F0F5] sm:text-5xl">
                  {stat.prefix ?? ""}
                  <AnimatedCounter target={stat.value} />
                  {stat.suffix ?? ""}
                </span>
                <span className="mt-2 text-sm text-[#71717A] font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REALM PREVIEW ── */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeading>8 Realms of Chaos</SectionHeading>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-4">
            {REALMS.map((realm, i) => (
              <motion.div
                key={realm.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                }}
                className="group relative flex flex-col items-center gap-3 rounded-2xl bg-[#141418] p-6 transition-colors"
                style={{
                  border: `1px solid ${realm.accentHex}1A`,
                }}
              >
                <span className="text-3xl">{realm.emoji}</span>
                <span className="text-sm font-bold" style={{ color: realm.accentHex }}>
                  {realm.name}
                </span>
                <span className="text-[11px] text-[#71717A] font-medium text-center leading-tight">
                  {realm.tagline}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-20 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-semibold text-[#71717A]"
          >
            Built for the curious. Played by the unhinged.
          </motion.p>
          <p className="mt-4 text-xs text-[#71717A]/50">
            Streakbreaker &mdash; a social anti-routine game
          </p>
        </div>
      </footer>

      {/* Gradient keyframes */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- section heading ---------- */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="text-center text-2xl font-extrabold tracking-tight text-[#F0F0F5] sm:text-3xl"
    >
      {children}
    </motion.h2>
  );
}
