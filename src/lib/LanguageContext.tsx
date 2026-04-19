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

  // Load preference from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('karvansara-lang') as Language;
    if (saved && (saved === 'EN' || saved === 'FA')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('karvansara-lang', lang);
    // Optional: Update document direction
    document.dir = lang === 'FA' ? 'rtl' : 'ltr';
  };

  const t = (en: string, fa: string) => (language === 'EN' ? en : fa);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      <div dir={language === 'FA' ? 'rtl' : 'ltr'}>
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
