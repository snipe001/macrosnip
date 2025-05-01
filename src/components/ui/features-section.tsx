"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  MousePointer,
  Lock,
  Award,
  Cpu,
  RefreshCw,
  HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "@/hooks/use-translations";

export function FeaturesSection() {
  const { t } = useTranslations();

  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-macrosnip-red" />,
      titleKey: 'features.noDetectionRisk.title',
      descriptionKey: 'features.noDetectionRisk.description',
      title: "Algılanma Riski Yok",
      description: "Özel koruma sistemi ile hiçbir anti-cheat tarafından tespit edilmez."
    },
    {
      icon: <Zap className="h-10 w-10 text-macrosnip-orange" />,
      titleKey: 'features.highPerformance.title',
      descriptionKey: 'features.highPerformance.description',
      title: "Yüksek Performans",
      description: "Düşük gecikme süresi ve optimum ayarlar ile maksimum oyun performansı."
    },
    {
      icon: <MousePointer className="h-10 w-10 text-blue-500" />,
      titleKey: 'features.preciseControl.title',
      descriptionKey: 'features.preciseControl.description',
      title: "Hassas Kontrol",
      description: "Silah kontrolü ve nişan alma hassasiyeti için özel ayarlanmış makrolar."
    },
    {
      icon: <Lock className="h-10 w-10 text-green-500" />,
      titleKey: 'features.secureUsage.title',
      descriptionKey: 'features.secureUsage.description',
      title: "Güvenli Kullanım",
      description: "End-to-end şifreleme ile hesap bilgileriniz güvende kalır."
    },
    {
      icon: <Cpu className="h-10 w-10 text-yellow-500" />,
      titleKey: 'features.lowResourceUsage.title',
      descriptionKey: 'features.lowResourceUsage.description',
      title: "Düşük Kaynak Kullanımı",
      description: "Optimize edilmiş kod sayesinde minimum sistem kaynağı kullanır."
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-purple-500" />,
      titleKey: 'features.autoUpdates.title',
      descriptionKey: 'features.autoUpdates.description',
      title: "Otomatik Güncellemeler",
      description: "Oyun güncellemelerine anında uyum sağlayan otomatik güncelleme sistemi."
    },
    {
      icon: <Award className="h-10 w-10 text-macrosnip-red" />,
      titleKey: 'features.proApproved.title',
      descriptionKey: 'features.proApproved.description',
      title: "Pro Oyuncu Onaylı",
      description: "Profesyonel oyuncular tarafından test edilmiş ve onaylanmış makrolar."
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-macrosnip-orange" />,
      titleKey: 'features.support247.title',
      descriptionKey: 'features.support247.description',
      title: "7/24 Destek",
      description: "Teknik sorunlarda anında yardım için 7/24 canlı destek hizmeti."
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Arka plan süslemeleri */}
      <div className="absolute inset-0 bg-macrosnip-darker skew-y-3 -z-10 transform-gpu" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="red-gradient-text text-glow">{t('home.features.title', 'Özellikleri')}</span> {t('home.features.discoverText', 'Keşfedin')}
          </h2>
          <p className="text-gray-300 text-lg">
            {t('home.features.description', 'MacroSnip makroları, oyun deneyiminizi üst seviyeye çıkarmak için tasarlanmış özel özelliklerle donatılmıştır. Rakiplerinizin bir adım önüne geçin.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={`feature-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-macrosnip-dark rounded-lg p-6 border border-macrosnip-gray hover:border-macrosnip-red transition-colors group"
            >
              <div className="mb-4 transform transition-transform group-hover:scale-110 duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-macrosnip-red transition-colors">
                {t(feature.titleKey, feature.title)}
              </h3>
              <p className="text-gray-400">
                {t(feature.descriptionKey, feature.description)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="valorant-button valorant-angle bg-macrosnip-darker border border-macrosnip-red hover:bg-macrosnip-red transition-colors text-white px-8"
            asChild
          >
            <Link href="/pricing">
              {t('home.features.viewAllFeatures', 'Tüm Özellikleri Görüntüle')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
