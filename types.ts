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
        Insert: {
          id?: string;
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
          featured?: boolean;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          region?: string;
          styles?: string[];
          budget?: string;
          price_from_jpy?: number;
          duration_hours?: number;
          summary?: string;
          description?: string;
          hero_image?: string;
          included_services?: string[];
          featured?: boolean;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          studio_id: string;
          image_url: string;
          alt: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          studio_id?: string;
          image_url?: string;
          alt?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "studio_images_studio_id_fkey";
            columns: ["studio_id"];
            isOneToOne: false;
            referencedRelation: "studios";
            referencedColumns: ["id"];
          }
        ];
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
        Insert: {
          id?: string;
          studio_id?: string | null;
          name: string;
          email: string;
          line_id: string;
          preferred_date: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          studio_id?: string | null;
          name?: string;
          email?: string;
          line_id?: string;
          preferred_date?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_studio_id_fkey";
            columns: ["studio_id"];
            isOneToOne: false;
            referencedRelation: "studios";
            referencedColumns: ["id"];
          }
        ];
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
        Insert: {
          id?: string;
          studio_id?: string | null;
          customer_name: string;
          location: string;
          rating: number;
          body: string;
          image_url?: string | null;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          studio_id?: string | null;
          customer_name?: string;
          location?: string;
          rating?: number;
          body?: string;
          image_url?: string | null;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_studio_id_fkey";
            columns: ["studio_id"];
            isOneToOne: false;
            referencedRelation: "studios";
            referencedColumns: ["id"];
          }
        ];
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
        Insert: {
          id?: string;
          studio_id?: string | null;
          category: string;
          question: string;
          answer: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          studio_id?: string | null;
          category?: string;
          question?: string;
          answer?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "faqs_studio_id_fkey";
            columns: ["studio_id"];
            isOneToOne: false;
            referencedRelation: "studios";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
