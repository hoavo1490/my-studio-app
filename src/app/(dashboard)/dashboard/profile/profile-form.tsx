"use client";

import { ChangeEvent, useState, useTransition } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { User } from "@/lib/types";

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [theme, setTheme] = useState<User["theme"]>(user.theme);
  const [pending, startTransition] = useTransition();
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  async function handleAvatarUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.url) {
        setAvatarUrl(data.url);
      }
    } finally {
      setAvatarUploading(false);
      event.target.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    startTransition(async () => {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, avatarUrl, theme }),
      });
      setStatus(res.ok ? "saved" : "error");
    });
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Theme</Label>
          <Select value={theme} onValueChange={(value) => setTheme(value as User["theme"])}>
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LIGHT">Light</SelectItem>
              <SelectItem value="DARK">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Bio</Label>
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Let people into your practice" />
      </div>
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Avatar</Label>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="h-20 w-20 overflow-hidden rounded-full border border-[var(--card-border)] bg-[var(--bg-secondary)]">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-secondary)]">
                No avatar
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://" />
            <Button type="button" variant="outline" disabled={avatarUploading} asChild>
              <label className="flex cursor-pointer items-center gap-2">
                <Upload className="h-4 w-4" />
                {avatarUploading ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarUpload} />
              </label>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {status !== "idle" ? (
          <p className={status === "saved" ? "text-sm text-green-600" : "text-sm text-red-500"}>
            {status === "saved" ? "Profile updated." : "Unable to save changes."}
          </p>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </form>
  );
}
