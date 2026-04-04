"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Check } from "lucide-react";
import { RECEIPT_GRADIENTS, RECEIPT_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  gradient: string;
  onUpload: (gradient: string, image: string | null) => void;
}

export function PhotoUpload({ gradient, onUpload }: PhotoUploadProps) {
  const [uploaded, setUploaded] = useState(false);
  const [activeGradient, setActiveGradient] = useState(gradient);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  function handleTap() {
    if (uploaded) return;

    // Pick a random gradient from RECEIPT_GRADIENTS
    const randomIndex = Math.floor(Math.random() * RECEIPT_IMAGES.length);
    const randomGradient =
      RECEIPT_GRADIENTS[randomIndex % RECEIPT_GRADIENTS.length];
    const randomImage = RECEIPT_IMAGES[randomIndex];

    setActiveGradient(randomGradient);
    setActiveImage(randomImage);
    setUploaded(true);
    onUpload(randomGradient, randomImage);
  }

  return (
    <motion.button
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl",
        "aspect-[4/3] transition-colors",
        !uploaded && "border-2 border-dashed border-white/15 bg-white/[0.03]"
      )}
      onClick={handleTap}
      whileTap={!uploaded ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <AnimatePresence mode="wait">
        {!uploaded ? (
          /* Empty state */
          <motion.div
            key="empty"
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
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
            <p className="text-sm font-medium text-[#71717A]">
              Tap to add proof
            </p>
            <p className="text-[11px] text-[#3F3F46]">
              Photo, screenshot, or selfie
            </p>
          </motion.div>
        ) : (
          /* Uploaded state */
          <motion.div
            key="uploaded"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Photo image or gradient fallback */}
            {activeImage ? (
              <img src={activeImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: activeGradient }}
              />
            )}

            {/* Subtle grain overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Check overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Check className="h-8 w-8 text-[#BFFF00]" strokeWidth={3} />
                </motion.div>
              </div>
            </motion.div>

            {/* "Proof added" label */}
            <motion.div
              className="absolute bottom-3 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-[#F0F0F5] backdrop-blur-sm">
                Proof added
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
