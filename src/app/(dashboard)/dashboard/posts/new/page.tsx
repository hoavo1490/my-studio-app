import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { PostEditor } from "@/components/posts/post-editor";

export default function NewPostPage() {
  const user = getCurrentSession();
  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Create</p>
        <h1 className="text-3xl font-semibold">New Post</h1>
      </div>
      <PostEditor />
    </div>
  );
}
