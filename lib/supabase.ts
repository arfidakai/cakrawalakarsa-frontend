import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (will be auto-generated from Supabase)
export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          date: string;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          date: string;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          date?: string;
          image?: string | null;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          location: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          date: string;
          location?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          location?: string | null;
          image?: string | null;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image: string;
          category: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image: string;
          category?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image?: string;
          category?: string | null;
          updated_at?: string;
        };
      };
      leadership: {
        Row: {
          id: string;
          name: string;
          position: string;
          photo: string | null;
          bio: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          position: string;
          photo?: string | null;
          bio?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          position?: string;
          photo?: string | null;
          bio?: string | null;
          order?: number;
          updated_at?: string;
        };
      };
      divisions: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string | null;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon?: string | null;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string | null;
          order?: number;
          updated_at?: string;
        };
      };
    };
  };
}
