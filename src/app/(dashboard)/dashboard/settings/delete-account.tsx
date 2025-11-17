"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DeleteAccount() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!window.confirm("Delete your account? This removes all posts permanently.")) {
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/auth/me", { method: "DELETE" });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Unable to delete account.");
      }
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--text-secondary)]">This removes your profile and every piece of media you uploaded.</p>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <Button type="button" variant="destructive" onClick={handleDelete} disabled={pending}>
        {pending ? "Deleting…" : "Delete account"}
      </Button>
    </div>
  );
}
