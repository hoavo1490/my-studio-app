import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { PostEditor } from "@/components/posts/post-editor";
import { getPostById } from "@/lib/data-service";

interface EditPageProps {
  params: { postId: string };
}

export default async function EditPostPage({ params }: EditPageProps) {
  const user = getCurrentSession();
  if (!user) {
    notFound();
  }
  const post = await getPostById(params.postId);
  if (!post || post.userId !== user.id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Edit</p>
        <h1 className="text-3xl font-semibold">{post.title ?? "Untitled"}</h1>
      </div>
      <PostEditor post={post} />
    </div>
  );
}
