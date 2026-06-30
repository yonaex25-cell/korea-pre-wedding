export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      studios: {
        Row: {
          id: string;
          slug: string;
          name: string;
          region: string;
          styles: string[];
          budget: string;
          price_from_jpy: number;
          duration_hours: number;
          summary: string;
          description: string;
          hero_image: string;
          included_services: string[];
          featured: boolean;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["studios"]["Row"]> & {
          slug: string;
          name: string;
          region: string;
          styles: string[];
          budget: string;
          price_from_jpy: number;
          duration_hours: number;
          summary: string;
          description: string;
          hero_image: string;
          included_services: string[];
        };
        Update: Partial<Database["public"]["Tables"]["studios"]["Row"]>;
      };
      studio_images: {
        Row: {
          id: string;
          studio_id: string;
          image_url: string;
          alt: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["studio_images"]["Row"]> & {
          studio_id: string;
          image_url: string;
          alt: string;
        };
        Update: Partial<Database["public"]["Tables"]["studio_images"]["Row"]>;
      };
      reservations: {
        Row: {
          id: string;
          studio_id: string | null;
          name: string;
          email: string;
          line_id: string;
          preferred_date: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["reservations"]["Row"]> & {
          name: string;
          email: string;
          line_id: string;
          preferred_date: string;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["reservations"]["Row"]>;
      };
      reviews: {
        Row: {
          id: string;
          studio_id: string | null;
          customer_name: string;
          location: string;
          rating: number;
          body: string;
          image_url: string | null;
          is_published: boolean;
          published_at: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["reviews"]["Row"]> & {
          customer_name: string;
          location: string;
          rating: number;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
      };
      faqs: {
        Row: {
          id: string;
          studio_id: string | null;
          category: string;
          question: string;
          answer: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["faqs"]["Row"]> & {
          category: string;
          question: string;
          answer: string;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Row"]>;
      };
    };
  };
};
