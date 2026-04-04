"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "@/stores/app-store";
import { TASKS } from "@/lib/data/tasks";
import { TaskReveal } from "@/components/streakbreaker/lucky/task-reveal";
import { PageHeader } from "@/components/layout/page-header";
import type { Task } from "@/lib/types";

function pickRandomTask(realmSlug: string, excludeId?: string): Task | null {
  const pool = TASKS.filter(
    (t) => t.realmSlug === realmSlug && t.id !== excludeId
  );
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function LuckyPage() {
  const router = useRouter();
  const todayRealm = useAppStore((s) => s.todayRealm);
  const currentUser = useAppStore((s) => s.currentUser);
  const setTodayTask = useAppStore((s) => s.setTodayTask);
  const useReroll = useAppStore((s) => s.useReroll);

  const rerollsLeft = currentUser?.rerolls ?? 0;

  const initialTask = useMemo(() => {
    if (!todayRealm) return null;
    return pickRandomTask(todayRealm.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayRealm?.slug]);

  const [currentTask, setCurrentTask] = useState<Task | null>(initialTask);
  const [revealKey, setRevealKey] = useState(0);

  const handleAccept = useCallback(() => {
    if (!currentTask) return;
    setTodayTask(currentTask, "lucky");
    router.push("/today");
  }, [currentTask, setTodayTask, router]);

  const handleReroll = useCallback(() => {
    if (!todayRealm || !currentTask) return;
    const success = useReroll();
    if (!success) return;

    const newTask = pickRandomTask(todayRealm.slug, currentTask.id);
    if (newTask) {
      setCurrentTask(newTask);
      setRevealKey((k) => k + 1);
    }
  }, [todayRealm, currentTask, useReroll]);

  // Loading state
  if (!todayRealm) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHeader title="Feeling Lucky" showBack />
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
            <p className="text-sm text-[#71717A]">Choosing your realm...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // No tasks available (shouldn't happen, but safety)
  if (!currentTask) {
    return (
      <div className="flex min-h-screen flex-col">
        <PageHeader title="Feeling Lucky" showBack />
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            className="flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-5xl">🎲</span>
            <p className="text-sm text-[#A1A1AA]">
              No tasks available for this realm right now.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title="Feeling Lucky" showBack />

      <AnimatePresence mode="wait">
        <motion.div
          key={revealKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="flex-1"
        >
          <TaskReveal
            task={currentTask}
            realm={todayRealm}
            onAccept={handleAccept}
            onReroll={handleReroll}
            canReroll={rerollsLeft > 0}
            rerollsLeft={rerollsLeft}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
