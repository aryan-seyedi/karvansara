import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: poets, error } = await supabase
    .from('poets')
    .select('*')
    .order('name', { ascending: true });

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#2D2D2D] selection:bg-[#C0392B] selection:text-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl">🍎</span>
          <h1 className="text-6xl font-bold tracking-tight text-[#C0392B]">Karvansara</h1>
        </div>
        
        <p className="text-2xl font-medium mb-4 text-[#4A4A4A] leading-relaxed">
          The Silk Road Digital Library.
        </p>
        
        <div className="h-px bg-[#E5E0D0] w-full mb-8" />
        
        <div className="flex flex-wrap gap-4 text-sm font-mono uppercase tracking-widest text-[#7F8C8D]">
          <span>Culture</span>
          <span className="text-[#BDC3C7]">•</span>
          <span>Poetry</span>
          <span className="text-[#BDC3C7]">•</span>
          <span>History</span>
        </div>
      </div>

      {/* Library Section */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold mb-8 border-b border-[#E5E0D0] pb-2 text-[#2D2D2D]">The Library of Poets</h2>
        
        {error ? (
          <p className="text-red-500 font-mono">Error connecting to library: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {poets?.map((poet) => (
              <div 
                key={poet.id} 
                className="group border border-[#E5E0D0] p-6 hover:border-[#C0392B] transition-all cursor-default bg-white shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold group-hover:text-[#C0392B] transition-colors">
                    {poet.name}
                  </h3>
                  <span className="text-xs font-mono text-[#95A5A6]">{poet.era}</span>
                </div>
                <p className="text-sm text-[#7F8C8D] leading-relaxed mb-4">
                  {poet.description || "A voice from the Silk Road."}
                </p>
                <div className="text-[10px] font-mono text-[#BDC3C7] uppercase">
                  {poet.birthplace || "Unknown Origins"}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 border-2 border-dashed border-[#E5E0D0] rounded-lg text-center">
          <p className="text-[#95A5A6] italic">"The ink of a scholar is more holy than the blood of a martyr."</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-[#E5E0D0]">
        <div className="flex justify-between items-center">
          <div className="text-xs font-mono text-[#BDC3C7]">
            KARVANSARA PROJECT © 2026
          </div>
          <div className="text-xs font-mono text-[#27AE60] animate-pulse">
            DATABASE ONLINE • 21 POETS SYNCED
          </div>
        </div>
      </footer>
    </main>
  );
}
