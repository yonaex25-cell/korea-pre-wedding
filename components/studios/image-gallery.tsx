"use client";

import Image from "next/image";
import { useState } from "react";
import type { StudioImage } from "@/lib/types";
import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: StudioImage[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-soft">
        <Image src={selected.url} alt={selected.alt || title} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" priority />
      </div>
      <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelected(image)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted transition",
              selected.id === image.id ? "border-gold-500 ring-2 ring-gold-300" : "border-border hover:border-gold-300"
            )}
            aria-label={image.alt}
          >
            <Image src={image.url} alt={image.alt} fill sizes="180px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
