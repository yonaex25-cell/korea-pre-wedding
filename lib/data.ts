import type { FAQ, Review, Studio } from "@/lib/types";

export const studios: Studio[] = [
  {
    id: "7b9a3a3c-0c85-4d11-82d7-1de9151032fb",
    slug: "maison-de-lumiere-seoul",
    name: "Maison de Lumiere Seoul",
    region: "Seoul",
    styles: ["Classic", "Editorial", "Modern"],
    budget: "Luxury",
    priceFromJpy: 328000,
    durationHours: 6,
    summary: "Architectural Seoul studio with couture gowns, cinematic lighting, and concierge translation.",
    description:
      "Maison de Lumiere Seoul creates polished editorial portraits with refined studio sets, elegant gown styling, and a private Japanese-speaking coordinator from consultation through image selection.",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85"
    ],
    includedServices: [
      "Two premium gowns and one tuxedo",
      "Hair and makeup with pre-shoot consultation",
      "Japanese-speaking coordinator",
      "20 retouched high-resolution images",
      "Private car transfer within central Seoul"
    ],
    faqs: [
      {
        id: "studio-faq-1",
        category: "studio",
        question: "Can we add a night city location?",
        answer: "Yes. Night location coverage is available as an optional add-on and is best reserved four weeks ahead."
      }
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 126
  },
  {
    id: "be2d6f77-902d-4b48-b6a5-0aeacff40b31",
    slug: "jeju-atelier-veil",
    name: "Jeju Atelier Veil",
    region: "Jeju",
    styles: ["Natural", "Editorial"],
    budget: "Signature",
    priceFromJpy: 468000,
    durationHours: 8,
    summary: "A destination atelier for ocean cliffs, botanical gardens, and soft natural imagery.",
    description:
      "Jeju Atelier Veil specializes in relaxed destination sessions that pair island scenery with understated luxury. Their team handles weather planning, vehicle routing, and bilingual communication.",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85"
    ],
    includedServices: [
      "One gown, one casual dress, and one tuxedo",
      "Outdoor location permits",
      "Weather backup planning",
      "35 retouched high-resolution images",
      "Full-day private van"
    ],
    faqs: [
      {
        id: "studio-faq-2",
        category: "studio",
        question: "What happens if the weather changes?",
        answer: "The studio confirms a weather plan 48 hours before the shoot and can shift between coastal, garden, and indoor routes."
      }
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 98
  },
  {
    id: "26c7a3b7-3bc1-4554-a265-78c26f52ed40",
    slug: "busan-golden-hour",
    name: "Busan Golden Hour",
    region: "Busan",
    styles: ["Natural", "Modern"],
    budget: "Premium",
    priceFromJpy: 248000,
    durationHours: 5,
    summary: "Elegant coastal portraits around Haeundae, Gwangan Bridge, and warm studio interiors.",
    description:
      "Busan Golden Hour is ideal for couples who want relaxed city-and-sea images with efficient planning, transparent packages, and a crisp modern finish.",
    heroImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?auto=format&fit=crop&w=1200&q=85"
    ],
    includedServices: [
      "One gown and one tuxedo",
      "Studio plus one outdoor location",
      "Korean and Japanese itinerary guide",
      "15 retouched high-resolution images",
      "Digital delivery within five weeks"
    ],
    faqs: [
      {
        id: "studio-faq-3",
        category: "studio",
        question: "Is this package good for first-time Korea travelers?",
        answer: "Yes. It is designed around simple transportation and compact timing for couples on a short Busan trip."
      }
    ],
    featured: true,
    rating: 4.7,
    reviewCount: 73
  },
  {
    id: "d8c31f2e-a73f-42de-b99c-dcd7547c75e7",
    slug: "hanbok-house-namsan",
    name: "Hanbok House Namsan",
    region: "Seoul",
    styles: ["Hanbok", "Classic"],
    budget: "Premium",
    priceFromJpy: 286000,
    durationHours: 5,
    summary: "Refined hanbok portraits with palace-inspired sets and Namsan outdoor options.",
    description:
      "Hanbok House Namsan blends traditional silhouettes with soft contemporary retouching for couples who want Korea-specific imagery without a costume-like finish.",
    heroImage:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1600&q=85",
    images: [
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"
    ],
    includedServices: [
      "Two premium hanbok looks",
      "Traditional hair styling",
      "Palace-inspired indoor sets",
      "12 retouched high-resolution images",
      "Japanese style consultation"
    ],
    faqs: [],
    featured: false,
    rating: 4.8,
    reviewCount: 44
  }
];

export const reviews: Review[] = [
  {
    id: "review-1",
    studioId: studios[0].id,
    customerName: "Ami & Ren",
    location: "Tokyo",
    rating: 5,
    body:
      "The coordinator understood exactly what Japanese couples worry about. Dress fitting, translation, and image selection were calm and beautifully organized.",
    publishedAt: "2026-02-14"
  },
  {
    id: "review-2",
    studioId: studios[1].id,
    customerName: "Mika & Sho",
    location: "Osaka",
    rating: 5,
    body:
      "Jeju felt like a honeymoon and a photoshoot in one. The team moved quickly when the wind changed and the final photos were graceful.",
    publishedAt: "2026-03-22"
  },
  {
    id: "review-3",
    studioId: studios[2].id,
    customerName: "Yui & Haruto",
    location: "Fukuoka",
    rating: 5,
    body:
      "Busan was easy from Japan, and the package had no confusing surprises. We loved the clean modern color grading.",
    publishedAt: "2026-04-09"
  }
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    category: "general",
    question: "Can Japanese customers reserve without speaking Korean?",
    answer:
      "Yes. Korea Pre Wedding coordinates in Japanese and English, and partner studios provide translated planning notes before the shoot."
  },
  {
    id: "faq-2",
    category: "reservation",
    question: "How early should we reserve a studio?",
    answer:
      "For Seoul studios, reserve 8 to 12 weeks ahead. For Jeju and peak cherry blossom or autumn dates, 12 to 20 weeks is recommended."
  },
  {
    id: "faq-3",
    category: "travel",
    question: "Do packages include flights and hotels?",
    answer:
      "Photo packages do not include flights or hotels. The concierge team can share recommended districts and shooting-day transport guidance."
  },
  {
    id: "faq-4",
    category: "general",
    question: "Can we request a specific style before booking?",
    answer:
      "Yes. Use the AI recommendation questionnaire or contact form to share your preferred mood, budget, and season."
  }
];

export const regions = ["Seoul", "Jeju", "Busan"] as const;
export const styles = ["Classic", "Modern", "Natural", "Editorial", "Hanbok"] as const;
