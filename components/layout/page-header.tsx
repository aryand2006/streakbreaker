"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function PageHeader({
  title,
  showBack = false,
  rightAction,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/80 px-4 backdrop-blur-xl">
      <div className="flex w-10 justify-start">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
      </div>

      <h1
        className={cn(
          "flex-1 text-center text-lg font-semibold leading-none"
        )}
      >
        {title}
      </h1>

      <div className="flex w-10 justify-end">{rightAction}</div>
    </header>
  );
}
