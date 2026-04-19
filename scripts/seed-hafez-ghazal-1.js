const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function seedHafiz() {
  console.log('🌱 Seeding Hafiz (Ghazal 1) with Gertrude Bell Translation...');

  // 1. Ensure Poet exists
  const { data: poet } = await supabase
    .from('poets')
    .select('id')
    .eq('name_en', 'Hafiz')
    .single();

  if (!poet) {
    console.error('Poet Hafiz not found.');
    return;
  }

  // 2. Create/Update Work (Divan of Hafiz)
  const { data: work, error: workError } = await supabase
    .from('works')
    .upsert({
      poet_id: poet.id,
      title_fa: 'دیوان حافظ',
      title_en: 'Divan of Hafiz',
      slug: 'divan-e-hafez'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (workError) {
    console.error('Error with work:', workError);
    return;
  }

  // 3. Clear existing verses for this work to avoid duplicates/conflicts during development
  await supabase.from('verses').delete().eq('work_id', work.id);

  // 4. Data (Persian + Gertrude Bell)
  const ghazal1 = [
    {
      order: 1,
      text_fa: 'الا یا ایها الساقی ادر کاسا و ناولها\nکه عشق آسان نمود اول ولی افتاد مشکل‌ها',
      text_en: 'ARISE, oh Cup-bearer, rise! and bring\nTo lips that are thirsting the bowl they praise,\nFor it seemed that love was an easy thing,\nBut my feet have fallen on difficult ways.'
    },
    {
      order: 2,
      text_fa: 'به بوی نافه‌ای کآخر صبا زان طره بگشاید\nز تاب جعد مشکینش چه خون افتاد در دل‌ها',
      text_en: 'I have prayed the wind o’er my heart to fling\nThe fragrance of musk in her hair that sleeps\nIn the night of her hair—yet no fragrance stays;\nThe tears of my heart’s blood my sad heart weeps.'
    },
    {
      order: 3,
      text_fa: 'به می سجاده رنگین کن گرت پیر مغان گوید\nکه سالک بی‌خبر نبود ز راه و رسم منزل‌ها',
      text_en: 'Hear the Tavern-keeper who counsels you:\n“With wine, with red wine your prayer carpet dye!”\nThere was never a traveller like him but knew\nThe ways of the road and the hostelry.'
    },
    {
      order: 4,
      text_fa: 'مرا در منزل جانان چه امن عیش چون هر دم\nجرس فریاد می‌دارد که بربندید محمل‌ها',
      text_en: 'Where shall I rest, when the still night through,\nBeyond thy gateway, oh Heart of my heart,\nThe bells of the camels lament and cry:\n“Bind up thy burden again and depart!”'
    },
    {
      order: 5,
      text_fa: 'شب تاریک و بیم موج و گردابی چنین هایل\nکجا دانند حال ما سبکباران ساحل‌ها',
      text_en: 'The waves run high, night is clouded with fears,\nAnd eddying whirlpools clash and roar;\nHow shall my drowning voice strike their ears\nWhose light-freighted vessels have reached the shore?'
    },
    {
      order: 6,
      text_fa: 'همه کارم ز خودکامی به بدنامی کشید آخر\nنهان کی ماند آن رازی کز او سازند محفل‌ها',
      text_en: 'I sought mine own; the unsparing years\nHave brought me mine own, a dishonoured name.\nWhat cloak shall cover my misery o’er\nWhen each jesting mouth has rehearsed my shame!'
    },
    {
      order: 7,
      text_fa: 'حضوری گر همی‌خواهی از او غایب مشو حافظ\nمتی ما تلق من تهوی دع الدنیا و اهملها',
      text_en: 'Oh Hafiz, seeking an end to strife,\nHold fast in thy mind what the wise have writ:\n“If at last thou attain the desire of thy life,\nCast the world aside, yea, abandon it!”'
    }
  ];

  const { error: insertError } = await supabase
    .from('verses')
    .insert(ghazal1.map(v => ({
      work_id: work.id,
      order_index: v.order,
      text_fa: v.text_fa,
      text_en: v.text_en
    })));

  if (insertError) {
    console.error('Insert error:', insertError);
  } else {
    console.log('✅ Success: Hafiz Ghazal 1 (Bilingual) seeded.');
  }
}

seedHafiz();
