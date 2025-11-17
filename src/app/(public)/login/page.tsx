"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Unable to sign in.");
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-lg space-y-8 rounded-3xl border border-[var(--card-border)]/80 px-8 py-10">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]">Sign in</p>
          <h1 className="text-3xl font-semibold">Enter your studio</h1>
          <p className="text-sm text-[var(--text-secondary)]">Quietly pick up where you left off.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Email</label>
            <Input placeholder="you@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="text-center text-sm text-[var(--text-secondary)]">
          Need an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Claim your studio
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
