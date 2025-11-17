import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { PostPageContent } from "@/components/posts/post-page-content";
import { SiteShell } from "@/components/layout/site-shell";
import { serializePost } from "@/lib/serializers";

interface PageProps {
  params: { username: string; postId: string };
}

export default async function SinglePostPage({ params }: PageProps) {
  const username = decodeURIComponent(params.username);
  const post = await prisma.post.findFirst({
    where: { id: params.postId, user: { username } },
    include: { user: true },
  });
  if (!post || !post.user) {
    notFound();
  }

  const serializedPost = serializePost(post);

  return (
    <SiteShell theme={serializedPost.user?.theme}>
      <div className="space-y-12">
        <Link
          href={`/@/${serializedPost.user?.username}`}
          className="inline-flex items-center text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to @{serializedPost.user?.username}
        </Link>
        <PostPageContent post={serializedPost} />
      </div>
    </SiteShell>
  );
}
