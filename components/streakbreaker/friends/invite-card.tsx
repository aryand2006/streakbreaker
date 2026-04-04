"use client";

import { motion } from "motion/react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function InviteCard() {
  function handleInvite() {
    toast.success("Link copied!");
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-border/20 p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(191,255,0,0.08) 50%, rgba(0,229,255,0.12) 100%)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Share2 className="h-5 w-5 text-primary" />
        </div>

        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold">
            Invite friends, earn rerolls
          </h3>
          <p className="text-xs text-muted-foreground">
            Each invite = 1 reroll
          </p>
        </div>
      </div>

      <motion.button
        className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        onClick={handleInvite}
        whileTap={{ scale: 0.97 }}
      >
        Share Invite Link
      </motion.button>
    </motion.div>
  );
}
