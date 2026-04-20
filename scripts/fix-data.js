const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixData() {
  console.log('🔄 Re-verifying and seeding Hafiz to ensure room availability...');

  const hafizData = {
    slug: 'hafiz',
    name_en: 'Hafiz',
    name_fa: 'حافظ',
    bio_en: 'The Master of Persian Ghazals, whose words dance between the earthly and the divine.',
    bio_fa: 'خواجه شمس‌الدین محمد حافظ شیرازی، لسان‌الغیب و حافظ کل قرآن.',
    era: '14th Century',
    region: 'Shiraz'
  };

  const { data: poet, error: pError } = await supabase
    .from('poets')
    .upsert(hafizData, { onConflict: 'slug' })
    .select()
    .single();

  if (pError) {
    console.error('Poet upsert error:', pError);
    return;
  }

  const { data: work, error: wError } = await supabase
    .from('works')
    .upsert({
      poet_id: poet.id,
      slug: 'divan-hafiz',
      title_en: 'The Divan',
      title_fa: 'دیوان حافظ'
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (wError) {
    console.error('Work upsert error:', wError);
    return;
  }

  await supabase.from('verses').upsert({
    work_id: work.id,
    mesra1: 'الا یا ایها الساقی ادر کاسا و ناولها',
    mesra2: 'که عشق آسان نمود اول ولی افتاد مشکلها',
    order_index: 0
  }, { onConflict: 'work_id, order_index' });

  console.log('✅ Hafiz data fixed and verified.');
}

fixData();