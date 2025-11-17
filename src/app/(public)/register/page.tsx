"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", username: "", name: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Unable to create account.");
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-lg space-y-8 rounded-3xl border border-[var(--card-border)]/80 px-8 py-10">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]">Join duskroom</p>
          <h1 className="text-3xl font-semibold">Create your studio</h1>
          <p className="text-sm text-[var(--text-secondary)]">Settle into a quiet space that feels like your practice.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Email</label>
            <Input
              placeholder="you@email.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Password</label>
            <Input
              placeholder="At least 6 characters"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              minLength={6}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Username</label>
            <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Name</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-[var(--text-secondary)]">
          Already have a studio?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
