"use client";

import { LiveChat } from "@/components/ui/live-chat";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultLocale } from "@/middleware";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

// Desteklenen diller
const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const { t } = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    // Remove any extension-added classes during hydration
    // This runs only on the client after hydration
    document.body.className = "antialiased min-h-screen bg-gradient-to-br from-macrosnip-darker to-macrosnip-dark";

    // URL'den dil kodunu al
    const pathSegments = pathname.split('/');
    const localeInPath = pathSegments.length > 1 ? pathSegments[1] : '';

    // Desteklenen dillerden biri ise, mevcut dil olarak ayarla
    if (languages.map(lang => lang.code).includes(localeInPath)) {
      setCurrentLocale(localeInPath);
    }

    // Sayfa yüklendiğinde 5 saniye sonra dil seçimini göster
    const timer = setTimeout(() => {
      if (localStorage.getItem('languageSelectorShown') !== 'true') {
        setShowLanguageSelector(true);
        localStorage.setItem('languageSelectorShown', 'true');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Dil değiştirildiğinde aynı sayfayı farklı dilde göster
  const getPathWithNewLocale = (newLocale: string) => {
    const pathSegments = pathname.split('/');

    // URL'de zaten dil kodu varsa güncelle
    if (languages.map(lang => lang.code).includes(pathSegments[1])) {
      pathSegments[1] = newLocale;
      return pathSegments.join('/');
    }

    // URL'de dil kodu yoksa, başına ekle
    return `/${newLocale}${pathname === '/' ? '' : pathname}`;
  };

  const closeLanguageSelector = () => {
    setShowLanguageSelector(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLocale) || languages[0];
  };

  return (
    <>
      {children}

      {/* Canlı Destek */}
      <LiveChat />

      {/* Dil Seçim İkonu */}
      <div className="fixed top-4 right-20 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full bg-macrosnip-darker border border-macrosnip-gray hover:bg-macrosnip-dark">
            <Globe className="h-5 w-5 text-gray-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-macrosnip-darker border-macrosnip-gray p-1 w-36">
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} asChild>
                <Link
                  href={getPathWithNewLocale(lang.code)}
                  className={`flex items-center px-3 py-2 text-sm rounded hover:bg-macrosnip-dark transition-colors ${
                    currentLocale === lang.code ? 'bg-macrosnip-red/20 text-white' : 'text-gray-300'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  <span>{lang.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dil Seçim Popup */}
      {showLanguageSelector && (
        <div className="fixed bottom-20 inset-x-0 mx-auto z-50 w-80 bg-macrosnip-darker border border-macrosnip-gray rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 border-b border-macrosnip-gray">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-white">{t('common.languageSelection', 'Dil Seçimi / Language')}</h3>
              <button onClick={closeLanguageSelector} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={getPathWithNewLocale(lang.code)}
                className={`flex items-center p-3 rounded hover:bg-macrosnip-dark transition-colors ${
                  currentLocale === lang.code ? 'bg-macrosnip-red/20 border border-macrosnip-red/30' : 'border border-macrosnip-gray'
                }`}
                onClick={closeLanguageSelector}
              >
                <span className="text-xl mr-3">{lang.flag}</span>
                <span className="text-white">{lang.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
