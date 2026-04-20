const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncAndClean() {
  console.log('🔄 Syncing slugs and cleaning up duplicates...');

  // 1. Get all poets
  const { data: poets } = await supabase.from('poets').select('*');
  
  // 2. Identify and fix slugs
  for (const poet of poets) {
    let slug = poet.slug;
    
    // If slug is missing or looks like a UUID, generate a proper one from name_en
    if (!slug || slug.length > 20) {
      slug = poet.name_en.toLowerCase().replace(/[^a-z0-9]/g, '-');
      console.log(`🏷️ Updating slug for ${poet.name_en}: ${slug}`);
      await supabase.from('poets').update({ slug }).eq('id', poet.id);
    }
  }

  // 3. Remove duplicates (keep the one with a proper slug)
  const seen = new Set();
  for (const poet of poets) {
    const key = poet.name_en.toLowerCase();
    if (seen.has(key)) {
      console.log(`🗑️ Deleting duplicate poet record for ${poet.name_en}`);
      await supabase.from('poets').delete().eq('id', poet.id);
    } else {
      seen.add(key);
    }
  }
}

syncAndClean();