'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'EN' | 'FA';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, fa: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('karvansara-lang') as Language;
    if (saved && (saved === 'EN' || saved === 'FA')) {
      setLanguage(saved);
      document.dir = saved === 'FA' ? 'rtl' : 'ltr';
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('karvansara-lang', lang);
    document.dir = lang === 'FA' ? 'rtl' : 'ltr';
  };

  const t = (en: string, fa: string) => (language === 'EN' ? en : fa);

  // Prevent hydration mismatch by only rendering the wrapper logic after mounting
  // but we still want to render children so the initial HTML matches.
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      <div dir={mounted ? (language === 'FA' ? 'rtl' : 'ltr') : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
