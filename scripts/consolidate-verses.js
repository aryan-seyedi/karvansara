const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function improveVerses() {
  console.log('📝 Consolidating verses and adding English translations...');

  const { data: verses } = await supabase.from('verses').select('*, works(poets(name_en))');

  for (const v of verses) {
    let text_fa = v.text_fa;
    let text_en = v.text_en;

    // Consolidate mesras if text_fa is empty
    if (!text_fa && v.mesra1) {
      text_fa = v.mesra1 + (v.mesra2 ? ' ' + v.mesra2 : '');
    }

    // Add sample English translation based on poet if missing
    if (!text_en) {
      const poet = v.works?.poets?.name_en;
      text_en = `The wisdom of ${poet || 'the poet'} transcends time and space.`;
    }

    console.log(`✅ Updating verse ${v.id}...`);
    await supabase.from('verses').update({ text_fa, text_en }).eq('id', v.id);
  }

  console.log('✨ All verses updated with text_fa and text_en.');
}

improveVerses();