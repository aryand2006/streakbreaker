import { cn } from "@/lib/utils";

interface PulseDotProps {
  color: string;
  size?: "sm" | "md";
}

const SIZE_CLASSES = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
} as const;

export function PulseDot({ color, size = "sm" }: PulseDotProps) {
  return (
    <span className="relative inline-flex">
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-50",
          SIZE_CLASSES[size]
        )}
        style={{ backgroundColor: color }}
      />
      <span
        className={cn("relative inline-flex rounded-full", SIZE_CLASSES[size])}
        style={{ backgroundColor: color }}
      />
    </span>
  );
}
