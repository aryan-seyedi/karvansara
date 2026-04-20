const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function reload() {
  console.log('🔄 Attempting PostgREST schema cache reload via NOTIFY...');
  const { error } = await supabase.rpc('reload_schema_cache');
  
  if (error) {
    console.log('RPC method failed (expected if not defined). Trying direct NOTIFY via raw query if possible...');
    // Since we can't run raw SQL easily via client without an RPC wrapper, 
    // we'll try a common hack: touching the table or using a dummy RPC.
    console.error('Error details:', error);
  } else {
    console.log('✅ Schema reload triggered successfully.');
  }
}

reload();
