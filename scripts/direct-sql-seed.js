const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function directSeed() {
  console.log('📡 Attempting direct SQL seed for cultural events...');
  
  const events = [
    ["Nowruz", "نوروز", "Persian New Year"],
    ["Chaharshanbe Suri", "چهارشنبه سوری", "Festival of Fire"],
    ["Sizdah Bedar", "سیزده به در", "Nature Day"],
    ["Shab-e Yalda", "شب یلدا", "Winter Solstice / Yalda Night"],
    ["Mehregan", "مهرگان", "Festival of Autumn / Mithra"],
    ["Tirgan", "تیرگان", "Water Festival"],
    ["Sadeh", "سده", "Mid-Winter Fire Festival"],
    ["Sepandarmazgan", "سپندارمزگان", "Day of Love / Women's Day"],
    ["Farvardingan", "فروردینگان", "Festival of the Souls/Forouhars"],
    ["Ordibeheshtgan", "اردیبهشتگان", "Festival of Fire and Truth"],
    ["Khordadgan", "خردادگان", "Festival of Water and Completeness"],
    ["Amordadgan", "امردادگان", "Festival of Immortality and Plants"],
    ["Shahrivaragan", "شهریورگان", "Festival of Sovereignty and Metals"],
    ["Abanegan", "آبانگان", "Festival of Water/Anahita"],
    ["Azargan", "آذرگان", "Festival of Fire"],
    ["Deygan", "دیگان", "Festivals of the Creator"],
    ["Bahmanagan", "بهمنگان", "Festival of Vohu Manah / Animals"],
    ["Esfandgan", "اسفندگان", "Another name for Sepandarmazgan"],
    ["Golabgiri", "گلاب‌گیری", "Rosewater Festival"],
    ["Pir-e Shalyar", "پیر شالیار", "Traditional Kurdish/Persian Winter Festival"],
    ["Kuseh Galin", "کوسه گلین", "Traditional Folk Winter Ritual"],
    ["Gahanbars", "گاهنبارها", "Six Seasonal Thanksgiving Festivals"],
    ["Maidyozarem", "میدیوزرم", "Mid-spring"],
    ["Maidyoshem", "میدیوشم", "Mid-summer"],
    ["Paitishahim", "پایتی‌شهیم", "Harvest"],
    ["Ayathrem", "ایاترم", "Bringing home the herds"],
    ["Maidyarem", "میدیارم", "Mid-winter"],
    ["Hamaspathmaedaya", "همسپتهمیدی", "End of the year/All Souls"]
  ];

  for (const [en, fa, desc] of events) {
    const slug = en.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    const sql = `INSERT INTO cultural_events (name_en, name_fa, description_en, slug) 
                 VALUES ('${en}', '${fa}', '${desc}', '${slug}') 
                 ON CONFLICT (slug) DO NOTHING;`;
    
    const { error } = await supabase.rpc('exec_sql', { sql });
    if (error) console.error(`❌ Error seeding ${en}:`, error.message);
  }
  
  console.log('✅ SQL seeding attempt finished.');
}

directSeed();