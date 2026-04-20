import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Force dynamic rendering to prevent 404s on fresh data
export const dynamic = 'force-dynamic';

export default async function PoetPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Try fetching by slug first
  let { data: poet, error } = await supabase
    .from('poets')
    .select('*, works(*, verses(*))')
    .eq('slug', id)
    .single();

  // Fallback to ID if slug doesn't match
  if (!poet) {
    const { data: fallback } = await supabase
      .from('poets')
      .select('*, works(*, verses(*))')
      .eq('id', id)
      .single();
    poet = fallback;
  }

  if (!poet) return notFound();

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A]">
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center border-b border-[#8B2635]/10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-xl font-bold text-[#8B2635] font-playfair">Karvansara</span>
        </Link>
        <Link href="/" className="text-sm font-bold text-[#8B2635]/60 hover:text-[#8B2635]">BACK TO LIBRARY</Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-playfair mb-6">{poet.name_en}</h1>
        <p className="text-xl text-[#8B2635]/60 font-playfair italic mb-8">{poet.name_fa}</p>
        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-[#8B2635]/40 mb-12">
          <span>{poet.era}</span>
          <span>•</span>
          <span>{poet.region}</span>
        </div>
        <p className="text-lg leading-relaxed text-[#1A1A1A]/80 mb-16">{poet.bio_en}</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="space-y-24">
          {poet.works?.map((work: any) => (
            <div key={work.id}>
              <h2 className="text-2xl font-bold font-playfair mb-12 flex items-center gap-4">
                <span className="w-8 h-px bg-[#8B2635]/20" />
                {work.title_en} / {work.title_fa}
              </h2>
              <div className="grid gap-12">
                {work.verses?.sort((a: any, b: any) => a.order_index - b.order_index).map((verse: any) => (
                  <div key={verse.id} className="group border-l border-[#8B2635]/10 pl-8 hover:border-[#8B2635] transition-colors">
                    <div className="flex flex-col gap-2">
                      <p className="text-xl font-playfair leading-loose">{verse.text_fa || verse.mesra1 + (verse.mesra2 ? ' ' + verse.mesra2 : '')}</p>
                      <p className="text-[#1A1A1A]/60 italic font-playfair">{verse.text_en}</p>
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
