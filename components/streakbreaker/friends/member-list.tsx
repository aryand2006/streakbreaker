"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";

interface MemberListProps {
  members: User[];
}

// Deterministic "online" for demo: use char code to decide
function isOnlineDemo(userId: string): boolean {
  const code = userId.charCodeAt(userId.length - 1);
  return code % 3 === 0;
}

export function MemberList({ members }: MemberListProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {members.map((member, i) => {
        const online = isOnlineDemo(member.id);

        return (
          <motion.div
            key={member.id}
            className="flex items-center gap-3 rounded-2xl bg-[#141418] p-4"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.05 + i * 0.05,
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <UserAvatar
              user={member}
              size="md"
              showStatus
              isOnline={online}
            />

            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-[#F0F0F5]">
                @{member.username}
              </span>
              <span className="text-xs text-[#71717A]">
                {member.stats.currentRun}d run
              </span>
              <span className="text-[11px] text-[#71717A]">
                {member.stats.tasksCompleted} tasks
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
