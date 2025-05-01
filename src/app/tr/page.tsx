import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { BlogSection } from "@/components/ui/blog-section";
import { LiveChat } from "@/components/ui/live-chat";
import Link from "next/link";

export default function Home() {
  const locale = "tr";

  return (
    <main className="min-h-screen">
      {/* Animasyonlu arka plan */}
      <AnimatedBackground />
      {/* Canlı sohbet */}
      <LiveChat />
      {/* Üst menü */}
      <Header />
      {/* Ana sayfa bölümleri */}
      <HeroSection />
      <FeaturesSection />
      {/* Başarı Hikayeleri */}
      <TestimonialsSection />
      {/* Ücretlendirme */}
      <PricingSection />
      {/* Blog & Haberler */}
      <BlogSection />
      {/* Footer - basit bir footer ekliyoruz */}
      <footer className="bg-macrosnip-darker py-10 border-t border-macrosnip-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 red-gradient-text">MacroSnip</h3>
              <p className="text-gray-400 text-sm">
                Oyun dünyasında üstünlük sağlayan yüksek performanslı makro scriptleri ile oyun deneyiminizi bir üst seviyeye taşıyın.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ürünler</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/${locale}/macros?game=Valorant`} className="hover:text-white transition-colors">
                    Valorant Makroları
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/macros?game=CS:GO`} className="hover:text-white transition-colors">
                    CS:GO Makroları
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/macros?game=Fortnite`} className="hover:text-white transition-colors">
                    Fortnite Makroları
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/macros?game=Apex Legends`} className="hover:text-white transition-colors">
                    Apex Legends Makroları
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Şirket</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/careers`} className="hover:text-white transition-colors">
                    Kariyer
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                    Kullanım Şartları
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/refund`} className="hover:text-white transition-colors">
                    İade Politikası
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/kvkk`} className="hover:text-white transition-colors">
                    KVKK
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-macrosnip-gray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MacroSnip. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="https://discord.com" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
