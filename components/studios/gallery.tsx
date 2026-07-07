import Image from "next/image";
import type { Studio, StudioImage } from "@/lib/types";

type GalleryImage = {
  url: string;
  alt: string;
};

function toGalleryImage(image: string | StudioImage, fallbackAlt: string): GalleryImage | null {
  if (typeof image === "string") {
    return image ? { url: image, alt: fallbackAlt } : null;
  }

  return image.url ? { url: image.url, alt: image.alt || fallbackAlt } : null;
}

export function Gallery({ studio }: { studio: Studio }) {
  const images = [studio.heroImage, ...studio.images]
    .map((image, index) => toGalleryImage(image, `${studio.name} gallery image ${index + 1}`))
    .filter((image): image is GalleryImage => Boolean(image));

  if (!images.length) {
    return null;
  }

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-2 md:row-span-2">
        <Image src={images[0].url} alt={images[0].alt} fill priority className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      {images.slice(1, 5).map((image, index) => (
        <div key={`${image.url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(min-width: 768px) 25vw, 50vw" />
        </div>
      ))}
    </div>
  );
}