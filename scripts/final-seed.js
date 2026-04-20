const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrateAndSeed() {
  console.log('🚀 Starting Database Migration & Seeding...');

  // 1. Core Poets Data
  const corePoets = [
    { slug: 'hafiz', name_en: 'Hafiz', name_fa: 'حافظ', bio_en: 'Master of the Persian ghazal.', bio_fa: 'خواجه شمس‌الدین محمد حافظ شیرازی.', era: '14th Century', region: 'Shiraz' },
    { slug: 'rumi', name_en: 'Rumi', name_fa: 'مولانا', bio_en: 'The great Sufi mystic and poet.', bio_fa: 'جلال‌الدین محمد بلخی، معروف به مولانا.', era: '13th Century', region: 'Balkh/Konya' },
    { slug: 'saadi', name_en: 'Saadi', name_fa: 'سعدی', bio_en: 'The Nightingale of Shiraz.', bio_fa: 'مشرف‌الدین مصلح بن عبدالله سعدی شیرازی.', era: '13th Century', region: 'Shiraz' },
    { slug: 'nizami', name_en: 'Nizami', name_fa: 'نظامی', bio_en: 'Great romantic epic poet.', bio_fa: 'جمال‌الدین ابومحمد الیاس بن یوسف نظامی گنجوی.', era: '12th Century', region: 'Ganja' },
    { slug: 'rudaki', name_en: 'Rudaki', name_fa: 'رودکی', bio_en: 'The Father of Persian Poetry.', bio_fa: 'ابوعبدالله جعفر بن محمد رودکی، پدر شعر فارسی.', era: '10th Century', region: 'Panjrud' }
  ];

  for (const p of corePoets) {
    console.log(`✨ Seeding poet: ${p.name_en}`);
    const { data: poet, error } = await supabase.from('poets').upsert(p, { onConflict: 'slug' }).select().single();
    if (error) console.error(`Error seeding ${p.name_en}:`, error);

    if (poet) {
      // 2. Seed a Work for each poet
      const { data: work } = await supabase.from('works').upsert({
        poet_id: poet.id,
        title_en: `The Works of ${p.name_en}`,
        title_fa: `آثار ${p.name_fa}`,
        slug: `works-${p.slug}`
      }, { onConflict: 'slug' }).select().single();

      if (work) {
        // 3. Seed a Verse for each work
        const { error: verseError } = await supabase.from('verses').upsert({
          work_id: work.id,
          text_en: `Sample verse from ${p.name_en} in English.`,
          text_fa: `نمونه شعر از ${p.name_fa} به فارسی.`,
          order_index: 0
        }, { onConflict: 'work_id, order_index' });
        
        if (verseError) console.error(`Error seeding verse for ${p.name_en}:`, verseError);
      }
    }
  }

  console.log('✅ Seeding complete. Check your Supabase dashboard now.');
}

migrateAndSeed();