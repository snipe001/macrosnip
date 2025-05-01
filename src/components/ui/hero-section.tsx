"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ShoppingCart, ArrowRight, Download, Star } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export function HeroSection() {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!keyboardRef.current) return;

    // Keyboard keys animasyonu
    const keys = keyboardRef.current.querySelectorAll('.key');

    keys.forEach((key, index) => {
      // Random başlangıç ve bitiş noktaları
      const startOpacity = 0.3;
      const endOpacity = 1;

      // Her tuş için farklı bir gecikme
      const delay = index * 0.1 % 2;

      gsap.fromTo(
        key,
        { opacity: startOpacity },
        {
          opacity: endOpacity,
          duration: 0.5 + Math.random() * 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: delay
        }
      );
    });

    return () => {
      gsap.killTweensOf(keys);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Süsleme kırmızı yatay çizgiler */}
      <div className="absolute -right-20 top-40 w-80 h-1 bg-macrosnip-red rotate-45 opacity-25" />
      <div className="absolute -left-20 bottom-40 w-80 h-1 bg-macrosnip-orange -rotate-45 opacity-25" />

      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Sol taraf - metin içeriği */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-macrosnip-dark border border-macrosnip-red rounded-md text-sm font-medium text-macrosnip-red">
              {t('home.hero.tagline', 'YÜKSEK PERFORMANS')}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
              <span className="block text-white">{t('home.hero.title', 'Oyun Deneyimini')}</span>
              <span className="block mt-2 red-gradient-text text-glow">{t('home.hero.subtitle', 'Güçlendir')}</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
              {t('home.hero.description', 'MacroSnip, oyun performansınızı artırmak için özel olarak tasarlanmış yüksek kaliteli makro scriptleri sunar. Valorant, CS:GO ve diğer popüler oyunlar için optimize edilmiştir.')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <Button
                size="lg"
                className="valorant-button valorant-angle red-gradient text-white px-8 py-6 text-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t('home.hero.buyNow', 'Hemen Satın Al')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="valorant-button valorant-angle-reverse border-macrosnip-gray px-8 py-6 text-lg group"
                asChild
              >
                <Link href="/macros">
                  {t('home.hero.exploreMacros', 'Makroları Keşfet')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-8 pt-8 mt-4 border-t border-macrosnip-gray">
              <div className="flex items-center">
                <Star className="text-yellow-400 h-5 w-5" />
                <Star className="text-yellow-400 h-5 w-5" />
                <Star className="text-yellow-400 h-5 w-5" />
                <Star className="text-yellow-400 h-5 w-5" />
                <Star className="text-yellow-400 h-5 w-5" />
                <span className="ml-2 text-gray-300">{t('home.hero.ratings', '500+ Değerlendirme')}</span>
              </div>

              <div className="flex items-center">
                <Download className="text-macrosnip-red h-5 w-5 mr-2" />
                <span className="text-gray-300">{t('home.hero.downloads', '10K+ İndirme')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sağ taraf - keyboard görseli */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative h-80 sm:h-96 md:h-[500px] valorant-angle overflow-hidden bg-macrosnip-dark border border-macrosnip-gray shadow-xl">
            <div ref={keyboardRef} className="absolute inset-0 p-8 grid grid-cols-12 grid-rows-5 gap-2">
              {/* Klavye tuşları - gsap ile animasyon eklenecek */}
              {Array.from({ length: 60 }).map((_, index) => (
                <div
                  key={index}
                  className={`key bg-macrosnip-darker border border-macrosnip-gray rounded flex items-center justify-center text-xs font-mono ${
                    index === 13 || index === 27 || index === 40 || index === 52 ? 'col-span-2' : 'col-span-1'
                  } ${index === 56 ? 'col-span-3' : ''}`}
                >
                  {index === 20 && <span className="text-macrosnip-red">W</span>}
                  {index === 31 && <span className="text-macrosnip-red">A</span>}
                  {index === 32 && <span className="text-macrosnip-red">S</span>}
                  {index === 33 && <span className="text-macrosnip-red">D</span>}
                </div>
              ))}
            </div>

            {/* Kodlama benzeri overlay - yazı animasyonu */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-macrosnip-darker to-transparent p-4">
              <pre className="text-xs font-mono text-green-500 opacity-80">
                <code>
                  <span className="text-blue-400">function</span>{" "}
                  <span className="text-yellow-400">macroActivate</span>
                  (event) {"{}"}<br />
                  {"  "}
                  <span className="text-blue-400">if</span> (event.key === "W") {"{}"}<br />
                  {"    "}
                  <span className="text-purple-400">performJumpShot</span>();<br />
                  {"  "}<br />
                  {"}"}
                </code>
              </pre>
            </div>

            {/* Üstteki kırmızı ışık efekti */}
            <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-b from-macrosnip-red opacity-10" />
          </div>

          {/* Yuvarlak kırmızı "Canlı Demo" etiketi */}
          <div className="absolute -top-4 -right-4 bg-macrosnip-red rounded-full px-4 py-2 text-white font-bold shadow-lg animate-pulse">
            {t('home.hero.liveDemo', 'Canlı Demo')}
          </div>
        </motion.div>
      </div>

      {/* Alt kısımdaki markalar */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <span className="text-xl font-bold text-gray-400">{t('games.valorant', 'Valorant')}</span>
            <span className="text-xl font-bold text-gray-400">{t('games.csgo', 'CS:GO')}</span>
            <span className="text-xl font-bold text-gray-400">{t('games.fortnite', 'Fortnite')}</span>
            <span className="text-xl font-bold text-gray-400">{t('games.apex', 'Apex Legends')}</span>
            <span className="text-xl font-bold text-gray-400">{t('games.pubg', 'PUBG')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
