"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  images: string[];
  title?: string | null;
}

export function ImageLightbox({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="grid gap-3 md:grid-cols-2">
        {images.map((url, idx) => (
          <button
            type="button"
            key={url}
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl"
          >
            <Image src={url} alt={title ?? "Artwork"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </button>
        ))}
      </div>
      <DialogContent>
        <div className="relative aspect-video w-full">
          <Image src={images[index]} alt={title ?? "Artwork"} fill className="object-contain" sizes="90vw" />
        </div>
        {images.length > 1 ? (
          <div className="mt-4 flex justify-between text-white">
            <Button type="button" variant="ghost" onClick={prev} className="text-white">
              Prev
            </Button>
            <span>
              {index + 1} / {images.length}
            </span>
            <Button type="button" variant="ghost" onClick={next} className="text-white">
              Next
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
