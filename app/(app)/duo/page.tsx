"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { REALM_MAP } from "@/lib/constants";
import { TASK_MAP } from "@/lib/data/tasks";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { RealmBadge } from "@/components/streakbreaker/shared/realm-badge";
import { GlowCard } from "@/components/streakbreaker/shared/glow-card";

export default function DuoPage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const users = useAppStore((s) => s.users);
  const duoPairings = useAppStore((s) => s.duoPairings);
  const receipts = useAppStore((s) => s.receipts);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Find current user's duo
  const myDuo = duoPairings.find((d) =>
    d.userIds.includes(currentUser.id)
  );

  if (!myDuo) {
    return (
      <div className="flex flex-col pb-24">
        <PageHeader title="Duo" showBack />
        <div className="flex min-h-[40vh] items-center justify-center px-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-4xl">🤝</span>
            <p className="text-lg font-semibold">No active duo</p>
            <p className="text-sm text-muted-foreground">
              Duo pairings are assigned weekly. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const partnerId = myDuo.userIds.find((id) => id !== currentUser.id)!;
  const partner = users.find((u) => u.id === partnerId);
  const realm = REALM_MAP[myDuo.realmSlug];
  const task = myDuo.taskId ? TASK_MAP[myDuo.taskId] : null;

  // Receipts from each user for the shared task
  const myReceipts = receipts.filter(
    (r) =>
      r.userId === currentUser.id &&
      myDuo.sharedReceiptIds.includes(r.id)
  );
  const partnerReceipts = receipts.filter(
    (r) =>
      r.userId === partnerId &&
      myDuo.sharedReceiptIds.includes(r.id)
  );

  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Weekly Duo" showBack />

      {/* Duo avatars */}
      <motion.div
        className="flex items-center justify-center gap-6 pt-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <UserAvatar user={currentUser} size="xl" />
          <span className="text-sm font-semibold">You</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div
            className="h-0.5 w-16"
            style={{
              background: `linear-gradient(90deg, ${realm.accentHex}60, ${realm.accentHex}, ${realm.accentHex}60)`,
            }}
          />
          {myDuo.completed && (
            <motion.div
              className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <Check className="h-4 w-4 text-white" />
            </motion.div>
          )}
        </div>

        {partner && (
          <div className="flex flex-col items-center gap-1.5">
            <UserAvatar user={partner} size="xl" />
            <span className="text-sm font-semibold">
              @{partner.username}
            </span>
          </div>
        )}
      </motion.div>

      {/* Shared realm */}
      <motion.div
        className="px-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <GlowCard color={realm.accentHex}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{realm.emoji}</span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                Shared Realm
              </span>
              <span className="text-lg font-bold">{realm.name}</span>
              <span className="text-xs text-muted-foreground">
                {realm.tagline}
              </span>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Shared task */}
      {task && (
        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="mb-2 text-base font-semibold">Shared Task</h2>
          <div className="rounded-xl bg-card p-4">
            <div className="flex items-start gap-2">
              <RealmBadge slug={task.realmSlug} size="sm" />
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${realm.accentHex}1A`,
                  color: realm.accentHex,
                }}
              >
                {task.vibe}
              </span>
            </div>
            <h3 className="mt-2 text-sm font-semibold">{task.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {task.description}
            </p>
          </div>
        </motion.div>
      )}

      {/* Linked receipts */}
      <motion.div
        className="px-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <h2 className="mb-2 text-base font-semibold">Linked Receipts</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* My receipts column */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              You
            </span>
            {myReceipts.length > 0 ? (
              myReceipts.map((r) => (
                <div
                  key={r.id}
                  className="aspect-square overflow-hidden rounded-xl"
                  style={{ background: r.photoGradient }}
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-2xl opacity-60">
                      {realm.emoji}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/20">
                <span className="text-xs text-muted-foreground/40">
                  Awaiting receipt
                </span>
              </div>
            )}
          </div>

          {/* Partner receipts column */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {partner ? `@${partner.username}` : "Partner"}
            </span>
            {partnerReceipts.length > 0 ? (
              partnerReceipts.map((r) => (
                <div
                  key={r.id}
                  className="aspect-square overflow-hidden rounded-xl"
                  style={{ background: r.photoGradient }}
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-2xl opacity-60">
                      {realm.emoji}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/20">
                <span className="text-xs text-muted-foreground/40">
                  Awaiting receipt
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Completion badge */}
      {myDuo.completed && (
        <motion.div
          className="px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-emerald-500/10 py-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 200,
              }}
            >
              <span className="text-4xl">🏆</span>
            </motion.div>
            <h3 className="text-lg font-bold text-emerald-400">
              Duo Complete!
            </h3>
            <p className="text-sm text-muted-foreground">
              Both partners submitted receipts this week
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
