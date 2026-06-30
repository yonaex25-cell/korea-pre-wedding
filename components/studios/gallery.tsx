import Image from "next/image";
import type { Studio } from "@/lib/types";

export function Gallery({ studio }: { studio: Studio }) {
  const images = [studio.heroImage, ...studio.images];

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-2 md:row-span-2">
        <Image src={images[0]} alt={`${studio.name} main gallery`} fill priority className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      {images.slice(1, 5).map((image, index) => (
        <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={image} alt={`${studio.name} gallery image ${index + 2}`} fill className="object-cover" sizes="(min-width: 768px) 25vw, 50vw" />
        </div>
      ))}
    </div>
  );
}
