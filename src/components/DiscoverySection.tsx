'use client';

import { useState } from 'react';

export default function DiscoverySection({ discoveryVerse }: { discoveryVerse: any }) {
  const [showMeaning, setShowMeaning] = useState(false);

  if (!discoveryVerse) {
    return (
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <div className="mb-6 inline-block px-3 py-1 bg-[#8B2635]/5 rounded-full text-[#8B2635] text-xs font-bold uppercase tracking-widest">
          Discovery
        </div>
        <div className="mb-12">
          <p className="text-2xl font-playfair italic text-[#8B2635]/40">
            "Every path has its rest, every traveler has a story."
          </p>
        </div>
        <h1 className="text-xl font-medium text-[#1A1A1A]/40 italic">
          Where the Path Rests and Ideas Journey On
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-6 text-center">
      <div className="mb-6 inline-block px-3 py-1 bg-[#8B2635]/5 rounded-full text-[#8B2635] text-xs font-bold uppercase tracking-widest">
        Discovery
      </div>
      
      <div className="mb-8">
        <div className="space-y-6">
          <p className="text-3xl md:text-4xl font-playfair italic leading-relaxed text-[#1A1A1A]">
            {discoveryVerse.mesra1} <br /> {discoveryVerse.mesra2}
          </p>
          <div className="flex flex-col items-center gap-4">
            <p className="text-[#8B2635]/60 font-medium">
              — {discoveryVerse.works?.poets?.name_fa} ({discoveryVerse.works?.poets?.name_en}), {discoveryVerse.works?.title_fa}
            </p>
            
            <button 
              onClick={() => setShowMeaning(!showMeaning)}
              className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-[#8B2635]/20 text-[#8B2635]/60 hover:bg-[#8B2635] hover:text-white transition-all rounded-full"
            >
              {showMeaning ? 'Hide Meaning' : 'Contextual Meaning'}
            </button>
          </div>
        </div>

        {showMeaning && (
          <div className="mt-8 p-6 bg-white border border-[#8B2635]/10 rounded-lg shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-[#1A1A1A]/70 italic leading-relaxed">
              {discoveryVerse.meaning || "This verse invites reflection on the journey of the soul and the interconnectedness of all travelers on the Silk Road."}
            </p>
          </div>
        )}
      </div>

      <h1 className="text-xl font-medium text-[#1A1A1A]/40 italic">
        Where the Path Rests and Ideas Journey On
      </h1>
    </section>
  );
}
