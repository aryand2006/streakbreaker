"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ProgressRingProps {
  progress: number;
  color: string;
  size?: number;
  label: string;
}

export function ProgressRing({
  progress,
  color,
  size = 120,
  label,
}: ProgressRingProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const motionProgress = useMotionValue(0);
  const springProgress = useSpring(motionProgress, {
    stiffness: 60,
    damping: 20,
  });

  const strokeDashoffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, 0]
  );

  const displayValue = useTransform(springProgress, (v) =>
    Math.round(v)
  );

  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    motionProgress.set(clampedProgress);
  }, [clampedProgress, motionProgress]);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (v) => {
      if (valueRef.current) {
        valueRef.current.textContent = String(v);
      }
    });
    return unsubscribe;
  }, [displayValue]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />

          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold tabular-nums" style={{ color }}>
            <span ref={valueRef}>0</span>
            <span className="text-sm font-normal text-muted-foreground">%</span>
          </span>
        </div>
      </div>

      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
