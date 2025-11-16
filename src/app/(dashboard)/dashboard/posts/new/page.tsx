import { PostEditor } from "@/components/posts/post-editor";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--text-secondary)]">Create</p>
        <h2 className="text-3xl font-semibold">New post</h2>
      </div>
      <PostEditor />
    </div>
  );
}
