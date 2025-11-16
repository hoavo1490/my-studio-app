"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Post, PostType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface PostEditorProps {
  post?: Post;
}

const postTypes: PostType[] = ["IMAGE", "VIDEO", "AUDIO", "TEXT"];

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: post?.type ?? "IMAGE",
    title: post?.title ?? "",
    content: post?.content ?? "",
    embedUrl: post?.embedUrl ?? "",
    tags: post?.tags?.join(",") ?? "",
    mediaUrls: post?.mediaUrls ?? []
  });

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (data.url) {
        uploaded.push(data.url);
      }
    }
    setForm((prev) => ({ ...prev, mediaUrls: [...prev.mediaUrls, ...uploaded] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    };

    startTransition(async () => {
      const response = await fetch(post ? `/api/posts/${post.id}` : "/api/posts", {
        method: post ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus(data.error ?? "Unable to save post");
        return;
      }
      setStatus("Saved");
      router.refresh();
    });
  }

  function removeMedia(url: string) {
    setForm((prev) => ({ ...prev, mediaUrls: prev.mediaUrls.filter((item) => item !== url) }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Post Type</Label>
          <Select
            id="type"
            value={form.type}
            onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as PostType }))}
          >
            {postTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Night studies"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={form.content}
          onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
          placeholder="Write a short caption or process note"
        />
      </div>
      {form.type !== "TEXT" && (
        <div className="space-y-2">
          <Label htmlFor="media">Media Uploads</Label>
          <input
            id="media"
            type="file"
            multiple={form.type === "IMAGE"}
            accept={form.type === "IMAGE" ? "image/*" : form.type === "VIDEO" ? "video/*" : "audio/*"}
            onChange={(event) => handleUpload(event.target.files)}
            className="block w-full text-sm text-[var(--text-secondary)]"
          />
          {form.mediaUrls.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {form.mediaUrls.map((url) => (
                <div key={url} className="flex items-center gap-2 rounded-full border border-[var(--card-border)] px-3 py-1 text-xs">
                  <span className="max-w-[160px] truncate">{url}</span>
                  <button type="button" onClick={() => removeMedia(url)} className="text-red-500">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {(form.type === "VIDEO" || form.type === "AUDIO") && (
        <div className="space-y-2">
          <Label htmlFor="embed">Embed URL</Label>
          <Input
            id="embed"
            placeholder="https://youtube.com/..."
            value={form.embedUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, embedUrl: event.target.value }))}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={form.tags}
          placeholder="photography, analog"
          onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {post ? "Save Changes" : "Publish"}
        </Button>
        {status && <span className="text-sm text-[var(--text-secondary)]">{status}</span>}
      </div>
    </form>
  );
}
