const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  const { data: poet } = await supabase.from('poets').select('id').limit(1).single();
  const { data: work } = await supabase.from('works').insert({
      poet_id: poet.id,
      title_fa: 'Test',
      title_en: 'Test',
      slug: 'test-' + Date.now()
  }).select().single();

  console.log('Attempting minimal verse insert...');
  const { error } = await supabase.from('verses').insert({
      work_id: work.id,
      text_fa: 'Test verse'
  });
  
  if (error) console.error('Minimal insert error:', error);
  else console.log('Minimal insert success!');
}

test();
