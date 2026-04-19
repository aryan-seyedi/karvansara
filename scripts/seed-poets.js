const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const priorityPoets = [
  {
    name_fa: "سعدی",
    name_en: "Saadi",
    bio_fa: "ابومحمد مُشرف‌الدین مُصلح بن عبدالله بن مُشرف، متخلص به سعدی، شاعر و نویسندهٔ پارسی‌گوی ایرانی سدهٔ هفتم هجری قمری است.",
    bio_en: "Abu-Muhammad Muslih al-Din bin Abdallah Shirazi, better known by his pen-name Saadi, was a major Persian poet and prose writer of the medieval period.",
    era: "13th Century",
    region: "Shiraz",
    slug: "saadi"
  },
  {
    name_fa: "حافظ",
    name_en: "Hafiz",
    bio_fa: "خواجه شمس‌الدین محمد بن بهاءالدّین حافظ شیرازی، معروف به لسان‌الغیب، شاعر بزرگ سدهٔ هشتم ایران.",
    bio_en: "Khwaja Shams-ud-Din Muhammad Hafez-e Shirazi, known by his pen name Hafez, was a Persian poet who lauded the joys of love and wine.",
    era: "14th Century",
    region: "Shiraz",
    slug: "hafiz"
  },
  {
    name_fa: "مولوی",
    name_en: "Rumi",
    bio_fa: "جلال‌الدین محمد بلخی معروف به مولوی، مولانا و رومی، از مشهورترین شاعران فارسی‌گوی ایرانی‌تبار است.",
    bio_en: "Jalal ad-Din Muhammad Rumi was a 13th-century Persian poet, Hanafi faqih, Islamic scholar, Maturidi theologian, and Sufi mystic.",
    era: "13th Century",
    region: "Balkh/Konya",
    slug: "rumi"
  },
  {
    name_fa: "نظامی",
    name_en: "Nizami",
    bio_fa: "جمال‌الدین ابومحمد الیاس بن یوسف بن زکی بن مؤید، متخلص به نظامی، شاعر و داستان‌سرای ایرانی سدهٔ ششم هجری.",
    bio_en: "Nizami Ganjavi is considered the greatest romantic epic poet in Persian literature, who brought a colloquial and realistic style to the Persian epic.",
    era: "12th Century",
    region: "Ganja",
    slug: "nizami"
  },
  {
    name_fa: "رودکی",
    name_en: "Rudaki",
    bio_fa: "ابوعبدالله جعفر بن محمد بن حکیم بن عبدالرحمن بن آدم رودکی، نخستین شاعر بزرگ پارسی‌گوی و ملقب به پدر شعر پارسی است.",
    bio_en: "Rudaki is regarded as the first great literary genius of the Modern Persian language. He is often referred to as the 'Father of Persian Poetry'.",
    era: "9th-10th Century",
    region: "Panjrud",
    slug: "rudaki"
  }
];

async function seedPoets() {
  console.log("Seeding priority poets...");
  const { data, error } = await supabase
    .from('poets')
    .upsert(priorityPoets, { onConflict: 'slug' });

  if (error) {
    console.error("Error seeding poets:", error);
  } else {
    console.log("Successfully seeded priority poets.");
  }
}

seedPoets();
