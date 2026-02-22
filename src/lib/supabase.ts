import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for the database
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          full_name: string;
          age: number;
          contact_number: string;
          email_address: string | null;
          city: string | null;
          selected_product: string;
          priority: 'High' | 'Medium' | 'Low';
          urgency_score: number;
          reasoning: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          age: number;
          contact_number: string;
          email_address?: string | null;
          city?: string | null;
          selected_product: string;
          priority: 'High' | 'Medium' | 'Low';
          urgency_score: number;
          reasoning: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          age?: number;
          contact_number?: string;
          email_address?: string | null;
          city?: string | null;
          selected_product?: string;
          priority?: 'High' | 'Medium' | 'Low';
          urgency_score?: number;
          reasoning?: string;
          created_at?: string;
        };
      };
    };
  };
};
