import Link from 'next/link';
import Image from 'next/image';

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans">
      <nav className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center border-b border-[#8B2635]/10 gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Karvansara Logo" width={50} height={50} className="object-contain" />
            <span className="text-2xl font-bold tracking-tighter text-[#8B2635] font-playfair">Karvansara</span>
          </Link>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#8B2635]/60">
          <Link href="/" className="hover:text-[#8B2635] transition-colors">Library</Link>
          <Link href="/history" className="text-[#8B2635] border-b-2 border-[#8B2635]">History</Link>
          <Link href="/about" className="hover:text-[#8B2635] transition-colors">About</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold font-playfair mb-12 text-[#8B2635]">The Historical Context of the Silk Road</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 text-lg leading-relaxed text-[#1A1A1A]/80">
            <h2 className="text-2xl font-bold font-playfair text-[#8B2635]">A Bridge Across Civilizations</h2>
            <p>
              The Silk Road was never a single path, but a vast network of trade routes connecting East and West. From the bustling markets of Xi'an to the grand libraries of Baghdad and the poetic heart of Shiraz, this ancient artery facilitated the exchange of goods, ideas, and cultures.
            </p>
            <p>
              It was in the shared courtyards of the caravanserais that languages mingled and stories were born. The literary heritage we preserve today is a direct result of this centuries-long cross-pollination.
            </p>
          </div>
          
          <div className="bg-[#8B2635] p-12 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none transition-transform group-hover:scale-110">
              <Image src="/logo.png" alt="" width={128} height={128} className="invert grayscale" />
            </div>
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest mb-6 opacity-60">National Heritages</h2>
            <ul className="space-y-6">
              <li className="border-b border-white/10 pb-4">
                <h3 className="font-bold text-lg">Persia (Iran)</h3>
                <p className="text-sm opacity-80 mt-1">The epicentre of Sufi poetry and philosophical mysticism.</p>
              </li>
              <li className="border-b border-white/10 pb-4">
                <h3 className="font-bold text-lg">Central Asia</h3>
                <p className="text-sm opacity-80 mt-1">Home to Samarkand and Bukhara, key hubs for Islamic science and arts.</p>
              </li>
              <li className="pb-4">
                <h3 className="font-bold text-lg">Anatolia (Turkey)</h3>
                <p className="text-sm opacity-80 mt-1">The melting pot of Seljuk, Ottoman, and Byzantine influences.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#8B2635]/10 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-[#1A1A1A]/30 uppercase">
          <div>© 2026 <a href="https://www.farlish.ca/" className="underline">Farlish Inc</a></div>
          <div className="tracking-[0.2em] text-[#8B2635]/40 font-bold">Ideas Journey On</div>
        </div>
      </footer>
    </main>
  );
}
