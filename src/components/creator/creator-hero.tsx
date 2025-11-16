import type { Post, User } from "@/lib/types";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PinnedPost } from "@/components/creator/pinned-post";

interface CreatorHeroProps {
  user: User;
  pinnedPost?: Post;
}

export function CreatorHero({ user, pinnedPost }: CreatorHeroProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-[var(--card-border)] bg-[var(--bg-secondary)]/80 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Avatar src={user.avatarUrl ?? undefined} alt={user.name} className="h-20 w-20" />
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-[var(--text-secondary)]">@{user.username}</p>
          <h1 className="text-3xl font-semibold">{user.name}</h1>
          {user.bio && <p className="max-w-2xl text-base text-[var(--text-secondary)]">{user.bio}</p>}
        </div>
        <div className="flex flex-1 justify-end gap-2">
          <Button variant="outline" className="w-full md:w-auto">
            Share page
          </Button>
          <Button className="w-full md:w-auto">Support</Button>
        </div>
      </div>
      {pinnedPost && <PinnedPost post={pinnedPost} />}
    </section>
  );
}
