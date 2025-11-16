import Link from "next/link";
import { notFound } from "next/navigation";
import { listPublicPosts } from "@/lib/data-service";
import { PostPageContent } from "@/components/posts/post-page-content";
import { ImageLightbox } from "@/components/posts/image-lightbox";

interface PostPageProps {
  params: { username: string; postId: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const result = await listPublicPosts(params.username);
  if (!result) {
    notFound();
  }
  const post = result.posts.find((item) => item.id === params.postId);
  if (!post) {
    notFound();
  }
  const hydratedPost = { ...post, user: result.user };

  const showLightbox = hydratedPost.type === "IMAGE" && (hydratedPost.mediaUrls?.length ?? 0) > 1;

  return (
    <div className={result.user.theme === "DARK" ? "dark" : undefined}>
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <Link href={`/@/${params.username}`} className="text-sm text-[var(--text-secondary)]">
          ← Back to @{params.username}
        </Link>
        <PostPageContent post={hydratedPost} user={result.user} />
        {showLightbox && hydratedPost.mediaUrls && <ImageLightbox images={hydratedPost.mediaUrls} />}
      </div>
    </div>
  );
}
