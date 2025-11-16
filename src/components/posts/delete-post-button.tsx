"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      router.refresh();
    });
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleDelete} disabled={pending}>
      Delete
    </Button>
  );
}
