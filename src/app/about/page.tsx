import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
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
          <Link href="/history" className="hover:text-[#8B2635] transition-colors">History</Link>
          <Link href="/about" className="text-[#8B2635] border-b-2 border-[#8B2635]">About</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold font-playfair mb-12 text-[#8B2635]">Our Mission</h1>
        <div className="space-y-8 text-lg leading-relaxed text-[#1A1A1A]/80">
          <p className="font-playfair text-2xl italic text-[#8B2635]/70 border-l-4 border-[#8B2635]/20 pl-6 mb-12">
            "To build a digital bridge across time and geography, where the profound wisdom of Silk Road heritage finds a contemporary voice."
          </p>
          <p>
            Karvansara is a digital preservation and discovery initiative dedicated to the literary and cultural legacy of the Silk Road. Our platform serves as a "resting place" for timeless ideas, just as the physical caravanserais once served as sanctuaries for travelers and merchants across Eurasia.
          </p>
          <p>
            We believe that the verses of Rumi, Hafez, and countless other voices from Persia, Central Asia, and beyond are not just historical artifacts, but living philosophies that remain deeply relevant to the modern human experience.
          </p>
          <div className="bg-white p-12 border border-[#8B2635]/10 shadow-sm mt-16">
            <h2 className="text-xl font-bold font-playfair uppercase tracking-widest text-[#8B2635] mb-6">Our Core Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 bg-[#8B2635] mt-2.5 rounded-full" />
                <span><strong>Accessibility:</strong> Breaking language barriers to make complex heritage intuitive for everyone.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 bg-[#8B2635] mt-2.5 rounded-full" />
                <span><strong>Authenticity:</strong> Preserving the original script and cultural nuances of every piece.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 bg-[#8B2635] mt-2.5 rounded-full" />
                <span><strong>Innovation:</strong> Using modern design and data engineering to serve ancient wisdom.</span>
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
