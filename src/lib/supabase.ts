import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window === 'undefined') {
    console.error('Supabase credentials missing in Environment Variables.');
  }
}

// Use Anon key for client-side/public access to respect RLS
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
