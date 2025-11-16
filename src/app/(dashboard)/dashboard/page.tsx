import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serializePost } from "@/lib/serializers";

export default async function DashboardHome() {
  const user = await getCurrentUser();
  if (!user) return null;
  const [posts, totalPosts, pinnedCount] = await Promise.all([
    prisma.post.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.post.count({ where: { userId: user.id } }),
    prisma.post.count({ where: { userId: user.id, isPinned: true } }),
  ]);
  const serializedPosts = posts.map((post) => serializePost(post));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Welcome back</p>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">New Post</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{totalPosts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pinned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">
              {pinnedCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{user.theme}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {serializedPosts.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">No posts yet.</p>
          ) : (
            serializedPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">{post.type}</p>
                  <p className="text-lg font-medium">{post.title ?? "Untitled"}</p>
                </div>
                <Link href={`/dashboard/posts/${post.id}/edit`} className="text-sm text-[var(--accent)]">
                  Edit
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
