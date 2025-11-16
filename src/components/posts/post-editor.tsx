"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import type { Post } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface PostEditorProps {
  post?: Post;
}

const postTypes = ["IMAGE", "VIDEO", "AUDIO", "TEXT"] as const;

type PostTypeOption = (typeof postTypes)[number];

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [type, setType] = useState<PostTypeOption>((post?.type ?? "IMAGE") as PostTypeOption);
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [embedUrl, setEmbedUrl] = useState(post?.embedUrl ?? "");
  const [mediaUrls, setMediaUrls] = useState<string[]>(post?.mediaUrls ?? []);
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [isPinned, setIsPinned] = useState(post?.isPinned ?? false);

  const isImage = type === "IMAGE";
  const isVideo = type === "VIDEO";
  const isAudio = type === "AUDIO";

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      if (response.ok && json.url) {
        uploaded.push(json.url);
      }
    }
    setMediaUrls((prev) => [...prev, ...uploaded]);
  }

  function moveMedia(index: number, direction: "up" | "down") {
    setMediaUrls((prev) => {
      const clone = [...prev];
      const target = index + (direction === "up" ? -1 : 1);
      if (target < 0 || target >= clone.length) return clone;
      [clone[index], clone[target]] = [clone[target], clone[index]];
      return clone;
    });
  }

  function removeMedia(index: number) {
    setMediaUrls((prev) => prev.filter((_, idx) => idx !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = {
      type,
      title: title || null,
      content: content || null,
      mediaUrls: mediaUrls.length ? mediaUrls : null,
      embedUrl: embedUrl || null,
      tags: tags.length ? tags : null,
      isPinned,
    };

    startTransition(async () => {
      const endpoint = post ? `/api/posts/${post.id}` : "/api/posts";
      const method = post ? "PATCH" : "POST";
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/dashboard/posts");
        router.refresh();
      }
    });
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <Tabs value={type} onValueChange={(value) => setType(value as PostTypeOption)}>
        <TabsList>
          {postTypes.map((variant) => (
            <TabsTrigger key={variant} value={variant}>
              {variant}
            </TabsTrigger>
          ))}
        </TabsList>
        {postTypes.map((variant) => (
          <TabsContent key={variant} value={variant}>
            <p className="text-sm text-[var(--text-secondary)]">Configure your {variant.toLowerCase()} post.</p>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Night study" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Embed URL</label>
          <Input value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} placeholder="https://youtube.com/..." />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Body</label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share a caption or process notes" />
      </div>

      {(isImage || isVideo || isAudio) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Media uploads</label>
            <Button type="button" variant="outline" size="sm" asChild>
              <label className="flex cursor-pointer items-center gap-2">
                <Upload className="h-4 w-4" /> Upload
                <input type="file" className="hidden" multiple onChange={(e) => handleUpload(e.target.files)} />
              </label>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {mediaUrls.map((url, index) => (
              <div key={url} className="rounded-lg border border-[var(--card-border)] p-3">
                <p className="break-all text-xs text-[var(--text-secondary)]">{url}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => moveMedia(index, "up")}>
                    ↑
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => moveMedia(index, "down")}>
                    ↓
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeMedia(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <label className="text-sm font-medium">Tags</label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(tagInput);
              }
            }}
            placeholder="photography"
          />
          <Button type="button" onClick={() => addTag(tagInput)}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => removeTag(tag)}>
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="pinned">Pin this post</Label>
        <input
          id="pinned"
          type="checkbox"
          checked={isPinned}
          onChange={(e) => setIsPinned(e.target.checked)}
          className="h-4 w-4"
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full md:w-auto">
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Saving
          </span>
        ) : (
          "Save post"
        )}
      </Button>
    </form>
  );
}
