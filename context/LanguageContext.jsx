import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import kn from '../i18n/kn.json';
import hi from '../i18n/hi.json';

const translations = { en, kn, hi };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('sindaagro_lang') || 'en';
  });

  const setLang = (newLang) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem('sindaagro_lang', newLang);
    }
  };

  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[lang] || translations.en;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English if translation missing in chosen language
        let fallbackObj = translations.en;
        for (const fk of keys) {
          if (fallbackObj && fallbackObj[fk] !== undefined) {
            fallbackObj = fallbackObj[fk];
          } else {
            return fallback || path;
          }
        }
        return fallbackObj;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
