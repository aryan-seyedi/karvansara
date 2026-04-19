const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabase.from('verses').select('*').limit(1);
  if (data) {
     console.log('Keys in verses object:', data[0] ? Object.keys(data[0]) : 'Table is empty');
  }
  if (error) console.error('Error:', error);
}

check();
