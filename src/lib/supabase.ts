import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Use Anon key for client-side/public access
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    db: {
      schema: 'public'
    }
  }
);
