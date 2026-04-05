"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Clock, AlertTriangle, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { GlowCard } from "@/components/streakbreaker/shared/glow-card";
import { REALMS, VIBE_CONFIG, SOCIAL_RISK_LABELS, REALM_MAP } from "@/lib/constants";
import { TASKS } from "@/lib/data/tasks";
import { cn } from "@/lib/utils";
import type { Vibe, RealmSlug, Task, Realm } from "@/lib/types";

const VIBE_TABS: Vibe[] = ["Mild", "Bold", "Unhinged"];

export default function RealmsPage() {
  const router = useRouter();
  const setTodayTask = useAppStore((s) => s.setTodayTask);
  const savedTasks = useAppStore((s) => s.savedTasks);
  const saveTask = useAppStore((s) => s.saveTask);
  const unsaveTask = useAppStore((s) => s.unsaveTask);

  const [expandedRealm, setExpandedRealm] = useState<RealmSlug | null>(null);
  const [activeVibe, setActiveVibe] = useState<Vibe | "All">("All");

  const tasksForRealm = useMemo(() => {
    if (!expandedRealm) return [];
    let tasks = TASKS.filter((t) => t.realmSlug === expandedRealm);
    if (activeVibe !== "All") {
      tasks = tasks.filter((t) => t.vibe === activeVibe);
    }
    return tasks;
  }, [expandedRealm, activeVibe]);

  function handleToggleRealm(slug: RealmSlug) {
    if (expandedRealm === slug) {
      setExpandedRealm(null);
    } else {
      setExpandedRealm(slug);
      setActiveVibe("All");
    }
  }

  function handleChooseTask(task: Task) {
    setTodayTask(task, "picked");
    router.push("/today");
  }

  function handleToggleSave(taskId: string) {
    if (savedTasks.includes(taskId)) {
      unsaveTask(taskId);
    } else {
      saveTask(taskId);
    }
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="Browse Realms" showBack />

      <div className="space-y-3 p-4">
        {REALMS.map((realm, i) => {
          const isExpanded = expandedRealm === realm.slug;
          const realmTasks = TASKS.filter((t) => t.realmSlug === realm.slug);

          return (
            <motion.div
              key={realm.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              {/* Realm card header */}
              <motion.button
                onClick={() => handleToggleRealm(realm.slug)}
                className={cn(
                  "w-full rounded-2xl bg-[#141418] p-4 text-left transition-all"
                )}
                style={{
                  border: isExpanded ? `1px solid ${realm.accentHex}1A` : '1px solid rgba(255,255,255,0.06)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                    style={{
                      background: `${realm.accentHex}10`,
                      border: `1px solid ${realm.accentHex}15`,
                    }}
                  >
                    {realm.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold" style={{ color: realm.accentHex }}>
                      {realm.name}
                    </h3>
                    <p className="text-xs text-[#71717A]">{realm.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#71717A] tabular-nums">
                      {realmTasks.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-[#71717A]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#71717A]" />
                    )}
                  </div>
                </div>

                {/* Featured tasks preview when collapsed */}
                {!isExpanded && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {realmTasks.slice(0, 3).map((t) => (
                      <span key={t.id} className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#71717A]">
                        {t.title.length > 28 ? t.title.slice(0, 28) + "..." : t.title}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>

              {/* Expanded task list */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-3">
                      {/* Vibe filter tabs */}
                      <div className="flex gap-2 overflow-x-auto pb-1 px-1">
                        <VibeTab
                          label="All"
                          isActive={activeVibe === "All"}
                          onClick={() => setActiveVibe("All")}
                        />
                        {VIBE_TABS.map((vibe) => {
                          const cfg = VIBE_CONFIG[vibe];
                          return (
                            <VibeTab
                              key={vibe}
                              label={`${cfg.emoji} ${cfg.label}`}
                              isActive={activeVibe === vibe}
                              onClick={() => setActiveVibe(vibe)}
                              color={cfg.color}
                            />
                          );
                        })}
                      </div>

                      {/* Task cards */}
                      <div className="space-y-2">
                        {tasksForRealm.length === 0 ? (
                          <p className="py-6 text-center text-sm text-[#71717A]">
                            No tasks for this vibe in {realm.name}
                          </p>
                        ) : (
                          tasksForRealm.map((task, j) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              realm={realm}
                              index={j}
                              isSaved={savedTasks.includes(task.id)}
                              onChoose={() => handleChooseTask(task)}
                              onToggleSave={() => handleToggleSave(task.id)}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Vibe Tab ─── */
function VibeTab({
  label,
  isActive,
  onClick,
  color,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
        isActive
          ? "bg-white/10 text-foreground"
          : "bg-white/[0.03] text-[#71717A] hover:bg-white/[0.06]"
      )}
      style={isActive && color ? { color, background: `${color}1A` } : undefined}
    >
      {label}
    </button>
  );
}

/* ─── Task Card ─── */
function TaskCard({
  task,
  realm,
  index,
  isSaved,
  onChoose,
  onToggleSave,
}: {
  task: Task;
  realm: Realm;
  index: number;
  isSaved: boolean;
  onChoose: () => void;
  onToggleSave: () => void;
}) {
  const vibeCfg = VIBE_CONFIG[task.vibe];
  const riskLabel = SOCIAL_RISK_LABELS[task.socialRisk] || "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="rounded-2xl border border-white/[0.06] bg-[#141418] p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-bold leading-tight">{task.title}</h4>
          <p className="text-xs text-[#71717A] leading-relaxed">{task.description}</p>

          {/* metadata row */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: `${vibeCfg.color}1A`, color: vibeCfg.color }}
            >
              {vibeCfg.emoji} {vibeCfg.label}
            </span>

            <span className="inline-flex items-center gap-1 text-[10px] text-[#71717A]">
              <AlertTriangle className="h-3 w-3" />
              {riskLabel}
            </span>

            <span className="inline-flex items-center gap-1 text-[10px] text-[#71717A]">
              <Clock className="h-3 w-3" />
              {task.timeEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* action row */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={onChoose}
          className="flex-1 rounded-xl py-2 text-xs font-semibold text-black transition-all hover:opacity-90 active:scale-[0.97]"
          style={{ background: "#BFFF00" }}
        >
          Choose This
        </button>

        <button
          onClick={onToggleSave}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border transition-all",
            isSaved
              ? "border-[#BFFF00]/30 bg-[#BFFF00]/10 text-[#BFFF00]"
              : "border-white/10 bg-white/[0.03] text-[#71717A] hover:bg-white/[0.06]"
          )}
          aria-label={isSaved ? "Unsave task" : "Save task"}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
    </motion.div>
  );
}
