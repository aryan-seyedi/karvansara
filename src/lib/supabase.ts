import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndgxwfaxdszkuhkuodez.supabase.co';
// Using the service_role key from credentials.md for server-side operations
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZ3h3ZmF4ZHN6a3Voa3VvZGV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQzODgzNCwiZXhwIjoyMDkxMDE0ODM0fQ.bvx8hHzAAE1-TLmhMoa_eRRxnZ_Aw4-plwY_wtydt5I';

export const supabase = createClient(supabaseUrl, supabaseKey);
