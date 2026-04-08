import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default async function Home() {
  // Fetch a random verse for the "Discovery" section
  const { data: randomVerses } = await supabase
    .from('verses')
    .select('*, works(title_fa, poets(name_fa))')
    .limit(1);
    
  const discoveryVerse = randomVerses?.[0];

  // Fetch all poets
  const { data: poets, error } = await supabase
    .from('poets')
    .select('*')
    .order('name_fa', { ascending: true });

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans">
      {/* Navigation / Header */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center border-b border-[#8B2635]/10">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Karvansara Logo" width={40} height={40} className="object-contain" />
          <span className="text-2xl font-bold tracking-tighter text-[#8B2635] font-playfair">Karvansara</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-[#8B2635]/60">
          <a href="#" className="hover:text-[#8B2635] transition-colors">Library</a>
          <a href="#" className="hover:text-[#8B2635] transition-colors">History</a>
          <a href="#" className="hover:text-[#8B2635] transition-colors">About</a>
        </div>
      </nav>

      {/* Hero / Discovery Section */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <div className="mb-6 inline-block px-3 py-1 bg-[#8B2635]/5 rounded-full text-[#8B2635] text-xs font-bold uppercase tracking-widest">
          Discovery
        </div>
        <div className="mb-12">
          {discoveryVerse ? (
            <div className="space-y-6">
              <p className="text-3xl md:text-4xl font-playfair italic leading-relaxed text-[#1A1A1A]">
                {discoveryVerse.mesra1} <br /> {discoveryVerse.mesra2}
              </p>
              <p className="text-[#8B2635]/60 font-medium">
                — {discoveryVerse.works?.poets?.name_fa}, {discoveryVerse.works?.title_fa}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-playfair italic text-[#8B2635]/40">
              "Every path has its rest, every traveler has a story."
            </p>
          )}
        </div>
        <h1 className="text-xl font-medium text-[#1A1A1A]/40 italic">
          Where the Path Rests and Ideas Journey On
        </h1>
      </section>

      {/* Library Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold font-playfair">The Library of Poets</h2>
          <div className="flex-grow h-px bg-[#8B2635]/10" />
        </div>
        
        {error ? (
          <div className="p-8 border border-red-200 bg-red-50 text-red-700 rounded-lg">
            Error connecting to library: {error.message}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {poets?.map((poet) => (
              <div 
                key={poet.id} 
                className="group relative bg-white border border-[#8B2635]/10 p-8 hover:border-[#8B2635] transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#8B2635] group-hover:h-full transition-all duration-500" />
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold font-playfair mb-1 group-hover:text-[#8B2635] transition-colors">
                      {poet.name_fa}
                    </h3>
                    <p className="text-sm text-[#8B2635]/40 font-medium uppercase tracking-tighter">
                      {poet.name_en}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-[#FDFCF0] border border-[#8B2635]/10 rounded text-[#8B2635]/60 uppercase">
                    {poet.era}
                  </span>
                </div>
                <p className="text-[#1A1A1A]/70 leading-relaxed text-sm mb-8 line-clamp-3">
                  {poet.bio_fa || poet.bio_en || "A timeless voice from the heart of the Silk Road."}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#8B2635]/5">
                  <span className="text-[10px] font-bold text-[#8B2635]/30 uppercase tracking-widest">
                    {poet.region || "Silk Road"}
                  </span>
                  <button className="text-xs font-bold text-[#8B2635] hover:underline underline-offset-4">
                    Enter Room →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#8B2635]/10 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Image src="/logo.png" alt="Karvansara Logo" width={30} height={30} className="grayscale" />
            <span className="text-sm font-bold tracking-widest text-[#1A1A1A] uppercase">Karvansara</span>
          </div>
          <div className="text-[10px] font-bold text-[#8B2635]/40 uppercase tracking-[0.2em]">
            Where the Path Rests and Ideas Journey On
          </div>
          <div className="text-[10px] font-mono text-[#1A1A1A]/30">
            © 2026 OUTPOST ONE
          </div>
        </div>
      </footer>
    </main>
  );
}
