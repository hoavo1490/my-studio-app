import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { CreatorHero } from "@/components/creator/creator-hero";
import { CreatorFeed } from "@/components/creator/creator-feed";
import { SiteShell } from "@/components/layout/site-shell";
import { serializePost, serializeUser } from "@/lib/serializers";

interface PageProps {
  params: { username: string };
}

export default async function CreatorPage({ params }: PageProps) {
  const username = decodeURIComponent(params.username);
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    notFound();
  }
  const posts = await prisma.post.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
  const serialUser = serializeUser(user);
  const serializedPosts = posts.map((post) => serializePost(post));
  const pinnedPost = serializedPosts.find((post) => post.isPinned) ?? null;

  return (
    <SiteShell theme={serialUser.theme}>
      <div className="space-y-10">
        <CreatorHero user={serialUser} pinnedPost={pinnedPost} />
        <CreatorFeed posts={serializedPosts} />
      </div>
    </SiteShell>
  );
}
