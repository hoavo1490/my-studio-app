"use client";

import { useState } from "react";

interface ImageLightboxProps {
  images: string[];
}

export function ImageLightbox({ images }: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function close() {
    setActiveIndex(null);
  }

  function next(step: number) {
    if (activeIndex === null) return;
    const nextIndex = (activeIndex + step + images.length) % images.length;
    setActiveIndex(nextIndex);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((src, index) => (
          <div key={src} onClick={() => setActiveIndex(index)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Gallery ${index + 1}`} className="h-48 w-full cursor-zoom-in rounded-2xl object-cover" />
          </div>
        ))}
      </div>
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button className="absolute right-6 top-6 text-white" onClick={close}>
            Close
          </button>
          <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white" onClick={() => next(-1)}>
            Prev
          </button>
          <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white" onClick={() => next(1)}>
            Next
          </button>
          <div className="max-h-[80vh] max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[activeIndex]} alt="Active" className="h-full w-full rounded-3xl object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
