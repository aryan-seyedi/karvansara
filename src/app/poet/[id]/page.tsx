import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PoetPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Clean up ID - sometimes it comes in with URL encoding
  const cleanId = decodeURIComponent(id).toLowerCase();

  console.log('Rendering Poet Room for:', cleanId);

  // 1. Fetch the poet first
  const { data: poet, error: poetError } = await supabase
    .from('poets')
    .select('*')
    .eq('slug', cleanId)
    .maybeSingle();

  if (!poet) {
    console.error('Poet not found in DB for slug:', cleanId);
    return notFound();
  }

  // 2. Fetch works and verses separately for better control
  const { data: works } = await supabase
    .from('works')
    .select('*, verses(*)')
    .eq('poet_id', poet.id)
    .order('created_at', { ascending: true });

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans">
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center border-b border-[#8B2635]/10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-xl font-bold text-[#8B2635] font-playfair">Karvansara</span>
        </Link>
        <Link href="/" className="text-sm font-bold text-[#8B2635]/60 hover:text-[#8B2635] tracking-widest uppercase">Library</Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-7xl font-playfair mb-6 text-[#1A1A1A]">{poet.name_en}</h1>
        <p className="text-2xl text-[#8B2635] font-playfair italic mb-10" dir="rtl">{poet.name_fa}</p>
        
        <div className="flex justify-center items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2635]/40 mb-16">
          <span className="px-3 py-1 border border-[#8B2635]/10 rounded-full">{poet.era}</span>
          <div className="w-1 h-1 bg-[#8B2635]/20 rounded-full" />
          <span className="px-3 py-1 border border-[#8B2635]/10 rounded-full">{poet.region}</span>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg leading-relaxed text-[#1A1A1A]/70 italic">
            {poet.bio_en}
          </p>
          <div className="mt-8 h-px w-24 bg-[#8B2635]/10 mx-auto" />
          <p className="mt-8 text-lg leading-relaxed text-[#1A1A1A]/80 font-playfair" dir="rtl">
            {poet.bio_fa}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-40">
        <div className="space-y-32">
          {works?.map((work: any) => (
            <div key={work.id} className="relative">
              <div className="sticky top-0 bg-[#FDFCF0]/90 backdrop-blur-sm py-4 z-10 border-b border-[#8B2635]/5 mb-16">
                <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-[#8B2635]/30 mb-2">Collection</h2>
                <h3 className="text-3xl font-playfair text-[#1A1A1A]">{work.title_en} / <span dir="rtl">{work.title_fa}</span></h3>
              </div>

              <div className="space-y-20">
                {work.verses?.sort((a: any, b: any) => a.order_index - b.order_index).map((verse: any) => (
                  <div key={verse.id} className="group">
                    <div className="flex flex-col items-center text-center gap-6">
                      <div className="space-y-2 text-[#1A1A1A] max-w-xl">
                        <p className="text-2xl md:text-3xl font-playfair leading-[1.8]" dir="rtl">{verse.mesra1}</p>
                        <p className="text-2xl md:text-3xl font-playfair leading-[1.8]" dir="rtl">{verse.mesra2}</p>
                      </div>
                      
                      <div className="w-12 h-px bg-[#8B2635]/10 group-hover:w-24 transition-all duration-700" />
                      
                      {/* Placeholder for English translation until columns are added */}
                      <p className="text-[#8B2635]/60 italic font-playfair max-w-lg leading-relaxed">
                        The beauty of this verse awaits translation...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
