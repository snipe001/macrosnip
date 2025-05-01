"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  X,
  LogIn,
  ChevronDown,
  Search,
  User,
  Globe
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";

// Tüm dil seçenekleri
const LOCALES = [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' }
];

export function Header() {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Her linkin başına dil kodu ekleme fonksiyonu
  const localizedHref = (path: string) => `/${locale}${path}`;

  // Aynı sayfanın farklı dil versiyonuna gitmek için
  const changeLocale = (newLocale: string) => {
    if (!isClient) return `/${newLocale}`;

    // Mevcut path
    const currentPath = window.location.pathname;

    // Locale kısmını çıkartıp yeni locale'i ekle
    const pathWithoutLocale = currentPath.substring(currentPath.indexOf('/', 1) || currentPath.length);
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header
      className={cn(
        "fixed w-full top-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-macrosnip-darker bg-opacity-90 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <span className="text-3xl font-bold red-gradient-text text-glow">{t('common.appName')}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavItem href={localizedHref("/macros")} locale={locale}>{t('nav.macros')}</NavItem>
          <DropdownNavItem
            label={t('nav.games')}
            items={[
              { label: t('games.valorant'), href: localizedHref("/games/valorant") },
              { label: t('games.csgo'), href: localizedHref("/games/csgo") },
              { label: t('games.fortnite'), href: localizedHref("/games/fortnite") },
              { label: t('games.apex'), href: localizedHref("/games/apex") },
            ]}
            locale={locale}
          />
          <NavItem href={localizedHref("/pricing")} locale={locale}>{t('nav.pricing')}</NavItem>
          <NavItem href={localizedHref("/faq")} locale={locale}>{t('nav.faq')}</NavItem>
          <NavItem href={localizedHref("/contact")} locale={locale}>{t('nav.contact')}</NavItem>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Dil Seçici */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-macrosnip-dark border-macrosnip-gray min-w-[160px] valorant-angle"
            >
              {LOCALES.map((loc) => (
                <DropdownMenuItem key={loc.code} asChild className="cursor-pointer">
                  <Link href={changeLocale(loc.code)}>
                    {loc.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={localizedHref("/cart")}>
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="secondary" className="valorant-button valorant-angle red-gradient text-white" asChild>
            <Link href={localizedHref("/login")}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>{t('common.login')}</span>
            </Link>
          </Button>
          {/* Kaydol butonu kaldırıldı */}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-gray-200 hover:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-macrosnip-dark bg-opacity-95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out",
          isMenuOpen ? "h-auto max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden py-0"
        )}
      >
        <div className="container mx-auto px-4 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-white">Menu</span>
            <Button variant="ghost" size="sm" className="text-sm" onClick={toggleMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-4">
            <MobileNavItem href={localizedHref("/macros")} onClick={toggleMenu}>{t('nav.macros')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/games/valorant")} onClick={toggleMenu}>{t('games.valorant')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/games/csgo")} onClick={toggleMenu}>{t('games.csgo')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/games/fortnite")} onClick={toggleMenu}>{t('games.fortnite')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/games/apex")} onClick={toggleMenu}>{t('games.apex')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/pricing")} onClick={toggleMenu}>{t('nav.pricing')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/faq")} onClick={toggleMenu}>{t('nav.faq')}</MobileNavItem>
            <MobileNavItem href={localizedHref("/contact")} onClick={toggleMenu}>{t('nav.contact')}</MobileNavItem>

            {/* Dil seçenekleri */}
            <div className="pt-2 border-t border-macrosnip-gray">
              <span className="text-gray-400 text-sm">{t('common.lang')}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {LOCALES.map((loc) => (
                  <Link
                    key={loc.code}
                    href={changeLocale(loc.code)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-md",
                      locale === loc.code
                        ? "bg-macrosnip-red text-white"
                        : "bg-macrosnip-gray text-gray-300 hover:text-white"
                    )}
                    onClick={toggleMenu}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex flex-col space-y-3 pt-4 border-t border-macrosnip-gray">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href={localizedHref("/login")}>
                <LogIn className="mr-2 h-4 w-4" />
                {t('common.login')}
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href={localizedHref("/cart")}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t('common.cart')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, children, locale }: { href: string; children: React.ReactNode; locale: string }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white relative px-1 py-2 group transition-colors"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-macrosnip-red group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

function DropdownNavItem({
  label,
  items,
  locale
}: {
  label: string;
  items: { label: string; href: string }[];
  locale: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-300 hover:text-white flex items-center px-1 py-2 focus:outline-none">
          {label}
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-macrosnip-dark border-macrosnip-gray min-w-[160px] valorant-angle"
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNavItem({
  href,
  onClick,
  children
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-lg text-gray-300 hover:text-white block py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
