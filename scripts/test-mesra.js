const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedWithRealColumns() {
  console.log('🧪 Testing seeding with mesra1/mesra2 columns...');

  const { data: poet } = await supabase.from('poets').select('id').eq('slug', 'hafiz').single();
  const { data: work } = await supabase.from('works').select('id').eq('slug', 'works-hafiz').single();

  if (poet && work) {
    const { data, error } = await supabase.from('verses').insert({
      work_id: work.id,
      mesra1: 'الا یا ایها الساقی ادر کاسا و ناولها',
      mesra2: 'که عشق آسان نمود اول ولی افتاد مشکلها',
      order_index: 10
    });

    if (error) {
      console.error('❌ Insert failed:', error);
    } else {
      console.log('✅ Insert successful using mesra1/mesra2');
    }
  }
}

seedWithRealColumns();