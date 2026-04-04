"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Receipt } from "@/lib/types";
import { REALM_MAP } from "@/lib/constants";
import { TASK_MAP } from "@/lib/data/tasks";

interface ReceiptGalleryProps {
  receipts: Receipt[];
}

export function ReceiptGallery({ receipts }: ReceiptGalleryProps) {
  if (receipts.length === 0) {
    return (
      <div className="flex items-center justify-center px-4 py-8">
        <p className="text-sm text-muted-foreground">No receipts yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 px-4">
      {receipts.map((receipt, i) => {
        const task = TASK_MAP[receipt.taskId];
        const realm = task ? REALM_MAP[task.realmSlug] : null;

        return (
          <motion.div
            key={receipt.id}
            className="relative aspect-square overflow-hidden rounded-xl"
            style={!receipt.photoImage ? { background: receipt.photoGradient } : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.04 * i,
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {receipt.photoImage ? (
              <img src={receipt.photoImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full" style={{ background: receipt.photoGradient }} />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl opacity-60">
                {realm?.emoji ?? "📝"}
              </span>
            </div>

            {receipt.isPrivate && (
              <div className="absolute top-1.5 right-1.5 rounded-full bg-black/40 px-1.5 py-0.5 text-[10px] text-[#A1A1AA]">
                Private
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
