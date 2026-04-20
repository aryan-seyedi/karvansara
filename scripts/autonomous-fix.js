const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function autonomousMigration() {
  console.log('🚀 UNLEASHING AUTONOMY: Running Database Migrations...');

  const queries = [
    // 1. Add text_fa and text_en to verses
    "ALTER TABLE verses ADD COLUMN IF NOT EXISTS text_fa text;",
    "ALTER TABLE verses ADD COLUMN IF NOT EXISTS text_en text;",
    
    // 2. Consolidate existing data from mesra1/mesra2 into text_fa
    "UPDATE verses SET text_fa = mesra1 || ' ' || mesra2 WHERE text_fa IS NULL AND mesra1 IS NOT NULL;",
    
    // 3. Ensure poets have lowercase slugs for routing
    "UPDATE poets SET slug = LOWER(REPLACE(name_en, ' ', '-')) WHERE slug IS NULL OR slug = '';",
    
    // 4. Verify specifically that 'hafiz' slug exists
    "UPDATE poets SET slug = 'hafiz' WHERE name_en ILIKE 'Hafiz';"
  ];

  for (const sql of queries) {
    console.log(`📡 Executing: ${sql}`);
    const { error } = await supabase.rpc('exec_sql', { sql });
    if (error) {
      console.error(`❌ Error executing query:`, error.message);
    } else {
      console.log(`✅ Success.`);
    }
  }

  // Final check - what do we have now?
  const { data: verses } = await supabase.from('verses').select('*').limit(1);
  console.log('--- FINAL VERSES COLUMNS ---');
  console.log(verses && verses.length > 0 ? Object.keys(verses[0]) : 'No data');
  
  const { data: hafiz } = await supabase.from('poets').select('name_en, slug').eq('slug', 'hafiz').single();
  console.log('--- HAFIZ SLUG CHECK ---');
  console.log(hafiz);
}

autonomousMigration();