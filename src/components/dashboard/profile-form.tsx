"use client";

import { useState } from "react";
import type { Theme, User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio ?? "",
    theme: user.theme,
    avatarUrl: user.avatarUrl ?? ""
  });
  const [status, setStatus] = useState<string | null>(null);

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await response.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, avatarUrl: data.url }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (!response.ok) {
      setStatus("Unable to save profile");
      return;
    }
    setStatus("Profile updated");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select id="theme" value={form.theme} onChange={(event) => setForm((prev) => ({ ...prev, theme: event.target.value as Theme }))}>
            <option value="LIGHT">LIGHT</option>
            <option value="DARK">DARK</option>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={form.bio} onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar</Label>
        <Input id="avatar" value={form.avatarUrl} onChange={(event) => setForm((prev) => ({ ...prev, avatarUrl: event.target.value }))} />
        <input type="file" onChange={handleAvatarUpload} className="text-sm text-[var(--text-secondary)]" />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit">Save</Button>
        {status && <span className="text-sm text-[var(--text-secondary)]">{status}</span>}
      </div>
    </form>
  );
}
