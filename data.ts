import type { FAQ, Review, Studio } from "@/lib/types";

const createdAt = "2026-01-15T09:00:00.000Z";

export const demoStudios: Studio[] = [
  {
    id: "demo-maison-de-luna-seoul",
    slug: "maison-de-luna-seoul",
    name: "Maison de Luna Seoul",
    region: "Seoul",
    city: "Gangnam",
    styles: ["Classic", "Editorial"],
    budget: "Premium",
    budgetMin: 280000,
    budgetMax: 620000,
    priceFrom: 320000,
    priceFromJpy: 320000,
    durationHours: 5,
    currency: "JPY",
    description: "A refined Gangnam studio for elegant Korean wedding portraits with editorial lighting and graceful direction.",
    summary: "A refined Gangnam studio for elegant Korean wedding portraits with editorial lighting and graceful direction.",
    longDescription: "Maison de Luna Seoul combines polished studio sets, premium dress styling, detailed hair and makeup, and calm posing guidance. It is a strong match for couples who want timeless Korean wedding photography with concierge support before and during the shoot.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    images: [
      { id: "luna-1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85", alt: "Seoul studio wedding portrait", sortOrder: 0 },
      { id: "luna-2", url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85", alt: "Elegant bridal styling", sortOrder: 1 },
      { id: "luna-3", url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85", alt: "Classic couple portrait", sortOrder: 2 }
    ],
    services: ["Two dresses", "One tuxedo", "Hair and makeup", "Concierge coordination", "20 retouched images"],
    includedServices: ["Two dresses", "One tuxedo", "Hair and makeup", "Concierge coordination", "20 retouched images"],
    destinations: ["Gangnam", "Seongsu", "Bukchon"],
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    reviews: [],
    faqs: []
  },
  {
    id: "demo-atelier-haneul-jeju",
    slug: "atelier-haneul-jeju",
    name: "Atelier Haneul Jeju",
    region: "Jeju",
    city: "Aewol",
    styles: ["Natural", "Resort"],
    budget: "Premium",
    budgetMin: 360000,
    budgetMax: 780000,
    priceFrom: 420000,
    priceFromJpy: 420000,
    durationHours: 5,
    currency: "JPY",
    description: "A Jeju outdoor photography team for bright coastal, garden, and resort-inspired wedding sessions.",
    summary: "A Jeju outdoor photography team for bright coastal, garden, and resort-inspired wedding sessions.",
    longDescription: "Atelier Haneul Jeju focuses on sea light, open landscapes, soft garden scenes, and relaxed movement. The team helps plan routes, timing, transport, styling, and weather alternatives for destination wedding photography in Jeju.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    images: [
      { id: "haneul-1", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85", alt: "Jeju coastline for wedding portraits", sortOrder: 0 },
      { id: "haneul-2", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", alt: "Jeju garden location", sortOrder: 1 },
      { id: "haneul-3", url: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=85", alt: "Soft outdoor wedding scene", sortOrder: 2 }
    ],
    services: ["Two dresses", "Hair and makeup", "Location vehicle", "Bouquet styling", "25 retouched images"],
    includedServices: ["Two dresses", "Hair and makeup", "Location vehicle", "Bouquet styling", "25 retouched images"],
    destinations: ["Aewol Coast", "Seopjikoji", "Camellia Hill"],
    featured: true,
    rating: 4.8,
    reviewCount: 27,
    reviews: [],
    faqs: []
  },
  {
    id: "demo-busan-lumiere-studio",
    slug: "busan-lumiere-studio",
    name: "Busan Lumiere Studio",
    region: "Busan",
    city: "Haeundae",
    styles: ["Cinematic", "Modern"],
    budget: "Premium",
    budgetMin: 260000,
    budgetMax: 560000,
    priceFrom: 300000,
    priceFromJpy: 300000,
    durationHours: 5,
    currency: "JPY",
    description: "A cinematic Busan studio combining ocean horizons, city lights, and modern couple portraits.",
    summary: "A cinematic Busan studio combining ocean horizons, city lights, and modern couple portraits.",
    longDescription: "Busan Lumiere Studio is ideal for couples who want a mix of beach, bridge, skyline, and night-view photography. The schedule is designed for shorter trips while keeping the images polished and dramatic.",
    coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    heroImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    images: [
      { id: "lumiere-1", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85", alt: "Cinematic wedding styling", sortOrder: 0 },
      { id: "lumiere-2", url: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?auto=format&fit=crop&w=1200&q=85", alt: "Busan sea mood", sortOrder: 1 },
      { id: "lumiere-3", url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85", alt: "Modern wedding couple", sortOrder: 2 }
    ],
    services: ["One dress", "One tuxedo", "Hair and makeup", "Night-view session", "18 retouched images"],
    includedServices: ["One dress", "One tuxedo", "Hair and makeup", "Night-view session", "18 retouched images"],
    destinations: ["Haeundae", "Gwangalli", "Dongbaek Island"],
    featured: true,
    rating: 4.7,
    reviewCount: 22,
    reviews: [],
    faqs: []
  },
  {
    id: "demo-minuette-seongsu",
    slug: "minuette-seongsu",
    name: "Minuette Seongsu",
    region: "Seoul",
    city: "Seongsu",
    styles: ["Minimal", "Modern"],
    budget: "Premium",
    budgetMin: 220000,
    budgetMax: 480000,
    priceFrom: 260000,
    priceFromJpy: 260000,
    durationHours: 5,
    currency: "JPY",
    description: "A clean white-set studio in Seongsu for minimal, modern, and naturally polished portraits.",
    summary: "A clean white-set studio in Seongsu for minimal, modern, and naturally polished portraits.",
    longDescription: "Minuette Seongsu uses calm lighting, clean interiors, and simple composition to create refined images with a contemporary Korean mood. It works well for couples who prefer understated elegance.",
    coverImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85",
    heroImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85",
    images: [
      { id: "minuette-1", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85", alt: "Minimal Seoul wedding set", sortOrder: 0 },
      { id: "minuette-2", url: "https://images.unsplash.com/photo-1482575832494-771f74bf6857?auto=format&fit=crop&w=1200&q=85", alt: "Clean bridal portrait", sortOrder: 1 }
    ],
    services: ["One dress", "Hair and makeup", "Indoor studio set", "15 retouched images"],
    includedServices: ["One dress", "Hair and makeup", "Indoor studio set", "15 retouched images"],
    destinations: ["Seongsu", "Seoul Forest"],
    featured: false,
    rating: 4.6,
    reviewCount: 18,
    reviews: [],
    faqs: []
  },
  {
    id: "demo-royal-hanbok-house",
    slug: "royal-hanbok-house",
    name: "Royal Hanbok House",
    region: "Seoul",
    city: "Jongno",
    styles: ["Hanbok", "Classic"],
    budget: "Premium",
    budgetMin: 240000,
    budgetMax: 520000,
    priceFrom: 290000,
    priceFromJpy: 290000,
    durationHours: 5,
    currency: "JPY",
    description: "A classic Seoul studio for hanbok styling and palace-inspired wedding photography.",
    summary: "A classic Seoul studio for hanbok styling and palace-inspired wedding photography.",
    longDescription: "Royal Hanbok House is built for couples who want Korean cultural styling, graceful hanbok portraits, and historic Seoul backdrops. The team supports styling, location timing, and respectful palace-area photography planning.",
    coverImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
    heroImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
    images: [
      { id: "hanbok-1", url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85", alt: "Traditional wedding styling", sortOrder: 0 },
      { id: "hanbok-2", url: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&w=1200&q=85", alt: "Historic palace mood", sortOrder: 1 }
    ],
    services: ["Two hanbok looks", "Hair and makeup", "Palace-area session", "Concierge guidance", "18 retouched images"],
    includedServices: ["Two hanbok looks", "Hair and makeup", "Palace-area session", "Concierge guidance", "18 retouched images"],
    destinations: ["Bukchon", "Gyeongbokgung", "Ikseon-dong"],
    featured: false,
    rating: 4.8,
    reviewCount: 31,
    reviews: [],
    faqs: []
  },
  {
    id: "demo-oro-jeju-garden",
    slug: "oro-jeju-garden",
    name: "Oro Jeju Garden",
    region: "Jeju",
    city: "Seogwipo",
    styles: ["Natural", "Classic"],
    budget: "Premium",
    budgetMin: 330000,
    budgetMax: 690000,
    priceFrom: 380000,
    priceFromJpy: 380000,
    durationHours: 5,
    currency: "JPY",
    description: "A Jeju garden team for floral, stone-wall, and coastal wedding photography routes.",
    summary: "A Jeju garden team for floral, stone-wall, and coastal wedding photography routes.",
    longDescription: "Oro Jeju Garden plans soft, romantic routes through seasonal flowers, Jeju stone textures, and open coastal scenery. It is a comfortable choice for couples traveling with family or seeking a gentle outdoor mood.",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1400&q=85",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1400&q=85",
    images: [
      { id: "oro-1", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1400&q=85", alt: "Garden wedding flowers", sortOrder: 0 },
      { id: "oro-2", url: "https://images.unsplash.com/photo-1460364157752-926555421a7e?auto=format&fit=crop&w=1200&q=85", alt: "Jeju floral location", sortOrder: 1 }
    ],
    services: ["Two dresses", "Hair and makeup", "Outdoor session", "Family travel guidance", "22 retouched images"],
    includedServices: ["Two dresses", "Hair and makeup", "Outdoor session", "Family travel guidance", "22 retouched images"],
    destinations: ["Seogwipo", "Camellia Hill", "Sanbangsan"],
    featured: false,
    rating: 4.7,
    reviewCount: 16,
    reviews: [],
    faqs: []
  }
];

export const demoReviews: Review[] = [
  {
    id: "review-1",
    studioId: "demo-maison-de-luna-seoul",
    studioName: "Maison de Luna Seoul",
    studioSlug: "maison-de-luna-seoul",
    customerName: "Mika & Ren",
    country: "Japan",
    rating: 5,
    content: "Dasoni helped us compare styles clearly, and the Seoul studio felt calm from the first consultation to the final gallery.",
    imageUrl: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
    createdAt
  },
  {
    id: "review-2",
    studioId: "demo-atelier-haneul-jeju",
    studioName: "Atelier Haneul Jeju",
    studioSlug: "atelier-haneul-jeju",
    customerName: "Aoi & Kenta",
    country: "Japan",
    rating: 5,
    content: "The Jeju route was smooth, beautiful, and easy to understand. We loved having photography and travel details handled together.",
    imageUrl: "https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=800&q=80",
    createdAt
  },
  {
    id: "review-3",
    studioId: "demo-busan-lumiere-studio",
    studioName: "Busan Lumiere Studio",
    studioSlug: "busan-lumiere-studio",
    customerName: "Yuri & Sho",
    country: "Japan",
    rating: 5,
    content: "Busan gave us both ocean and city-night images. The recommendations matched our mood and budget very well.",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    createdAt
  }
];

export const demoFaqs: FAQ[] = [
  {
    id: "faq-1",
    category: "booking",
    question: "How early should we book a Korean wedding photography studio?",
    answer: "For spring and autumn, three to four months ahead is ideal. For quieter seasons, two months is usually workable, and you can start with a consultation before flights are finalized.",
    sortOrder: 1
  },
  {
    id: "faq-2",
    category: "travel",
    question: "Can Dasoni support international couples?",
    answer: "Yes. Dasoni is designed as a Korea wedding photography concierge, helping couples compare studios, locations, schedules, and communication details.",
    sortOrder: 2
  },
  {
    id: "faq-3",
    category: "payment",
    question: "What is usually included in the listed price?",
    answer: "Most listed packages include styling, photography, basic retouching, and selected outfit options. Transport, premium dresses, or extra retouching may vary by studio.",
    sortOrder: 3
  },
  {
    id: "faq-4",
    category: "weather",
    question: "What happens if it rains on an outdoor shoot day?",
    answer: "Each studio has its own policy. Common options include schedule adjustment, indoor studio alternatives, or changing the location route when possible.",
    sortOrder: 4
  }
];

export const destinations = [
  {
    name: "Seoul",
    label: "Seoul",
    description: "Studio polish, city walks, hanbok styling, and trend-forward wedding photography in one destination.",
    summary: "Studio polish, city walks, hanbok styling, and trend-forward wedding photography in one destination.",
    image: "/images/hero-couple.jpg"
  },
  {
    name: "Jeju",
    label: "Jeju Island",
    description: "Ocean, fields, gardens, volcanic textures, and soft natural light for destination photography.",
    summary: "Ocean, fields, gardens, volcanic textures, and soft natural light for destination photography.",
    image: "/images/hero-card-bright.JPG"
  },
  {
    name: "Busan",
    label: "Busan",
    description: "Haeundae, Gwangalli, bridges, skyline, and cinematic coastal city wedding photography.",
    summary: "Haeundae, Gwangalli, bridges, skyline, and cinematic coastal city wedding photography.",
    image: "/images/hero-couple.jpg"
  }
];

export function attachDemoRelations(studios: Studio[]) {
  return studios.map((studio) => ({
    ...studio,
    reviews: demoReviews.filter((review) => review.studioSlug === studio.slug),
    faqs: demoFaqs
  }));
}

export const studios = demoStudios;
export const reviews = demoReviews;
export const faqs = demoFaqs;
