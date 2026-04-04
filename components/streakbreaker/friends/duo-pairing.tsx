"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DuoPairing as DuoPairingType, User, Realm } from "@/lib/types";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";

interface DuoPairingProps {
  pairing: DuoPairingType;
  users: User[];
  realm: Realm | undefined;
}

export function DuoPairing({ pairing, users, realm }: DuoPairingProps) {
  const userA = users.find((u) => u.id === pairing.userIds[0]);
  const userB = users.find((u) => u.id === pairing.userIds[1]);

  if (!userA || !userB) return null;

  const progressPercent = pairing.completed
    ? 100
    : pairing.sharedReceiptIds.length >= 1
      ? 50
      : 0;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-card p-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        This week&apos;s duo
      </div>

      {/* Duo avatars with bridge */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <UserAvatar user={userA} size="lg" />
          <span className="text-xs font-medium">@{userA.username}</span>
        </div>

        {/* Bridge visual */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative flex items-center">
            <div
              className="h-0.5 w-12"
              style={{
                background: realm
                  ? `linear-gradient(90deg, ${realm.accentHex}60, ${realm.accentHex}, ${realm.accentHex}60)`
                  : "linear-gradient(90deg, #555, #888, #555)",
              }}
            />
            {pairing.completed && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              >
                <Check className="h-3.5 w-3.5 text-white" />
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <UserAvatar user={userB} size="lg" />
          <span className="text-xs font-medium">@{userB.username}</span>
        </div>
      </div>

      {/* Shared realm badge */}
      {realm && (
        <div className="mt-3 flex justify-center">
          <RealmBadge slug={realm.slug} size="md" />
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: pairing.completed
                ? "#4ADE80"
                : realm?.accentHex ?? "#888",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground/60">
          <span>
            {pairing.sharedReceiptIds.length} receipt
            {pairing.sharedReceiptIds.length !== 1 ? "s" : ""}
          </span>
          {pairing.completed ? (
            <span className="font-medium text-emerald-400">Completed</span>
          ) : (
            <span>In progress</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
