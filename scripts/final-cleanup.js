const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function finalCleanup() {
  console.log('🔄 Refreshing Schema and Seeding Events...');

  // 1. Force PostgREST to reload schema cache
  await supabase.rpc('exec_sql', { sql: "NOTIFY pgrst, 'reload schema';" });
  
  // Wait a moment for cache to refresh
  await new Promise(r => setTimeout(r, 2000));

  const events = [
    { name_en: "Nowruz", name_fa: "نوروز", description_en: "Persian New Year" },
    { name_en: "Chaharshanbe Suri", name_fa: "چهارشنبه سوری", description_en: "Festival of Fire" },
    { name_en: "Sizdah Bedar", name_fa: "سیزده به در", description_en: "Nature Day" },
    { name_en: "Shab-e Yalda", name_fa: "شب یلدا", description_en: "Winter Solstice / Yalda Night" },
    { name_en: "Mehregan", name_fa: "مهرگان", description_en: "Festival of Autumn / Mithra" },
    { name_en: "Tirgan", name_fa: "تیرگان", description_en: "Water Festival" },
    { name_en: "Sadeh", name_fa: "سده", description_en: "Mid-Winter Fire Festival" },
    { name_en: "Sepandarmazgan", name_fa: "سپندارمزگان", description_en: "Day of Love / Women's Day" },
    { name_en: "Farvardingan", name_fa: "فروردینگان", description_en: "Festival of the Souls/Forouhars" },
    { name_en: "Ordibeheshtgan", name_fa: "اردیبهشتگان", description_en: "Festival of Fire and Truth" },
    { name_en: "Khordadgan", name_fa: "خردادگان", description_en: "Festival of Water and Completeness" },
    { name_en: "Amordadgan", name_fa: "امردادگان", description_en: "Festival of Immortality and Plants" },
    { name_en: "Shahrivaragan", name_fa: "شهریورگان", description_en: "Festival of Sovereignty and Metals" },
    { name_en: "Abanegan", name_fa: "آبانگان", description_en: "Festival of Water/Anahita" },
    { name_en: "Azargan", name_fa: "آذرگان", description_en: "Festival of Fire" },
    { name_en: "Deygan", name_fa: "دیگان", description_en: "Festivals of the Creator" },
    { name_en: "Bahmanagan", name_fa: "بهمنگان", description_en: "Festival of Vohu Manah / Animals" },
    { name_en: "Esfandgan", name_fa: "اسفندگان", description_en: "Another name for Sepandarmazgan" },
    { name_en: "Golabgiri", name_fa: "گلاب‌گیری", description_en: "Rosewater Festival" },
    { name_en: "Pir-e Shalyar", name_fa: "پیر شالیار", description_en: "Traditional Kurdish/Persian Winter Festival" },
    { name_en: "Kuseh Galin", name_fa: "کوسه گلین", description_en: "Traditional Folk Winter Ritual" },
    { name_en: "Gahanbars", name_fa: "گاهنبارها", description_en: "Six Seasonal Thanksgiving Festivals" },
    { name_en: "Maidyozarem", name_fa: "میدیوزرم", description_en: "Mid-spring" },
    { name_en: "Maidyoshem", name_fa: "میدیوشم", description_en: "Mid-summer" },
    { name_en: "Paitishahim", name_fa: "پایتی‌شهیم", description_en: "Harvest" },
    { name_en: "Ayathrem", name_fa: "ایاترم", description_en: "Bringing home the herds" },
    { name_en: "Maidyarem", name_fa: "میدیارم", description_en: "Mid-winter" },
    { name_en: "Hamaspathmaedaya", name_fa: "همسپتهمیدی", description_en: "End of the year/All Souls" }
  ].map(e => ({ 
    name_en: e.name_en, 
    name_fa: e.name_fa, 
    description_en: e.description_en,
    slug: e.name_en.toLowerCase().replace(/ /g, '-') 
  }));

  const { error } = await supabase.from('cultural_events').upsert(events, { onConflict: 'slug' });
  if (error) console.error('❌ Error:', error.message);
  else console.log('✅ Events Seeded!');
}

finalCleanup();