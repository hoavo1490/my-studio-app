import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { PostEditor } from "@/components/posts/post-editor";
import { serializePost } from "@/lib/serializers";

interface PageProps {
  params: { postId: string };
}

export default async function EditPostPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user) return null;
  const post = await prisma.post.findFirst({ where: { id: params.postId, userId: user.id } });
  if (!post) {
    notFound();
  }
  const serializedPost = serializePost(post);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Editing</p>
        <h2 className="text-3xl font-semibold">{serializedPost.title ?? "Untitled"}</h2>
      </div>
      <PostEditor post={serializedPost} />
    </div>
  );
}
