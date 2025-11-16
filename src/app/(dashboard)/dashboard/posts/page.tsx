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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <Button asChild>
          <Link href="/dashboard/posts/new">New Post</Link>
        </Button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[var(--card-border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--card-border)]/40 text-left uppercase tracking-[0.3em] text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Pinned</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serializedPosts.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-[var(--text-secondary)]" colSpan={5}>
                  No posts yet.
                </td>
              </tr>
            ) : (
              serializedPosts.map((post) => (
                <tr key={post.id} className="border-t border-[var(--card-border)]">
                  <td className="px-4 py-3 font-medium">{post.title ?? "Untitled"}</td>
                  <td className="px-4 py-3">{post.type}</td>
                  <td className="px-4 py-3">{post.isPinned ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link href={`/dashboard/posts/${post.id}/edit`} className="text-[var(--accent)]">
                        Edit
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
