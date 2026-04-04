"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GroupStepProps {
  onNext: () => void;
}

type GroupMode = "join" | "create" | null;

export function GroupStep({ onNext }: GroupStepProps) {
  const [mode, setMode] = useState<GroupMode>(null);
  const [joinCode, setJoinCode] = useState("CHAOS-2024");
  const [groupName, setGroupName] = useState("");

  return (
    <div className="flex flex-1 flex-col px-6">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-black tracking-tight">
          Join your crew
        </h2>
        <p className="text-sm text-muted-foreground">
          Streakbreaker is better with friends.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col gap-4">
        {/* Join existing group */}
        <motion.button
          onClick={() => setMode("join")}
          className={cn(
            "rounded-2xl border-2 p-5 text-left transition-colors",
            mode === "join"
              ? "border-[#A855F7] bg-[#A855F7]/5"
              : "border-border bg-card"
          )}
          style={
            mode === "join"
              ? { boxShadow: "0 0 25px rgba(168,85,247,0.2)" }
              : undefined
          }
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="mb-1 flex items-center gap-3">
            <span className="text-2xl">🔗</span>
            <p className="text-lg font-bold">Join existing group</p>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">
            Enter a group invite code from a friend.
          </p>
          {mode === "join" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="INVITE-CODE"
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-mono text-sm font-semibold tracking-wider text-foreground placeholder:text-muted-foreground/50 focus:border-[#A855F7] focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </motion.button>

        {/* Create new group */}
        <motion.button
          onClick={() => setMode("create")}
          className={cn(
            "rounded-2xl border-2 p-5 text-left transition-colors",
            mode === "create"
              ? "border-[#00E5FF] bg-[#00E5FF]/5"
              : "border-border bg-card"
          )}
          style={
            mode === "create"
              ? { boxShadow: "0 0 25px rgba(0,229,255,0.2)" }
              : undefined
          }
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="mb-1 flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <p className="text-lg font-bold">Create new group</p>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">
            Start a fresh crew and invite your people.
          </p>
          {mode === "create" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group name..."
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:border-[#00E5FF] focus:outline-none"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </motion.button>
      </div>

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
        <button
          onClick={onNext}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}
