const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  console.log('🌱 Seeding Hafiz (Ghazal 1) using Persian-only fallback...');

  const { data: poet } = await supabase
    .from('poets')
    .select('id')
    .eq('name_en', 'Hafiz')
    .single();

  const { data: work } = await supabase
    .from('works')
    .upsert({
      poet_id: poet.id,
      title_fa: 'دیوان حافظ',
      title_en: 'The Divan of Hafez',
      slug: 'divan-hafez'
    }, { onConflict: 'slug' })
    .select()
    .single();

  const verses = [
    { text_fa: 'الا یا ایها الساقی ادر کاسا و ناولها', order_index: 0 },
    { text_fa: 'که عشق آسان نمود اول ولی افتاد مشکل‌ها', order_index: 1 }
  ].map(v => ({ ...v, work_id: work.id }));

  const { error } = await supabase.from('verses').insert(verses);
  if (error) console.error('Insert error:', error);
  else console.log('Success with Persian-only!');
}

seed();
