import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentSession } from "@/lib/auth";
import { listCurrentUserPosts } from "@/lib/data-service";

export default async function DashboardPage() {
  const user = getCurrentSession();
  if (!user) {
    notFound();
  }
  const posts = await listCurrentUserPosts(user.id);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Welcome back</p>
          <h1 className="text-3xl font-semibold">{user.name}</h1>
        </div>
        <Link href="/dashboard/posts/new">
          <Button>New Post</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent>
            <p className="text-sm text-[var(--text-secondary)]">Total posts</p>
            <p className="text-3xl font-semibold">{posts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-[var(--text-secondary)]">Pinned</p>
            <p className="text-3xl font-semibold">{posts.filter((post) => post.isPinned).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-[var(--text-secondary)]">Last updated</p>
            <p className="text-3xl font-semibold">
              {posts[0] ? new Date(posts[0].updatedAt).toLocaleDateString() : "—"}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent posts</h2>
        <div className="space-y-3">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] p-4">
              <div>
                <p className="font-medium">{post.title ?? "Untitled"}</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {post.type} • {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <Link href={`/dashboard/posts/${post.id}/edit`}>
                <Button variant="ghost">Edit</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
