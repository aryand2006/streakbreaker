import { REALM_MAP } from "@/lib/constants";
import type { RealmSlug } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RealmBadgeProps {
  slug: RealmSlug;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
  lg: "px-4 py-1.5 text-base gap-2",
} as const;

export function RealmBadge({ slug, size = "md" }: RealmBadgeProps) {
  const realm = REALM_MAP[slug];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        SIZE_CLASSES[size]
      )}
      style={{
        backgroundColor: `${realm.accentHex}1A`,
        color: realm.accentHex,
      }}
    >
      <span>{realm.emoji}</span>
      <span>{realm.name}</span>
    </span>
  );
}
