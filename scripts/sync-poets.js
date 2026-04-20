const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function cleanupAndFix() {
  console.log('🧹 Starting cleanup of duplicate/incorrect poets...');

  // 1. Delete rows where name_en is actually Farsi (the bulk import went wrong)
  // We identify these by the presence of Farsi characters in name_en
  const { data: allPoets } = await supabase.from('poets').select('*');
  
  for (const poet of allPoets) {
    // If name_en contains Farsi, it's a broken record from the bulk import
    if (/[\u0600-\u06FF]/.test(poet.name_en)) {
      console.log(`🗑️ Deleting broken poet: ${poet.name_en}`);
      await supabase.from('poets').delete().eq('id', poet.id);
    }
  }

  // 2. Ensure our core 5 poets have correct English names and bios
  const corePoets = [
    { name_en: 'Hafiz', name_fa: 'حافظ', bio_en: 'Master of the Persian ghazal, his Divan is found in nearly every Iranian home.', bio_fa: 'خواجه شمس‌الدین محمد حافظ شیرازی، لسان‌الغیب و حافظ کل قرآن.', era: '14th Century', region: 'Shiraz' },
    { name_en: 'Rumi', name_fa: 'مولانا', bio_en: 'The great Sufi mystic and poet of the Masnavi, whose influence transcends borders.', bio_fa: 'جلال‌الدین محمد بلخی، معروف به مولانا، از بزرگ‌ترین عرفای تاریخ.', era: '13th Century', region: 'Balkh/Konya' },
    { name_en: 'Saadi', name_fa: 'سعدی', bio_en: 'The Nightingale of Shiraz, famous for the Gulistan and Bostan.', bio_fa: 'مشرف‌الدین مصلح بن عبدالله سعدی شیرازی، استاد سخن.', era: '13th Century', region: 'Shiraz' },
    { name_en: 'Nizami', name_fa: 'نظامی', bio_en: 'The greatest romantic epic poet in Persian literature.', bio_fa: 'جمال‌الدین ابومحمد الیاس بن یوسف نظامی گنجوی.', era: '12th Century', region: 'Ganja' },
    { name_en: 'Rudaki', name_fa: 'رودکی', bio_en: 'The Father of Persian Poetry, who served at the Samanid court.', bio_fa: 'ابوعبدالله جعفر بن محمد رودکی، پدر شعر فارسی.', era: '10th Century', region: 'Panjrud' }
  ];

  for (const p of corePoets) {
    console.log(`✨ Updating/Upserting core poet: ${p.name_en}`);
    await supabase.from('poets').upsert(p, { onConflict: 'name_en' });
  }

  // 3. Add a test verse for the Discovery section
  const { data: hafiz } = await supabase.from('poets').select('id').eq('name_en', 'Hafiz').single();
  
  const { data: work } = await supabase.from('works').upsert({
    poet_id: hafiz.id,
    title_en: 'The Divan of Hafiz',
    title_fa: 'دیوان حافظ',
    slug: 'divan-hafiz'
  }, { onConflict: 'slug' }).select().single();

  await supabase.from('verses').upsert({
    work_id: work.id,
    text_en: 'Alâ yâ ayyohâ sâqi adir kâsan va nâvilhâ / For love seemed easy at first, but difficulties arose.',
    text_fa: 'الا یا ایها الساقی ادر کاسا و ناولها / که عشق آسان نمود اول ولی افتاد مشکلها',
    order_index: 0
  }, { onConflict: 'text_fa' });

  console.log('✅ Cleanup and sync complete.');
}

cleanupAndFix();