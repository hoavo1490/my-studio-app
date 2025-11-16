"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", username: "", name: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">Join duskroom</p>
          <h1 className="text-3xl font-semibold">Create your studio</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </div>
    </SiteShell>
  );
}
