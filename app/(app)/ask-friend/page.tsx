"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, RefreshCw, Check } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { GlowCard } from "@/components/streakbreaker/shared/glow-card";
import { TASKS } from "@/lib/data/tasks";
import { REALM_MAP, VIBE_CONFIG, SOCIAL_RISK_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { User, Task } from "@/lib/types";

type FlowState = "select" | "pending" | "result";

const FRIEND_TAUNTS = [
  "This one's so you",
  "Don't chicken out",
  "You're welcome.",
  "I chose chaos for you.",
  "Good luck with this one lol",
  "You asked for it...",
  "This will be hilarious",
  "I believe in you (kind of)",
  "Muhahaha",
  "No take-backs!",
];

export default function AskFriendPage() {
  const router = useRouter();
  const users = useAppStore((s) => s.users);
  const currentUser = useAppStore((s) => s.currentUser);
  const setTodayTask = useAppStore((s) => s.setTodayTask);

  const [flowState, setFlowState] = useState<FlowState>("select");
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [pickedTask, setPickedTask] = useState<Task | null>(null);
  const [taunt, setTaunt] = useState("");

  // Get friends list
  const friends = useMemo(() => {
    if (!currentUser) return [];
    return users.filter(
      (u) => currentUser.friendIds.includes(u.id) && u.id !== currentUser.id
    );
  }, [users, currentUser]);

  // Available tasks for friend-picking from full pool
  const friendPickTasks = useMemo(() => {
    return TASKS.filter((t) => t.canBeFriendPicked);
  }, []);

  function handleSelectFriend(friend: User) {
    setSelectedFriend(friend);
    setFlowState("pending");

    // Pick a random task and taunt
    const randomTask =
      friendPickTasks[Math.floor(Math.random() * friendPickTasks.length)] ?? null;
    const randomTaunt =
      FRIEND_TAUNTS[Math.floor(Math.random() * FRIEND_TAUNTS.length)];

    setPickedTask(randomTask);
    setTaunt(randomTaunt);
  }

  // Auto-advance from pending to result
  useEffect(() => {
    if (flowState !== "pending") return;
    const timer = setTimeout(() => {
      setFlowState("result");
    }, 2500);
    return () => clearTimeout(timer);
  }, [flowState]);

  function handleAccept() {
    if (!pickedTask) return;
    setTodayTask(pickedTask, "friend-picked");
    router.push("/today");
  }

  function handleAskSomeoneElse() {
    setSelectedFriend(null);
    setPickedTask(null);
    setTaunt("");
    setFlowState("select");
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="Ask a Friend" showBack />

      <AnimatePresence mode="wait">
        {flowState === "select" && (
          <SelectFriendView
            key="select"
            friends={friends}
            onSelect={handleSelectFriend}
          />
        )}
        {flowState === "pending" && selectedFriend && (
          <PendingView key="pending" friend={selectedFriend} />
        )}
        {flowState === "result" && selectedFriend && pickedTask && (
          <ResultView
            key="result"
            friend={selectedFriend}
            task={pickedTask}
            taunt={taunt}
            onAccept={handleAccept}
            onAskElse={handleAskSomeoneElse}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── State 1: Select Friend ─── */
function SelectFriendView({
  friends,
  onSelect,
}: {
  friends: User[];
  onSelect: (friend: User) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4"
    >
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Let someone else choose your problem.
      </p>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {friends.map((friend, i) => (
          <motion.button
            key={friend.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(friend)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.04] bg-card p-4 transition-colors hover:border-white/10 hover:bg-card/80"
          >
            <UserAvatar user={friend} size="lg" />
            <span className="text-xs font-semibold truncate w-full text-center">
              {friend.displayName.split(" ")[0]}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {friend.stats.tasksCompleted} tasks
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── State 2: Pending / Choosing ─── */
function PendingView({ friend }: { friend: User }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center px-6 pt-20"
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <UserAvatar user={friend} size="xl" />
      </motion.div>

      <h2 className="mt-6 text-lg font-bold">
        {friend.displayName.split(" ")[0]} is choosing{dots}
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Browsing tasks with maximum chaos potential
      </p>

      {/* Shuffling cards animation */}
      <div className="relative mt-10 h-24 w-52">
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 rounded-xl border border-white/10 bg-card"
            style={{ originX: 0.5, originY: 0.5 }}
            animate={{
              x: [0, (idx - 1) * 30, 0, (1 - idx) * 20, 0],
              rotateZ: [0, (idx - 1) * 6, 0, (1 - idx) * 4, 0],
              scale: [1, 0.95, 1, 0.97, 1],
            }}
            transition={{
              duration: 1.5,
              delay: idx * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex h-full items-center justify-center text-2xl opacity-30">
              🎯
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── State 3: Result ─── */
function ResultView({
  friend,
  task,
  taunt,
  onAccept,
  onAskElse,
}: {
  friend: User;
  task: Task;
  taunt: string;
  onAccept: () => void;
  onAskElse: () => void;
}) {
  const realm = REALM_MAP[task.realmSlug];
  const vibeCfg = VIBE_CONFIG[task.vibe];
  const riskLabel = SOCIAL_RISK_LABELS[task.socialRisk] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center px-6 pt-8"
    >
      <UserAvatar user={friend} size="lg" />

      <motion.h2
        className="mt-4 text-xl font-black"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {friend.displayName.split(" ")[0]} picked for you!
      </motion.h2>

      {/* Taunt */}
      <motion.p
        className="mt-2 rounded-full bg-white/[0.05] px-4 py-1.5 text-sm text-muted-foreground italic"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        &ldquo;{taunt}&rdquo;
      </motion.p>

      {/* Task card */}
      <motion.div
        className="mt-8 w-full max-w-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <GlowCard color={realm.accentHex} className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
              style={{ background: `${realm.accentHex}1A` }}
            >
              {realm.emoji}
            </span>
            <span className="text-xs font-semibold" style={{ color: realm.accentHex }}>
              {realm.name}
            </span>
          </div>

          <h3 className="text-lg font-bold leading-tight">{task.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {task.description}
          </p>

          {/* meta */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: `${vibeCfg.color}1A`, color: vibeCfg.color }}
            >
              {vibeCfg.emoji} {vibeCfg.label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Risk: {riskLabel}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {task.timeEstimate}
            </span>
          </div>

          {task.label && (
            <p className="text-xs italic text-muted-foreground/70">
              &ldquo;{task.label}&rdquo;
            </p>
          )}
        </GlowCard>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="mt-6 flex w-full max-w-sm flex-col gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <button
          onClick={onAccept}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#BFFF00] text-sm font-bold text-[#0A0A0C] transition-all hover:brightness-110 active:scale-[0.97]"
        >
          <Check className="h-4 w-4" />
          Accept
        </button>

        <button
          onClick={onAskElse}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-semibold text-muted-foreground transition-all hover:bg-white/[0.04] active:scale-[0.97]"
        >
          <RefreshCw className="h-4 w-4" />
          Ask Someone Else
        </button>
      </motion.div>
    </motion.div>
  );
}
