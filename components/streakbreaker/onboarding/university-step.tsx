"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface UniversityStepProps {
  onNext: () => void;
}

export function UniversityStep({ onNext }: UniversityStepProps) {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isValidEdu = email.endsWith(".edu");

  const handleVerify = () => {
    if (!isValidEdu) return;
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 2000);
    }, 800);
  };

  return (
    <div className="relative flex flex-1 flex-col px-6">
      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background: [
                    "#BFFF00",
                    "#00E5FF",
                    "#A855F7",
                    "#FF3366",
                    "#FF8C42",
                    "#FF6B8A",
                  ][i % 6],
                  left: `${Math.random() * 100}%`,
                  top: "-5%",
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: [0, 600 + Math.random() * 200],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720,
                  x: (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: Math.random() * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">
          Verify your campus
        </h2>
        <p className="text-sm text-muted-foreground">
          Get a verified badge and unlock campus-only challenges.
        </p>
      </motion.div>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              if (!isVerified) setEmail(e.target.value);
            }}
            placeholder="you@university.edu"
            disabled={isVerified}
            className="w-full rounded-2xl border-2 border-border bg-card px-4 py-4 text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:border-[#4ADE80] focus:outline-none focus:ring-0 disabled:opacity-50"
            style={
              isVerified
                ? {
                    borderColor: "#4ADE80",
                    boxShadow: "0 0 20px rgba(74,222,128,0.2)",
                  }
                : undefined
            }
          />
          {!isValidEdu && email.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Use your .edu email address
            </p>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isVerified ? (
          <motion.div
            key="verified"
            className="mb-auto flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
          >
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4ADE80]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, delay: 0.1 }}
            >
              <svg width="32" height="32" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7L5.5 10L11.5 4"
                  stroke="black"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#4ADE80]">
                Verified
              </span>
              <span className="text-lg">🎓</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Campus challenges unlocked!
            </p>
          </motion.div>
        ) : (
          <motion.div key="button" className="mb-auto">
            <button
              onClick={handleVerify}
              disabled={!isValidEdu || isVerifying}
              className="w-full rounded-2xl border-2 border-border bg-card py-3.5 text-base font-bold text-foreground transition-colors disabled:opacity-30"
              style={
                isValidEdu
                  ? {
                      borderColor: "#4ADE80",
                      color: "#4ADE80",
                    }
                  : undefined
              }
            >
              {isVerifying ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Verifying...
                </motion.span>
              ) : (
                "Send verification"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-6 flex flex-col gap-3 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={onNext}
          className="w-full rounded-full py-3.5 text-lg font-bold text-black"
          style={{
            background: "linear-gradient(135deg, #BFFF00 0%, #00E5FF 100%)",
          }}
        >
          Continue
        </button>
        {!isVerified && (
          <button
            onClick={onNext}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip for now
          </button>
        )}
      </motion.div>
    </div>
  );
}
