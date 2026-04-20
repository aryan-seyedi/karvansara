import { createClient } from '@supabase/supabase-js';
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkColumns() {
  const { data, error } = await supabase.from('verses').select('*').limit(1);
  if (data && data.length > 0) {
    console.log('--- VERSES TABLE COLUMNS ---');
    console.log(Object.keys(data[0]));
  } else {
    console.log('No data in verses table to check columns.');
  }
}

checkColumns();