import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post, User } from "@/lib/types";
import { PinnedPost } from "./pinned-post";

interface CreatorHeroProps {
  user: User;
  pinnedPost?: Post | null;
}

export function CreatorHero({ user, pinnedPost }: CreatorHeroProps) {
  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <Avatar className="h-28 w-28">
          {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>}
        </Avatar>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]">@{user.username}</p>
          <h1 className="text-4xl font-semibold">{user.name}</h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
            {user.bio ?? "This creator hasn’t written a bio yet."}
          </p>
        </div>
      </div>
      {pinnedPost ? (
        <div>
          <PinnedPost post={pinnedPost} />
        </div>
      ) : null}
    </section>
  );
}
