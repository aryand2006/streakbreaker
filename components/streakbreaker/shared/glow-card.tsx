"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  color: string;
  className?: string;
  onClick?: () => void;
}

export function GlowCard({ children, color, className, onClick }: GlowCardProps) {
  return (
    <motion.div
      className={cn("rounded-2xl bg-[#141418] p-4", className)}
      style={{
        border: `1px solid ${color}1A`,
      }}
      whileHover={{
        borderColor: `${color}33`,
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}
