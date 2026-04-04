"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { RECEIPT_GRADIENTS } from "@/lib/constants";
import { PhotoUpload } from "@/components/streakbreaker/receipt/photo-upload";
import { ReceiptPreview } from "@/components/streakbreaker/receipt/receipt-preview";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";

const MAX_CAPTION = 280;

const CELEBRATION_EMOJIS = [
  "🎉", "🔥", "✨", "💪", "🚀", "⚡", "🎊", "💥",
  "🙌", "👏", "🤙", "🏆", "💯", "🎯", "⭐",
];

export default function ReceiptNewPage() {
  const router = useRouter();
  const todayTask = useAppStore((s) => s.todayTask);
  const currentUser = useAppStore((s) => s.currentUser);
  const users = useAppStore((s) => s.users);
  const addReceipt = useAppStore((s) => s.addReceipt);
  const completeTask = useAppStore((s) => s.completeTask);

  const [photoGradient, setPhotoGradient] = useState("");
  const [photoImage, setPhotoImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [witnessId, setWitnessId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get friends for witness selection
  const friends = currentUser
    ? users.filter(
        (u) => currentUser.friendIds.includes(u.id) && u.id !== currentUser.id
      )
    : [];

  const photoUploaded = photoGradient !== "";
  const canSubmit = photoUploaded && !submitting;

  const handlePhotoUpload = useCallback((gradient: string, image: string | null) => {
    setPhotoGradient(gradient);
    setPhotoImage(image);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!canSubmit || !todayTask || !currentUser) return;

    setSubmitting(true);

    const receipt = {
      id: `receipt-${Date.now()}`,
      userId: currentUser.id,
      taskId: todayTask.id,
      caption: caption.trim(),
      photoGradient,
      photoImage,
      textProof: null,
      witnessId,
      createdAt: new Date().toISOString(),
      chainOriginReceiptId: null,
      isPrivate: false,
    };

    addReceipt(receipt);
    completeTask();

    // Show celebration
    setShowCelebration(true);

    // Navigate after celebration
    setTimeout(() => {
      router.push("/today");
    }, 1500);
  }, [
    canSubmit,
    todayTask,
    currentUser,
    caption,
    photoGradient,
    photoImage,
    witnessId,
    addReceipt,
    completeTask,
    router,
  ]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [caption]);

  // Celebration overlay
  if (showCelebration) {
    return <CelebrationOverlay />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader title="Upload Receipt" showBack />

      <div className="flex-1 space-y-6 p-4 pb-32">
        {/* Task context */}
        {todayTask && (
          <motion.div
            className="flex items-center gap-2 rounded-xl bg-[#141418] px-3.5 py-2.5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-4 w-4 shrink-0 text-[#BFFF00]/60" />
            <p className="text-sm text-[#A1A1AA]">
              Completing:{" "}
              <span className="font-medium text-[#F0F0F5]">
                {todayTask.title}
              </span>
            </p>
          </motion.div>
        )}

        {/* Photo upload */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <PhotoUpload
            gradient={
              RECEIPT_GRADIENTS[
                Math.floor(Math.random() * RECEIPT_GRADIENTS.length)
              ]
            }
            onUpload={handlePhotoUpload}
          />
        </motion.div>

        {/* Caption */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <label
              htmlFor="caption"
              className="text-sm font-medium text-[#A1A1AA]"
            >
              Caption
            </label>
            <span
              className={cn(
                "text-[11px] tabular-nums transition-colors",
                caption.length > MAX_CAPTION * 0.9
                  ? caption.length >= MAX_CAPTION
                    ? "text-red-400"
                    : "text-amber-400"
                  : "text-[#71717A]"
              )}
            >
              {caption.length}/{MAX_CAPTION}
            </span>
          </div>

          <textarea
            ref={textareaRef}
            id="caption"
            value={caption}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CAPTION) {
                setCaption(e.target.value);
              }
            }}
            placeholder="How did it go? Drop the story..."
            rows={2}
            className={cn(
              "w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3",
              "text-sm text-[#F0F0F5] placeholder:text-[#3F3F46]",
              "outline-none transition-all focus:border-white/20 focus:bg-white/[0.05]"
            )}
          />
        </motion.div>

        {/* Witness tag */}
        {friends.length > 0 && (
          <motion.div
            className="space-y-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <label className="text-sm font-medium text-[#A1A1AA]">
              Tag a witness{" "}
              <span className="text-[11px] text-[#71717A]">(optional)</span>
            </label>

            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {friends.map((friend) => (
                <motion.button
                  key={friend.id}
                  className={cn(
                    "flex shrink-0 flex-col items-center gap-1.5 rounded-xl px-2.5 py-2 transition-colors",
                    witnessId === friend.id
                      ? "bg-[#1E1E24] ring-1 ring-[#BFFF00]/40"
                      : "bg-transparent hover:bg-white/[0.03]"
                  )}
                  onClick={() =>
                    setWitnessId(witnessId === friend.id ? null : friend.id)
                  }
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="relative">
                    <UserAvatar user={friend} size="sm" />
                    {witnessId === friend.id && (
                      <motion.div
                        className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#BFFF00]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        }}
                      >
                        <span className="text-[8px] font-bold text-[#0A0A0C]">
                          ✓
                        </span>
                      </motion.div>
                    )}
                  </div>
                  <span
                    className={cn(
                      "max-w-[56px] truncate text-[10px]",
                      witnessId === friend.id
                        ? "font-medium text-[#A1A1AA]"
                        : "text-[#71717A]"
                    )}
                  >
                    {friend.displayName.split(" ")[0]}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Receipt preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ReceiptPreview
            photoGradient={photoGradient}
            photoImage={photoImage}
            caption={caption}
            task={todayTask}
            user={currentUser}
          />
        </motion.div>
      </div>

      {/* Fixed bottom submit button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] bg-background/90 px-4 pb-8 pt-3 backdrop-blur-xl">
        <motion.button
          className={cn(
            "flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5",
            "font-semibold transition-all",
            canSubmit
              ? "bg-[#BFFF00] text-[#0A0A0C]"
              : "bg-[#1E1E24] text-[#71717A]"
          )}
          onClick={handleSubmit}
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.01, boxShadow: "0 0 30px rgba(191,255,0,0.35)" } : undefined}
          whileTap={canSubmit ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {submitting ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black/80" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Submit Receipt</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Celebration overlay ─────────────────────────────────────────── */

function CelebrationOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Emoji burst */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CELEBRATION_EMOJIS.map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            initial={{
              x: "50vw",
              y: "50vh",
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: `${15 + Math.random() * 70}vw`,
              y: `${10 + Math.random() * 80}vh`,
              scale: [0, 1.2, 0.9],
              opacity: [1, 1, 0],
              rotate: Math.random() * 360 - 180,
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.5,
              delay: i * 0.04,
              ease: "easeOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Central check */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
      >
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#BFFF00]/20"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(191,255,0,0.3)",
              "0 0 0 20px rgba(191,255,0,0)",
            ],
          }}
          transition={{
            duration: 1,
            repeat: 2,
            ease: "easeOut",
          }}
        >
          <motion.span
            className="text-4xl"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 12,
              delay: 0.2,
            }}
          >
            ✅
          </motion.span>
        </motion.div>

        <motion.div
          className="space-y-1 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-xl font-bold text-[#F0F0F5]">Receipt submitted!</h2>
          <p className="text-sm text-[#71717A]">
            Pattern broken. Run extended.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
