import { cn } from "@/lib/utils";
import * as React from "react";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--card-border)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--text-secondary)]",
        className
      )}
      {...props}
    />
  );
}
