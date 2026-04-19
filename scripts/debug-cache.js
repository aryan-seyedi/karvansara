const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'verses' });
  if (error) {
     // fallback if rpc doesn't exist
     const { data: d2, error: e2 } = await supabase.from('verses').select('*').limit(0);
     console.log('Columns from select:', e2 ? e2.message : 'Success');
  } else {
    console.log('Columns:', data);
  }
}

check();
