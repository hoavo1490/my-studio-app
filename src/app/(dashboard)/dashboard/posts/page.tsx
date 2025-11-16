import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";
import { listCurrentUserPosts } from "@/lib/data-service";

export default async function PostsPage() {
  const user = getCurrentSession();
  if (!user) {
    notFound();
  }
  const posts = await listCurrentUserPosts(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Posts</h1>
        <Link href="/dashboard/posts/new">
          <Button>New Post</Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-[var(--card-border)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--bg-secondary)]">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Pinned</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-[var(--card-border)]">
                <td className="px-4 py-3">{post.title ?? "Untitled"}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{post.type}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">{post.isPinned ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Button variant="ghost" className="text-sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
