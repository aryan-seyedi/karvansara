import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PoetPage({ params }: { params: { id: string } }) {
  const { data: poet } = await supabase
    .from('poets')
    .select('*, works(*, verses(*))')
    .eq('id', params.id)
    .single();

  if (!poet) notFound();

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A]">
      {/* Header */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center border-b border-[#8B2635]/10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-xl font-bold text-[#8B2635] font-playfair">Karvansara</span>
        </Link>
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-[#8B2635]/60 hover:text-[#8B2635]">
          ← Back to Library
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2635]/40 mb-4 block">
          The Chamber of
        </span>
        <h1 className="text-6xl md:text-8xl font-playfair mb-8">{poet.name_en}</h1>
        <p className="text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto leading-relaxed italic">
          {poet.bio_en}
        </p>
      </section>

      {/* Works */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        {poet.works?.map((work: any) => (
          <div key={work.id} className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-playfair">{work.title_en}</h2>
              <div className="flex-grow h-px bg-[#8B2635]/10" />
              <span className="text-2xl font-playfair text-[#8B2635]/20">{work.title_fa}</span>
            </div>

            <div className="space-y-16">
              {work.verses?.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)).map((verse: any) => (
                <div key={verse.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="text-right">
                    <p className="text-2xl font-playfair leading-loose whitespace-pre-line text-[#1A1A1A]">
                      {verse.text_fa}
                    </p>
                  </div>
                  <div className="border-l border-[#8B2635]/5 pl-12">
                    <p className="text-lg font-playfair italic leading-relaxed text-[#1A1A1A]/70 whitespace-pre-line">
                      {verse.text_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#8B2635]/10 text-center">
        <p className="text-[10px] font-bold text-[#8B2635]/30 uppercase tracking-widest">
          End of Chamber — {poet.name_en}
        </p>
      </footer>
    </main>
  );
}
