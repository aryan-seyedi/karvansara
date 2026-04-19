const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  console.log('🌱 Seeding Hafiz (Ghazal 1) with Gertrude Bell Translation...');

  const { data: poet } = await supabase
    .from('poets')
    .select('id')
    .eq('name_en', 'Hafiz')
    .single();

  if (!poet) {
    console.error('Poet Hafiz not found. Run seed-poets.js first.');
    return;
  }

  const { data: work, error: workError } = await supabase
    .from('works')
    .upsert({
      poet_id: poet.id,
      title_fa: 'دیوان حافظ',
      title_en: 'The Divan of Hafez',
      slug: 'divan-hafez'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (workError) {
    console.error('Error seeding work:', workError);
    return;
  }

  const verses = [
    { text_fa: 'الا یا ایها الساقی ادر کاسا و ناولها', text_en: 'Ho, Saki, haste, the beaker bring' },
    { text_fa: 'که عشق آسان نمود اول ولی افتاد مشکل‌ها', text_en: 'Filled to the brim with roseate wine' },
    { text_fa: 'به بوی نافه‌ای کاخر صبا زان طره بگشاید', text_en: 'The musk-bag that the East-wind flings' },
    { text_fa: 'ز تاب جعد مشکینش چه خون افتاد در دل‌ها', text_en: 'From out his tresses, to entwine' },
    { text_fa: 'مرا در منزل جانان چه امن عیش چون هر دم', text_en: 'Where shall I find a resting-place' },
    { text_fa: 'جرس فریاد می‌دارد که بربندید محمل‌ها', text_en: 'When the bell rings its summons loud?' },
    { text_fa: 'به می سجاده رنگین کن گرت پیر مغان گوید', text_en: 'Stain the prayer-carpet with the wine' },
    { text_fa: 'که سالک بی‌خبر نبود ز راه و رسم منزل‌ها', text_en: 'If the Magian Elder so commands' },
    { text_fa: 'شب تاریک و بیم موج و گردابی چنین هایل', text_en: 'Dark is the night, and fearsome the wave' },
    { text_fa: 'کجا دانند حال ما سبکباران ساحل‌ها', text_en: 'How can those on the shore know our state?' },
    { text_fa: 'همه کارم ز خودکامی به بدنامی کشید آخر', text_en: 'All my work from self-seeking to ill-fame led' },
    { text_fa: 'نهان کی ماند آن رازی کز او سازند محفل‌ها', text_en: 'How shall that secret remain hidden?' },
    { text_fa: 'حضوری گر همی‌خواهی از او غایب مشو حافظ', text_en: 'If thou desirest Presence, Hafiz, do not be absent from Him' },
    { text_fa: 'متی ما تلق من تهوی دع الدنیا و اهملها', text_en: 'When thou meetest the One thou lovest, leave the world and let it go' }
  ].map((v, i) => ({
    work_id: work.id,
    text_fa: v.text_fa,
    text_en: v.text_en,
    order_index: i
  }));

  // Delete old verses first to avoid duplicates since we don't have a slug for verses
  await supabase.from('verses').delete().eq('work_id', work.id);
  
  const { error: verseError } = await supabase.from('verses').insert(verses);

  if (verseError) {
    console.error('Insert error:', verseError);
  } else {
    console.log('Successfully seeded 14 verses for Hafiz!');
  }
}

seed();
