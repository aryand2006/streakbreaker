"use client";

import { motion } from "motion/react";
import { Settings } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { ProfileHeader } from "@/components/streakbreaker/profile/profile-header";
import { StatsGrid } from "@/components/streakbreaker/profile/stats-grid";
import { BadgeShowcase } from "@/components/streakbreaker/profile/badge-showcase";
import { KnownFor } from "@/components/streakbreaker/profile/known-for";
import { ReceiptGallery } from "@/components/streakbreaker/profile/receipt-gallery";

export default function ProfilePage() {
  const currentUser = useAppStore((s) => s.currentUser);
  const badges = useAppStore((s) => s.badges);
  const receipts = useAppStore((s) => s.receipts);

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-[#71717A]">Loading...</p>
      </div>
    );
  }

  const userReceipts = receipts.filter((r) => r.userId === currentUser.id);

  return (
    <div className="flex flex-col pb-24">
      <PageHeader
        title="Profile"
        rightAction={
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        }
      />

      <ProfileHeader user={currentUser} />

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <StatsGrid stats={currentUser.stats} />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <h2 className="mb-3 px-4 text-base font-bold text-[#F0F0F5]">Known for</h2>
        <KnownFor knownFor={currentUser.knownFor} />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <h2 className="mb-3 px-4 text-base font-bold text-[#F0F0F5]">Badges</h2>
        <BadgeShowcase badgeIds={currentUser.badgeIds} allBadges={badges} />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <h2 className="mb-3 px-4 text-base font-bold text-[#F0F0F5]">Recent Receipts</h2>
        <ReceiptGallery receipts={userReceipts} />
      </motion.div>
    </div>
  );
}
