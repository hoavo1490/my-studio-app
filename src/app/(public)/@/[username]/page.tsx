import { notFound } from "next/navigation";
import { CreatorHero } from "@/components/creator/creator-hero";
import { CreatorFeed } from "@/components/creator/creator-feed";
import { listPublicPosts } from "@/lib/data-service";

interface CreatorPageProps {
  params: { username: string };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const result = await listPublicPosts(params.username);
  if (!result) {
    notFound();
  }
  const posts = result.posts.map((post) => ({ ...post, user: result.user }));
  const pinnedPost = posts.find((post) => post.isPinned);

  return (
    <div className={result.user.theme === "DARK" ? "dark" : undefined}>
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-10">
        <CreatorHero user={result.user} pinnedPost={pinnedPost} />
        <CreatorFeed posts={posts} />
      </div>
    </div>
  );
}
