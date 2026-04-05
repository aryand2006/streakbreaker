"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Camera, X, Image as ImageIcon, Type, Zap, Newspaper, Eye } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/stores/app-store";
import { RECEIPT_GRADIENTS } from "@/lib/constants";
import { UserAvatar } from "@/components/streakbreaker/shared/user-avatar";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";

const MAX_CAPTION = 280;

const CELEBRATION_EMOJIS = [
  "🎉", "🔥", "✨", "💪", "🚀", "⚡", "🎊", "💥",
  "🙌", "👏", "🤙", "🏆", "💯", "🎯", "⭐",
];

type ProofMode = "photo" | "text";

export default function ReceiptNewPage() {
  const router = useRouter();
  const todayTask = useAppStore((s) => s.todayTask);
  const currentUser = useAppStore((s) => s.currentUser);
  const users = useAppStore((s) => s.users);
  const addReceipt = useAppStore((s) => s.addReceipt);
  const completeTask = useAppStore((s) => s.completeTask);

  const [proofMode, setProofMode] = useState<ProofMode>("photo");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [textProof, setTextProof] = useState("");
  const [witnessId, setWitnessId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const friends = currentUser
    ? users.filter(
        (u) => currentUser.friendIds.includes(u.id) && u.id !== currentUser.id
      )
    : [];

  const hasPhoto = photoPreview !== null;
  const hasTextProof = textProof.trim().length > 0;
  const canSubmit =
    !submitting &&
    ((proofMode === "photo" && hasPhoto) || (proofMode === "text" && hasTextProof));

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleSubmit = useCallback(() => {
    if (!canSubmit || !todayTask || !currentUser) return;
    setSubmitting(true);

    const randomGradient =
      RECEIPT_GRADIENTS[Math.floor(Math.random() * RECEIPT_GRADIENTS.length)];

    const receipt = {
      id: `receipt-${Date.now()}`,
      userId: currentUser.id,
      taskId: todayTask.id,
      caption: caption.trim(),
      photoGradient: randomGradient,
      photoImage: photoPreview,
      textProof: proofMode === "text" ? textProof.trim() : null,
      witnessId,
      createdAt: new Date().toISOString(),
      chainOriginReceiptId: null,
      isPrivate: false,
    };

    addReceipt(receipt);
    completeTask();
    setShowSuccess(true);
  }, [canSubmit, todayTask, currentUser, caption, photoPreview, textProof, proofMode, witnessId, addReceipt, completeTask]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [caption]);

  // Success state
  if (showSuccess) {
    return <SuccessState />;
  }

  return (
    <div className="flex min-h-screen flex-col pb-36">
      <PageHeader title="Upload Receipt" showBack />

      <div className="flex-1 space-y-6 p-4">
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

        {/* Proof mode toggle */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <button
            onClick={() => setProofMode("photo")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all",
              proofMode === "photo"
                ? "bg-[#F0F0F5] text-[#0A0A0C]"
                : "bg-[#141418] text-[#71717A] hover:bg-white/[0.06]"
            )}
          >
            <Camera className="h-4 w-4" />
            Photo
          </button>
          <button
            onClick={() => setProofMode("text")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all",
              proofMode === "text"
                ? "bg-[#F0F0F5] text-[#0A0A0C]"
                : "bg-[#141418] text-[#71717A] hover:bg-white/[0.06]"
            )}
          >
            <Type className="h-4 w-4" />
            Text only
          </button>
        </motion.div>

        {/* Photo upload area */}
        {proofMode === "photo" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <AnimatePresence mode="wait">
              {!hasPhoto ? (
                <motion.button
                  key="empty"
                  className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl aspect-[4/3] border-2 border-dashed border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all"
                  onClick={() => fileInputRef.current?.click()}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E1E24]"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Camera className="h-6 w-6 text-[#71717A]" />
                  </motion.div>
                  <p className="mt-3 text-sm font-medium text-[#71717A]">
                    Tap to add photo
                  </p>
                  <p className="mt-1 text-[11px] text-[#3F3F46]">
                    Photo, screenshot, or selfie
                  </p>
                </motion.button>
              ) : (
                <motion.div
                  key="preview"
                  className="relative overflow-hidden rounded-2xl aspect-[4/3]"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img
                    src={photoPreview}
                    alt="Receipt preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Text proof area */}
        {proofMode === "text" && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <label className="text-sm font-medium text-[#A1A1AA]">
              Describe what you did
            </label>
            <textarea
              value={textProof}
              onChange={(e) => setTextProof(e.target.value)}
              placeholder="Tell the story. What happened?"
              rows={5}
              className={cn(
                "w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3",
                "text-sm text-[#F0F0F5] placeholder:text-[#3F3F46]",
                "outline-none transition-all focus:border-white/15 focus:bg-white/[0.05]"
              )}
            />
          </motion.div>
        )}

        {/* Caption (for both modes) */}
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
              Caption {proofMode === "text" && <span className="text-[11px] text-[#71717A]">(optional)</span>}
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
              "w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3",
              "text-sm text-[#F0F0F5] placeholder:text-[#3F3F46]",
              "outline-none transition-all focus:border-white/15 focus:bg-white/[0.05]"
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
                      ? "bg-[#1E1E24] ring-1 ring-[#BFFF00]/30"
                      : "bg-transparent hover:bg-white/[0.03]"
                  )}
                  onClick={() =>
                    setWitnessId(witnessId === friend.id ? null : friend.id)
                  }
                  whileTap={{ scale: 0.95 }}
                >
                  <UserAvatar user={friend} size="sm" />
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
      </div>

      {/* Fixed bottom submit button - well above nav */}
      <div className="fixed bottom-20 left-0 right-0 z-20 px-4 pb-4 pt-3">
        <div className="rounded-2xl bg-[#0A0A0C]/95 backdrop-blur-xl p-3 border-t border-white/[0.04]">
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
            whileTap={canSubmit ? { scale: 0.98 } : undefined}
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
    </div>
  );
}

/* ─── Success overlay ─────────────────────────────────────────── */

function SuccessState() {
  const router = useRouter();
  const clearTask = useAppStore((s) => s.clearTask);

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

      {/* Central content */}
      <motion.div
        className="flex flex-col items-center gap-6 px-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#BFFF00]/15"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(191,255,0,0.2)",
              "0 0 0 20px rgba(191,255,0,0)",
            ],
          }}
          transition={{ duration: 1, repeat: 2, ease: "easeOut" }}
        >
          <motion.span
            className="text-4xl"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.2 }}
          >
            ✅
          </motion.span>
        </motion.div>

        <motion.div
          className="space-y-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-xl font-bold text-[#F0F0F5]">Receipt posted.</h2>
          <p className="text-sm text-[#71717A]">
            Pattern interrupted. Run extended.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col gap-3 w-full max-w-[280px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => {
              clearTask();
              router.push("/today");
            }}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#BFFF00] font-bold text-black text-sm"
          >
            <Zap className="h-4 w-4" />
            Get another task
          </button>

          <button
            onClick={() => router.push("/feed")}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-[#141418] font-semibold text-[#A1A1AA] text-sm"
          >
            <Newspaper className="h-4 w-4" />
            Go to Feed
          </button>

          <button
            onClick={() => router.push("/feed")}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-[#141418] font-semibold text-[#A1A1AA] text-sm"
          >
            <Eye className="h-4 w-4" />
            View Receipt
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
