import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post, User } from "@/lib/types";
import { PinnedPost } from "./pinned-post";

interface CreatorHeroProps {
  user: User;
  pinnedPost?: Post | null;
}

export function CreatorHero({ user, pinnedPost }: CreatorHeroProps) {
  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]/60 p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">Artist</p>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">{user.name}</h1>
          <p className="max-w-2xl text-[var(--text-secondary)]">{user.bio ?? "This creator hasn’t written a bio yet."}</p>
        </div>
      </div>
      {pinnedPost ? (
        <div className="w-full md:max-w-sm">
          <PinnedPost post={pinnedPost} />
        </div>
      ) : null}
    </section>
  );
}
