const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabase.from('verses').select('*').limit(1);
  console.log('Sample Data:', data);
  console.log('Columns:', data && data[0] ? Object.keys(data[0]) : 'No data');
  if (error) console.error('Error:', error);
}

check();
