"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
          <p className="text-sm text-[var(--text-secondary)]">Welcome back</p>
          <h1 className="text-3xl font-semibold">Sign in</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </SiteShell>
  );
}
