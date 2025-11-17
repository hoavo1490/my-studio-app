import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { serializePost } from "@/lib/serializers";
import { DeletePostButton } from "@/components/posts/delete-post-button";

export default async function PostsListPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const posts = await prisma.post.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  const serializedPosts = posts.map((post) => serializePost(post));

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Posts</p>
          <h2 className="text-3xl font-semibold">Your studio feed</h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">New entry</Link>
        </Button>
      </div>
      {serializedPosts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[var(--card-border)]/80 px-8 py-12 text-sm text-[var(--text-secondary)]">
          No posts yet. Upload media or begin a text entry to see it here.
        </div>
      ) : (
        <div className="space-y-4">
          {serializedPosts.map((post) => (
            <article key={post.id} className="rounded-3xl border border-[var(--card-border)]/80 px-6 py-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--text-secondary)]">
                    {post.type}
                    {post.isPinned ? " · PINNED" : ""}
                  </p>
                  <h3 className="text-2xl font-semibold">{post.title ?? "Untitled"}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4 text-sm text-[var(--text-secondary)]">
                  <Link href={`/dashboard/posts/${post.id}/edit`} className="hover:text-[var(--text-primary)]">
                    Edit
                  </Link>
                  <DeletePostButton postId={post.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
