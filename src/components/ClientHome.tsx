'use client';

import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { useEffect, useState } from 'react';

export default function ClientHome({ initialPoets }: { initialPoets: any[] }) {
  const { language, setLanguage, t } = useLanguage();
  const [discoveryVerse, setDiscoveryVerse] = useState<any>(null);

  const otherPoets = [
    { id: 'ferdowsi', name_en: 'Ferdowsi', name_fa: 'فردوسی', bio_en: 'Author of Shahnameh, the national epic of Greater Iran.', bio_fa: 'شاعر حماسه‌سرای ایرانی و سرایندهٔ شاهنامه', era_en: '10th Century', era_fa: 'قرن چهارم', region_en: 'Khorasan', region_fa: 'خراسان' },
    { id: 'khayyam', name_en: 'Omar Khayyam', name_fa: 'خیام', bio_en: 'Polymath, mathematician, astronomer, and philosopher.', bio_fa: 'فیلسوف، ریاضی‌دان، ستاره‌شناس و رباعی‌سرای ایرانی', era_en: '11th Century', era_fa: 'قرن پنجم', region_en: 'Nishapur', region_fa: 'نیشابور' },
    { id: 'attar', name_en: 'Attar of Nishapur', name_fa: 'عطار نیشابوری', bio_en: 'Theoretical spirit of Sufism and Persian poetry.', bio_fa: 'عارف، صوفی و شاعر بلندپایه ادبیات فارسی', era_en: '12th Century', era_fa: 'قرن ششم', region_en: 'Nishapur', region_fa: 'نیشابور' },
    { id: 'khwaju', name_en: 'Khwaju Kermani', name_fa: 'خواجوی کرمانی', bio_en: 'Famous poet and Sufi mystic from Kerman.', bio_fa: 'شاعر و عارف بزرگ سدهٔ هشتم هجری اهل کرمان', era_en: '14th Century', era_fa: 'قرن هشتم', region_en: 'Kerman', region_fa: 'کرمان' },
    { id: 'sanai', name_en: 'Sanai', name_fa: 'سنایی', bio_en: 'The first to use the ghazal and qasida for Sufi philosophy.', bio_fa: 'از بزرگ‌ترین شاعران قصیده‌گو و عارفان تاریخ ادبیات فارسی', era_en: '11th Century', era_fa: 'قرن پنجم', region_en: 'Ghazni', region_fa: 'غزنی' },
  ];

  useEffect(() => {
    async function fetchDiscovery() {
      try {
        const { data, error } = await supabase
          .from('verses')
          .select('text_fa, text_en, works!inner(title_fa, title_en, poets!inner(name_fa, name_en))')
          .limit(1);
        if (error) throw error;
        if (data && data.length > 0) setDiscoveryVerse(data[0]);
      } catch (err) {
        console.error('Discovery fetch error:', err);
      }
    }
    fetchDiscovery();
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans">
      {/* Navigation / Header */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center border-b border-[#8B2635]/10 gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Karvansara Logo" width={80} height={80} className="object-contain" />
            <span className="text-2xl font-bold tracking-tighter text-[#8B2635] font-playfair">Karvansara</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex gap-8 text-sm font-medium uppercase tracking-widest text-[#8B2635]/60">
            <Link href="/" className="hover:text-[#8B2635] transition-colors border-b-2 border-[#8B2635]">{t('Library', 'کتابخانه')}</Link>
            <Link href="/history" className="hover:text-[#8B2635] transition-colors">{t('History', 'تاریخ')}</Link>
            <Link href="/about" className="hover:text-[#8B2635] transition-colors">{t('About', 'درباره')}</Link>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#8B2635]/10 rounded-full shadow-sm">
            <button 
              onClick={() => setLanguage('EN')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${language === 'EN' ? 'bg-[#FDFCF0] text-[#8B2635] shadow-inner' : 'text-[#8B2635]/40 hover:text-[#8B2635]'}`}
            >EN</button>
            <div className="w-px h-3 bg-[#8B2635]/10" />
            <button 
              onClick={() => setLanguage('FA')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${language === 'FA' ? 'bg-[#FDFCF0] text-[#8B2635] shadow-inner' : 'text-[#8B2635]/40 hover:text-[#8B2635]'}`}
            >FA</button>
          </div>
        </div>
      </nav>

      {/* Hero / Discovery Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B2635]/5 border border-[#8B2635]/10 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B2635] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B2635]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B2635]">{t('Discovery of the Day', 'کشف روز')}</span>
            </div>
            
            {discoveryVerse ? (
              <div className="relative">
                <p className={`text-4xl md:text-5xl lg:text-6xl font-playfair leading-tight mb-8 ${language === 'FA' ? 'leading-loose' : ''}`}>
                  {t(discoveryVerse.text_en || discoveryVerse.text_fa, discoveryVerse.text_fa)}
                </p>
                <div className="flex items-center gap-4 text-[#8B2635]/60 font-medium">
                  <div className="w-8 h-px bg-[#8B2635]/20" />
                  <span className="text-sm italic font-playfair">
                    {t(discoveryVerse.works?.poets?.name_en || '', discoveryVerse.works?.poets?.name_fa || '')} — {t(discoveryVerse.works?.title_en || '', discoveryVerse.works?.title_fa || '')}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xl italic opacity-50">{t('Seeking wisdom...', 'در جستجوی حکمت...')}</p>
            )}
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-[#8B2635]/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <Image src="/logo.png" alt="Library Background" fill className="object-cover opacity-20 p-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF0] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-[120px] font-playfair text-[#8B2635]/5 leading-none absolute -top-16 -left-4">“</div>
                <p className="text-lg font-playfair italic text-[#8B2635] relative z-10">
                  {t('“The path is long, but the destination is written in the stars.”', '«مسیر طولانی است، اما مقصد در ستاره‌ها نوشته شده است.»')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold font-playfair">{t('The Library of Poets', 'کتابخانه شاعران')}</h2>
          <div className="flex-grow h-px bg-[#8B2635]/10" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Active Poets from DB */}
          {initialPoets.map((poet) => (
            <div 
              key={poet.id} 
              className="group relative bg-white border border-[#8B2635]/10 p-8 hover:border-[#8B2635] transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#8B2635] group-hover:h-full transition-all duration-500" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-playfair mb-1 group-hover:text-[#8B2635] transition-colors">
                    {t(poet.name_en, poet.name_fa)}
                  </h3>
                  <p className="text-[10px] text-[#8B2635]/40 font-bold uppercase tracking-widest">
                    {t(poet.era_en || poet.era, poet.era)}
                  </p>
                </div>
              </div>
              <p className="text-[#1A1A1A]/70 leading-relaxed text-sm mb-8 line-clamp-3">
                {t(poet.bio_en, poet.bio_fa)}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#8B2635]/5">
                <span className="text-[10px] font-bold text-[#8B2635]/30 uppercase tracking-widest">
                  {t(poet.region_en || poet.region, poet.region)}
                </span>
                <Link href={`/poet/${poet.slug}`} className="text-xs font-bold text-[#8B2635] hover:underline underline-offset-4">
                  {t('Enter Room →', 'ورود به تالار ←')}
                </Link>
              </div>
            </div>
          ))}

          {/* Placeholder/Upcoming Poets */}
          {otherPoets.map((poet) => (
            <div 
              key={poet.id} 
              className="group relative bg-[#FDFCF0]/50 border border-[#8B2635]/5 p-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-playfair mb-1">
                    {t(poet.name_en, poet.name_fa)}
                  </h3>
                  <p className="text-[10px] text-[#8B2635]/40 font-bold uppercase tracking-widest">
                    {t(poet.era_en, poet.era_fa)}
                  </p>
                </div>
              </div>
              <p className="text-[#1A1A1A]/70 leading-relaxed text-sm mb-8 line-clamp-3">
                {t(poet.bio_en, poet.bio_fa)}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#8B2635]/5">
                <span className="text-[10px] font-bold text-[#8B2635]/30 uppercase tracking-widest">
                  {t(poet.region_en, poet.region_fa)}
                </span>
                <span className="text-[10px] font-bold text-[#8B2635]/20 uppercase">
                  {t('Restoring Chamber...', 'در حال بازسازی...')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#8B2635]/10 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Image src="/logo.png" alt="Karvansara Logo" width={50} height={50} className="grayscale" />
            <span className="text-sm font-bold tracking-widest text-[#1A1A1A] uppercase">Karvansara</span>
          </div>
          <div className="text-[10px] font-bold text-[#8B2635]/40 uppercase tracking-[0.2em] text-center md:text-left">
            {t('Where the Path Rests and Ideas Journey On', 'جایی که مسیر آرام می‌گیرد و اندیشه‌ها به سفر ادامه می‌دهند')}
          </div>
          <div className="text-[10px] font-mono text-[#1A1A1A]/30">
            © 2026 <a href="https://www.farlish.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B2635] underline decoration-dotted">Farlish Inc</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
