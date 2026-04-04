"use client";

import { cn } from "@/lib/utils";
import { REACTION_CONFIG } from "@/lib/constants";
import type { Reaction, ReactionType } from "@/lib/types";

interface ReactionSummaryProps {
  reactions: Reaction[];
}

export function ReactionSummary({ reactions }: ReactionSummaryProps) {
  const counts: Record<ReactionType, number> = {
    "could-do-more": 0,
    "lets-gooo": 0,
    "im-in": 0,
  };

  for (const r of reactions) {
    counts[r.type]++;
  }

  const types: ReactionType[] = ["could-do-more", "lets-gooo", "im-in"];

  return (
    <div className="flex items-center gap-2">
      {types.map((type) => {
        if (counts[type] === 0) return null;
        const config = REACTION_CONFIG[type];
        return (
          <span
            key={type}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
              "text-xs font-medium"
            )}
            style={{
              backgroundColor: `${config.color}1A`,
              color: config.color,
            }}
          >
            <span>{config.emoji}</span>
            <span>{counts[type]}</span>
          </span>
        );
      })}
    </div>
  );
}
