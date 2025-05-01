"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  game: string;
  achievement?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmet K.",
    role: "Pro Valorant Oyuncusu",
    avatar: "https://same-assets.com/images/valorant-player-1.jpg",
    content: "MacroSnip sayesinde Valorant'ta rekabetçi oyunlarda istikrarlı bir şekilde daha iyi performans göstermeye başladım. Spray kontrolü makroları gerçekten fark yaratıyor!",
    rating: 5,
    game: "Valorant",
    achievement: "İmmortal 3 Rütbesi"
  },
  {
    id: 2,
    name: "Mehmet Y.",
    role: "Twitch Yayıncısı",
    avatar: "https://same-assets.com/images/valorant-player-2.jpg",
    content: "Yayınlarda kullandığım makrolar izleyicilerimi gerçekten etkiledi. MacroSnip'in Chamber makroları sayesinde kafadan vuruş oranım %30 arttı ve yayınlarım daha eğlenceli hale geldi.",
    rating: 5,
    game: "Valorant",
    achievement: "100K+ Takipçi"
  },
  {
    id: 3,
    name: "Zeynep A.",
    role: "E-Spor Takım Oyuncusu",
    avatar: "https://same-assets.com/images/valorant-player-3.jpg",
    content: "Takımımla birlikte turnuvalara hazırlanırken MacroSnip makrolarını keşfettik. Hareket ve peek makroları sayesinde rakiplerimize karşı önemli bir avantaj elde ettik.",
    rating: 4,
    game: "Valorant",
    achievement: "Ulusal Turnuva 2. lik"
  },
  {
    id: 4,
    name: "Burak T.",
    role: "Semi-Pro CS:GO Oyuncusu",
    avatar: "https://same-assets.com/images/csgo-player-1.jpg",
    content: "CS:GO Recoil Master Pro makrosu, ateş etme kontrolümü tamamen değiştirdi. Artık uzun mesafe çatışmalarda bile istikrarlı bir şekilde hedefi vurabiliyorum.",
    rating: 5,
    game: "CS:GO",
    achievement: "Global Elite Rütbesi"
  },
  {
    id: 5,
    name: "Elif S.",
    role: "Fortnite İçerik Üreticisi",
    avatar: "https://same-assets.com/images/fortnite-player-1.jpg",
    content: "Fortnite Turbo Building Pro makrosu inşa hızımı inanılmaz derecede artırdı. Artık build savaşlarında çok daha rekabetçiyim ve editlerimi çok daha hızlı yapabiliyorum.",
    rating: 5,
    game: "Fortnite",
    achievement: "Arena 7000+ Puan"
  }
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Otomatik geçiş için
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setTimeout(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [current, autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrent(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Arka plan süslemeleri */}
      <div className="absolute top-0 right-0 w-1/3 h-1 bg-macrosnip-red opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1 bg-macrosnip-orange opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="red-gradient-text">Başarı</span> Hikayeleri
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            MacroSnip kullanıcılarının gerçek deneyimleri ve elde ettikleri sonuçlar.
            Makrolarımız sayesinde oyun performanslarını nasıl artırdıklarını keşfedin.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Kayan testimonial karousel */}
          <div className="relative h-[450px] sm:h-[400px] overflow-hidden rounded-lg">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 flex flex-col md:flex-row p-6 md:p-8 gap-6 bg-macrosnip-dark border border-macrosnip-gray rounded-lg",
                  "transition-opacity duration-500"
                )}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: current === index ? 1 : 0,
                  x: current === index ? 0 : 100,
                  pointerEvents: current === index ? "auto" : "none"
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Avatar ve kişi bilgileri */}
                <div className="md:w-64 flex flex-col items-center md:items-start">
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-macrosnip-red mb-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center md:text-left">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>

                    {/* Yıldızlar */}
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Oyun ve başarı */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center md:justify-start">
                        <span className="bg-macrosnip-gray px-3 py-1 rounded-full text-xs font-medium">
                          {testimonial.game}
                        </span>
                      </div>

                      {testimonial.achievement && (
                        <div className="flex items-center justify-center md:justify-start">
                          <span className="bg-macrosnip-red/20 text-macrosnip-red px-3 py-1 rounded-full text-xs font-medium">
                            {testimonial.achievement}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Testimonial metni */}
                <div className="flex-1 flex flex-col justify-center relative">
                  <Quote className="absolute text-macrosnip-red/20 w-12 h-12" />
                  <blockquote className="text-lg pl-6 pt-6 italic text-gray-300">
                    {testimonial.content}
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigasyon butonları */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-macrosnip-dark/70 backdrop-blur-sm hover:bg-macrosnip-dark rounded-full h-10 w-10"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-macrosnip-dark/70 backdrop-blur-sm hover:bg-macrosnip-dark rounded-full h-10 w-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  current === index ? "bg-macrosnip-red" : "bg-macrosnip-gray"
                }`}
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(index);
                }}
                aria-label={`Gösterimi ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
