import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
}

export function Avatar({ src, alt = "avatar", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[var(--card-border)] bg-[var(--bg-secondary)]",
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xl font-semibold text-[var(--text-secondary)]">{alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
