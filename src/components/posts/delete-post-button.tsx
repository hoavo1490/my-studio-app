"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("Delete this post? This cannot be undone.")) {
      return;
    }
    startTransition(async () => {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-sm text-[var(--text-secondary)] underline decoration-transparent underline-offset-4 transition hover:text-[var(--text-primary)] hover:decoration-[var(--text-primary)] disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
