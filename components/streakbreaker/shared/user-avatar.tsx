import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: Pick<
    { id: string; displayName: string; avatarGradient: string },
    "id" | "displayName" | "avatarGradient"
  >;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  isOnline?: boolean;
}

const SIZE_MAP = {
  sm: { px: 32, text: "text-xs" },
  md: { px: 40, text: "text-sm" },
  lg: { px: 56, text: "text-lg" },
  xl: { px: 80, text: "text-2xl" },
} as const;

export function UserAvatar({
  user,
  size = "md",
  showStatus = false,
  isOnline = false,
}: UserAvatarProps) {
  const { px, text } = SIZE_MAP[size];
  const initial = user.displayName.charAt(0).toUpperCase();

  return (
    <div className="relative inline-flex shrink-0" style={{ width: px, height: px }}>
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full font-bold text-white select-none",
          text
        )}
        style={{ background: user.avatarGradient }}
      >
        {initial}
      </div>

      {showStatus && isOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-background bg-emerald-500",
            size === "sm" && "h-2 w-2",
            size === "md" && "h-2.5 w-2.5",
            size === "lg" && "h-3 w-3",
            size === "xl" && "h-4 w-4"
          )}
        />
      )}
    </div>
  );
}
