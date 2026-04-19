const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  console.log('🌱 Seeding Hafiz (Ghazal 1) using fallback names...');

  const { data: poet } = await supabase
    .from('poets')
    .select('id')
    .eq('name_en', 'Hafiz')
    .single();

  if (!poet) {
    console.error('Poet Hafiz not found.');
    return;
  }

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
    { text_fa: 'الا یا ایها الساقی ادر کاسا و ناولها', text_en: 'Ho, Saki, haste, the beaker bring' },
    { text_fa: 'که عشق آسان نمود اول ولی افتاد مشکل‌ها', text_en: 'Filled to the brim with roseate wine' }
  ].map((v, i) => ({
    work_id: work.id,
    text_fa: v.text_fa,
    text_en: v.text_en,
    order_index: i
  }));

  console.log('Attempting insert with:', verses[0]);
  const { error } = await supabase.from('verses').insert(verses);
  if (error) console.error('Insert error:', error);
  else console.log('Success!');
}

seed();
