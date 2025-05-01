'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import enMessages from '@/messages/en';
import trMessages from '@/messages/tr';
import deMessages from '@/messages/de';
import ruMessages from '@/messages/ru';

// Desteklenen diller için mesaj dosyaları
const messages: Record<string, any> = {
  en: enMessages,
  tr: trMessages,
  de: deMessages,
  ru: ruMessages,
};

// Varsayılan dil
export const defaultLocale = 'tr';

// Translation hook
export function useTranslations() {
  const params = useParams();
  const locale = (params.locale as string) || defaultLocale;
  const [translations, setTranslations] = useState<Record<string, any>>(messages[locale] || messages[defaultLocale]);

  useEffect(() => {
    // Dil değiştiğinde çevirileri güncelle
    setTranslations(messages[locale] || messages[defaultLocale]);
  }, [locale]);

  // Çeviri fonksiyonu
  const t = (key: string, defaultValue?: string): string => {
    // Nested keys için (örn: 'common.appName', 'home.hero.title')
    const keys = key.split('.');
    let result = translations;

    // Anahtar zincirini takip et
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof result === 'string' ? result : defaultValue || key;
  };

  return {
    t,
    locale,
    isLocale: (l: string) => locale === l,
    availableLocales: Object.keys(messages),
  };
}
