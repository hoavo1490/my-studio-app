import { PostEditor } from "@/components/posts/post-editor";

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Create</p>
        <h2 className="text-3xl font-semibold">New post</h2>
        <p className="text-sm text-[var(--text-secondary)]">Start with a title or drop in media.</p>
      </div>
      <PostEditor />
    </div>
  );
}
