"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/stores/app-store";
import { getDemoState } from "@/lib/data/demo-state";
import type { Vibe, RealmSlug } from "@/lib/types";

import { IntroStep } from "@/components/streakbreaker/onboarding/intro-step";
import { VibeStep } from "@/components/streakbreaker/onboarding/vibe-step";
import { RealmsStep } from "@/components/streakbreaker/onboarding/realms-step";
import { UsernameStep } from "@/components/streakbreaker/onboarding/username-step";
import { AvatarStep } from "@/components/streakbreaker/onboarding/avatar-step";
import { GroupStep } from "@/components/streakbreaker/onboarding/group-step";
import { UniversityStep } from "@/components/streakbreaker/onboarding/university-step";
import { RealmRevealStep } from "@/components/streakbreaker/onboarding/realm-reveal-step";

const TOTAL_STEPS = 8;

// Slide transition variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const initializeStore = useAppStore((s) => s.initializeStore);
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  // Step management
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Onboarding state
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [selectedRealms, setSelectedRealms] = useState<RealmSlug[]>([]);
  const [username, setUsername] = useState("");
  const [avatarIndex, setAvatarIndex] = useState<number | null>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleRealmToggle = useCallback((slug: RealmSlug) => {
    setSelectedRealms((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
    );
  }, []);

  const handleFinish = useCallback(() => {
    // Initialize demo data
    const demo = getDemoState();
    initializeStore({
      users: demo.users,
      tasks: demo.tasks,
      receipts: demo.receipts,
      reactions: demo.reactions,
      notifications: demo.notifications,
      badges: demo.badges,
      duoPairings: demo.duos,
      chains: demo.chains,
      groups: demo.groups,
      currentUser: demo.currentUser,
      todayRealm: demo.todayRealmData,
      swipeDeck: demo.swipeDeck,
    });
    setOnboarded();
    router.push("/today");
  }, [initializeStore, setOnboarded, router]);

  // Is this the realm reveal step? (pure black background)
  const isRevealStep = step === 7;

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden transition-colors duration-700"
      style={{
        background: isRevealStep
          ? "#000000"
          : "linear-gradient(180deg, hsl(270 10% 6%) 0%, hsl(270 10% 4%) 100%)",
      }}
    >
      {/* Progress dots + back button */}
      <AnimatePresence>
        {!isRevealStep && (
          <motion.div
            className="relative z-20 flex items-center gap-3 px-6 pb-2 pt-14"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            {step > 0 ? (
              <button
                onClick={goBack}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#71717A] transition-colors hover:text-[#F0F0F5]"
                aria-label="Go back"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4L6 10L12 16" />
                </svg>
              </button>
            ) : (
              <div className="h-8 w-8" />
            )}

            {/* Dots */}
            <div className="flex flex-1 items-center justify-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded-full"
                  animate={{
                    width: i === step ? 24 : 8,
                    backgroundColor:
                      i === step
                        ? "#BFFF00"
                        : i < step
                          ? "rgba(191,255,0,0.4)"
                          : "#1E1E24",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Spacer for alignment */}
            <div className="h-8 w-8" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content with AnimatePresence */}
      <div className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex flex-1 flex-col"
          >
            {step === 0 && <IntroStep onNext={goNext} />}
            {step === 1 && (
              <VibeStep
                selectedVibe={selectedVibe}
                onSelect={setSelectedVibe}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <RealmsStep
                selectedRealms={selectedRealms}
                onToggle={handleRealmToggle}
                onNext={goNext}
              />
            )}
            {step === 3 && (
              <UsernameStep
                username={username}
                onChangeUsername={setUsername}
                onNext={goNext}
              />
            )}
            {step === 4 && (
              <AvatarStep
                username={username}
                selectedIndex={avatarIndex}
                onSelect={setAvatarIndex}
                onNext={goNext}
              />
            )}
            {step === 5 && <GroupStep onNext={goNext} />}
            {step === 6 && <UniversityStep onNext={goNext} />}
            {step === 7 && <RealmRevealStep onFinish={handleFinish} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Safe area bottom padding */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
