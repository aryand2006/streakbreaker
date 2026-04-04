"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface UsernameStepProps {
  username: string;
  onChangeUsername: (val: string) => void;
  onNext: () => void;
}

export function UsernameStep({ username, onChangeUsername, onNext }: UsernameStepProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setIsAvailable(false);
    if (username.length < 3) return;

    setIsChecking(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsChecking(false);
      setIsAvailable(true);
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [username]);

  const canProceed = username.length >= 3 && isAvailable;

  return (
    <div className="flex flex-1 flex-col px-6">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">
          Choose your handle
        </h2>
        <p className="text-sm text-muted-foreground">
          This is how others will find you.
        </p>
      </motion.div>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">
            @
          </span>
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) =>
              onChangeUsername(
                e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
              )
            }
            maxLength={20}
            placeholder="your-handle"
            className="w-full rounded-2xl border-2 border-border bg-card px-4 py-4 pl-10 text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:border-[#BFFF00] focus:outline-none focus:ring-0"
            style={
              isAvailable && username.length >= 3
                ? {
                    borderColor: "#BFFF00",
                    boxShadow: "0 0 20px rgba(191,255,0,0.15)",
                  }
                : undefined
            }
          />
          <AnimatePresence mode="wait">
            {username.length >= 3 && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {isChecking ? (
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-muted-foreground border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                ) : isAvailable ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#BFFF00]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7L5.5 10L11.5 4"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isAvailable && username.length >= 3 && (
            <motion.p
              className="mt-2 text-center text-sm font-medium text-[#BFFF00]"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Available!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative suggestions */}
      <motion.div
        className="mb-auto flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
      >
        {["chaos-agent", "vibe-breaker", "streak-ender", "pattern-killer"].map(
          (suggestion) => (
            <button
              key={suggestion}
              onClick={() => onChangeUsername(suggestion)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-[#BFFF00]/50 hover:text-foreground"
            >
              @{suggestion}
            </button>
          )
        )}
      </motion.div>

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
