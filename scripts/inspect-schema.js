const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAll() {
  console.log('--- TABLE: poets ---');
  const { data: p, error: pe } = await supabase.from('poets').select('*').limit(1);
  console.log(pe ? pe : 'Columns: ' + Object.keys(p[0]).join(', '));

  console.log('\n--- TABLE: works ---');
  const { data: w, error: we } = await supabase.from('works').select('*').limit(1);
  console.log(we ? we : 'Columns: ' + Object.keys(w[0]).join(', '));

  console.log('\n--- TABLE: verses ---');
  const { data: v, error: ve } = await supabase.from('verses').select('*').limit(1);
  console.log(ve ? ve : 'Columns: ' + Object.keys(v[0]).join(', '));
}

checkAll();
