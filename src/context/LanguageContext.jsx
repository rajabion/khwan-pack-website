import React, { createContext, useContext, useState } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  const toggleLang = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  const t = path => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      result = result[key];
    }
    return result;
  };

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'خوان باك | وحدة إبداعية لقطاع الضيافة'
        : 'Khwan Pack | Strategic Hospitality Packaging';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext);
