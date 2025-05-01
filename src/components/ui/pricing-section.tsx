"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTranslations } from "@/hooks/use-translations";

export function PricingSection() {
  const { t } = useTranslations();
  const [annually, setAnnually] = useState(true);

  // Fiyatlandırma planları
  const plans = [
    {
      id: "basic",
      name: t('pricing.plans.basic.name', 'Başlangıç'),
      description: t('pricing.plans.basic.description', 'Temel makrolar ile oyunlarda avantaj elde edin'),
      monthly: 49,
      yearly: 470,
      features: [
        { name: t('pricing.features.basicTrigger', 'Temel Tetik Makroları'), included: true, info: t('pricing.features.basicTrigger.info', 'Tek tıklama ile seri tetik atışı yapın') },
        { name: t('pricing.features.jumpShot', 'Sıçrama Atışı'), included: true, info: t('pricing.features.jumpShot.info', 'Otomatik zıplayıp ateş ederek hedef şaşırtma') },
        { name: t('pricing.features.basicRecoil', 'Temel Recoil Kontrolü'), included: true, info: t('pricing.features.basicRecoil.info', 'Basit silahlar için sekme kontrolü') },
        { name: t('pricing.features.singleGame', 'Tek Oyun Desteği'), included: true, info: t('pricing.features.singleGame.info', 'Sadece tek bir oyun için makro desteği') },
        { name: t('pricing.features.updates', 'Güncellemeler'), included: false, info: t('pricing.features.updates.info', 'Gelecek güncellemeler ve yeni özellikler') },
        { name: t('pricing.features.customSupport', 'Özel Destek'), included: false, info: t('pricing.features.customSupport.info', 'Öncelikli teknik destek ve kurulum yardımı') },
        { name: t('pricing.features.advancedMacros', 'Gelişmiş Makrolar'), included: false, info: t('pricing.features.advancedMacros.info', 'İleri düzey oyun teknikleri için makrolar') },
      ],
      badge: "",
      color: "gray",
    },
    {
      id: "pro",
      name: t('pricing.plans.pro.name', 'Pro'),
      description: t('pricing.plans.pro.description', 'En popüler seçenek, tüm temel makrolar ve güncellemeler'),
      monthly: 99,
      yearly: 950,
      features: [
        { name: t('pricing.features.basicTrigger', 'Temel Tetik Makroları'), included: true, info: t('pricing.features.basicTrigger.info', 'Tek tıklama ile seri tetik atışı yapın') },
        { name: t('pricing.features.jumpShot', 'Sıçrama Atışı'), included: true, info: t('pricing.features.jumpShot.info', 'Otomatik zıplayıp ateş ederek hedef şaşırtma') },
        { name: t('pricing.features.advancedRecoil', 'Gelişmiş Recoil Kontrolü'), included: true, info: t('pricing.features.advancedRecoil.info', 'Tüm silahlar için tam sekme kontrolü') },
        { name: t('pricing.features.multiGame', 'Çoklu Oyun Desteği'), included: true, info: t('pricing.features.multiGame.info', '3 farklı oyun için makro desteği') },
        { name: t('pricing.features.freeUpdates', 'Ücretsiz Güncellemeler'), included: true, info: t('pricing.features.freeUpdates.info', '1 yıl boyunca tüm güncellemeler dahil') },
        { name: t('pricing.features.customSupport', 'Özel Destek'), included: true, info: t('pricing.features.customSupport.info', 'Öncelikli teknik destek ve kurulum yardımı') },
        { name: t('pricing.features.advancedMacros', 'Gelişmiş Makrolar'), included: false, info: t('pricing.features.advancedMacros.info', 'İleri düzey oyun teknikleri için makrolar') },
      ],
      badge: t('pricing.plans.pro.badge', 'En Popüler'),
      color: "red",
    },
    {
      id: "elite",
      name: t('pricing.plans.elite.name', 'Elite'),
      description: t('pricing.plans.elite.description', 'Profesyonel oyuncular için tüm özellikler ve ayrıcalıklar'),
      monthly: 149,
      yearly: 1430,
      features: [
        { name: t('pricing.features.basicTrigger', 'Temel Tetik Makroları'), included: true, info: t('pricing.features.basicTrigger.info', 'Tek tıklama ile seri tetik atışı yapın') },
        { name: t('pricing.features.jumpShot', 'Sıçrama Atışı'), included: true, info: t('pricing.features.jumpShot.info', 'Otomatik zıplayıp ateş ederek hedef şaşırtma') },
        { name: t('pricing.features.topRecoil', 'Üst Düzey Recoil Kontrolü'), included: true, info: t('pricing.features.topRecoil.info', 'Tüm silahlar için yapay zeka destekli sekme kontrolü') },
        { name: t('pricing.features.unlimitedGames', 'Sınırsız Oyun Desteği'), included: true, info: t('pricing.features.unlimitedGames.info', 'Tüm desteklenen oyunlar için makro desteği') },
        { name: t('pricing.features.lifetimeUpdates', 'Ömür Boyu Güncellemeler'), included: true, info: t('pricing.features.lifetimeUpdates.info', 'Sürekli ve sınırsız güncellemeler') },
        { name: t('pricing.features.vipSupport', 'VIP Destek'), included: true, info: t('pricing.features.vipSupport.info', '7/24 VIP teknik destek ve özel kurulum') },
        { name: t('pricing.features.advancedMacros', 'Gelişmiş Makrolar'), included: true, info: t('pricing.features.advancedMacros.info', 'Tüm ileri düzey oyun teknikleri için özel makrolar') },
      ],
      badge: t('pricing.plans.elite.badge', 'Sınırsız Erişim'),
      color: "orange",
    },
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Arka plan süslemeleri */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-macrosnip-red opacity-5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="red-gradient-text">{t('pricing.title', 'Güç')}</span> {t('pricing.titleSuffix', 'Sizin Elinizde')}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {t('pricing.description', 'İhtiyaçlarınıza uygun fiyatlandırma planını seçin ve oyun dünyasında fark yaratın. Tüm planlar 30 gün içinde para iade garantisi ile birlikte gelir.')}
            </p>

            {/* Fiyat geçiş switchi */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${annually ? 'text-gray-300' : 'text-white'}`}>{t('pricing.monthly', 'Aylık')}</span>
              <button
                onClick={() => setAnnually(!annually)}
                className={`relative w-14 h-7 transition-colors duration-300 rounded-full ${annually ? 'bg-macrosnip-red' : 'bg-macrosnip-gray'}`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    annually ? 'translate-x-7' : ''
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${annually ? 'text-white' : 'text-gray-300'}`}>
                {t('pricing.yearly', 'Yıllık')} <span className="text-macrosnip-red font-bold">{t('pricing.yearlyDiscount', '(20% indirim)')}</span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card
                className={`w-full relative bg-macrosnip-dark border-macrosnip-gray hover:border-macrosnip-${plan.color === 'red' ? 'red' : plan.color === 'orange' ? 'orange' : 'gray'} transition-all duration-300`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 right-4 bg-macrosnip-${plan.color === 'red' ? 'red' : 'orange'} py-1 px-3 rounded-full text-xs font-bold`}>
                    {plan.badge}
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">₺{annually ? plan.yearly : plan.monthly}</span>
                    <span className="text-gray-300 ml-2">{annually ? t('pricing.perYear', '/yıl') : t('pricing.perMonth', '/ay')}</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={`${plan.id}-feature-${idx}`} className="flex items-start">
                        {feature.included ? (
                          <Check className="text-green-500 h-5 w-5 mt-0.5 mr-3 shrink-0" />
                        ) : (
                          <X className="text-gray-500 h-5 w-5 mt-0.5 mr-3 shrink-0" />
                        )}
                        <span className="text-gray-300">
                          {feature.name}
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Info className="inline-block ml-1 h-3.5 w-3.5 text-gray-400 cursor-help" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64 bg-macrosnip-dark border-macrosnip-gray text-sm">
                              {feature.info}
                            </HoverCardContent>
                          </HoverCard>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.id === "pro" ? "default" : "outline"}
                    className={`w-full valorant-angle ${
                      plan.id === "pro"
                        ? "red-gradient text-white"
                        : plan.id === "elite"
                          ? "border-macrosnip-orange hover:bg-macrosnip-orange/10"
                          : "border-macrosnip-gray hover:bg-macrosnip-gray/10"
                    }`}
                  >
                    {t('pricing.getStarted', 'Şimdi Başla')}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm max-w-3xl mx-auto">
            {t('pricing.disclaimer', '* Tüm fiyatlar Türk Lirası cinsindendir ve KDV dahildir. Tüm planlar 30 gün içinde para iade garantisi içerir. MacroSnip, oyun şartlarına ve politikalarına uygun kullanım gerektirir. Makro kullanımı bazı oyunlarda yasak olabilir. Kullanım sorumluluğu kullanıcıya aittir.')}
          </p>
        </div>
      </div>
    </section>
  );
}
