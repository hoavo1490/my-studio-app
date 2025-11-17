import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { serializePost } from "@/lib/serializers";

export default async function DashboardHome() {
  const user = await getCurrentUser();
  if (!user) return null;
  const [posts, totalPosts, pinnedCount] = await Promise.all([
    prisma.post.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.post.count({ where: { userId: user.id } }),
    prisma.post.count({ where: { userId: user.id, isPinned: true } }),
  ]);
  const serializedPosts = posts.map((post) => serializePost(post));

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Dashboard</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold">Welcome back, {user.name}</h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {totalPosts} posts · {pinnedCount} pinned
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/posts/new">Create a new post</Link>
          </Button>
        </div>
      </section>
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Recent work</p>
        {serializedPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--card-border)]/80 px-8 py-12 text-sm text-[var(--text-secondary)]">
            Nothing yet. Begin with your first entry when you are ready.
          </div>
        ) : (
          <div className="space-y-4">
            {serializedPosts.map((post) => (
              <article key={post.id} className="rounded-3xl border border-[var(--card-border)]/80 px-6 py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--text-secondary)]">
                      {post.type} · {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <h3 className="text-2xl font-semibold">{post.title ?? "Untitled"}</h3>
                  </div>
                  <Link href={`/dashboard/posts/${post.id}/edit`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    Edit entry
                  </Link>
                </div>
                {post.content ? (
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {post.content.slice(0, 160)}
                    {post.content.length > 160 ? "…" : ""}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
