"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function AboutPage() {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">Hakkımızda</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 red-gradient-text">Hakkımızda</h1>

            {/* Ana bölüm */}
            <div className="bg-macrosnip-dark p-8 rounded-lg border border-macrosnip-gray mb-12">
              <h2 className="text-2xl font-bold mb-4">MacroSnip Hikayemiz</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                MacroSnip, 2021 yılında bir grup profesyonel oyuncu ve yazılım geliştiricisi tarafından
                kurulmuştur. Ekibimiz, oyun performansını optimize etmek için çözümler arayan
                oyuncuların ihtiyaçlarını karşılamak amacıyla yola çıktı.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Başlangıçta sadece birkaç FPS oyunu için makro geliştiren küçük bir ekip olarak başladık,
                ancak zamanla ürün yelpazemizi genişlettik ve bugün dünyanın önde gelen oyun makro ve
                optimizasyon çözümleri sağlayıcılarından biri haline geldik.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Amacımız, oyunculara daha iyi bir oyun deneyimi sunmak, profesyonel düzeyde performans
                göstermelerini sağlamak ve rekabetçi oyun dünyasında daha başarılı olmalarına yardımcı olmaktır.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-macrosnip-darker p-4 rounded-lg text-center">
                  <h3 className="font-bold text-xl mb-2">3+</h3>
                  <p className="text-gray-400">Yıllık Deneyim</p>
                </div>
                <div className="bg-macrosnip-darker p-4 rounded-lg text-center">
                  <h3 className="font-bold text-xl mb-2">50,000+</h3>
                  <p className="text-gray-400">Aktif Kullanıcı</p>
                </div>
                <div className="bg-macrosnip-darker p-4 rounded-lg text-center">
                  <h3 className="font-bold text-xl mb-2">100+</h3>
                  <p className="text-gray-400">Makro Çeşidi</p>
                </div>
              </div>
            </div>

            {/* Misyon ve Vizyon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
                <p className="text-gray-300 leading-relaxed">
                  Oyunculara yüksek kaliteli, özelleştirilmiş ve sürekli güncellenen makro çözümleri
                  sunarak oyun deneyimlerini en üst seviyeye çıkarmak. Her bir kullanıcımızın rekabetçi
                  oyunlarda potansiyelini tam olarak gerçekleştirmesine yardımcı olmak için var gücümüzle
                  çalışıyoruz.
                </p>
              </div>
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
                <p className="text-gray-300 leading-relaxed">
                  Oyun dünyasında makro ve performans optimizasyonu alanında lider konuma gelerek,
                  her seviyedeki oyuncuya en gelişmiş araçları sunmak. İnovasyon ve sürekli iyileştirmeye
                  odaklanarak, oyun teknolojisindeki gelişmelere öncülük etmek istiyoruz.
                </p>
              </div>
            </div>

            {/* Ekibimiz */}
            <div className="bg-macrosnip-dark p-8 rounded-lg border border-macrosnip-gray mb-12">
              <h2 className="text-2xl font-bold mb-6">Ekibimiz</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                MacroSnip ekibi, oyun dünyasına tutkuyla bağlı, deneyimli profesyonellerden oluşmaktadır.
                Yazılım geliştiricileri, oyun analistleri, müşteri destek uzmanları ve pazarlama ekibimiz,
                size en iyi hizmeti sunmak için bir araya gelmiştir.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-macrosnip-darker p-5 rounded-lg">
                  <div className="w-20 h-20 rounded-full bg-macrosnip-gray mb-4 overflow-hidden mx-auto">
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-center mb-1">Mehmet Yılmaz</h3>
                  <p className="text-gray-400 text-sm text-center mb-3">Kurucu & CEO</p>
                  <p className="text-gray-300 text-sm">
                    Profesyonel bir e-spor geçmişine sahip olan Mehmet, oyuncuların ihtiyaçlarını ilk elden
                    anlama yeteneğiyle MacroSnip'i kurdu.
                  </p>
                </div>
                <div className="bg-macrosnip-darker p-5 rounded-lg">
                  <div className="w-20 h-20 rounded-full bg-macrosnip-gray mb-4 overflow-hidden mx-auto">
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-center mb-1">Ayşe Demir</h3>
                  <p className="text-gray-400 text-sm text-center mb-3">Baş Teknoloji Sorumlusu</p>
                  <p className="text-gray-300 text-sm">
                    10 yılı aşkın yazılım geliştirme deneyimiyle Ayşe, MacroSnip'in teknik altyapısını
                    yönetiyor ve yeni makro teknolojilerini geliştiriyor.
                  </p>
                </div>
                <div className="bg-macrosnip-darker p-5 rounded-lg">
                  <div className="w-20 h-20 rounded-full bg-macrosnip-gray mb-4 overflow-hidden mx-auto">
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-center mb-1">Emre Kaya</h3>
                  <p className="text-gray-400 text-sm text-center mb-3">Oyun Analisti</p>
                  <p className="text-gray-300 text-sm">
                    Eski bir e-spor koçu olan Emre, oyun mekaniklerini derinlemesine analiz ederek
                    makroların optimize edilmesini sağlıyor.
                  </p>
                </div>
              </div>
            </div>

            {/* Değerlerimiz */}
            <div className="bg-macrosnip-dark p-8 rounded-lg border border-macrosnip-gray mb-12">
              <h2 className="text-2xl font-bold mb-6">Değerlerimiz</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-macrosnip-red flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Kalite</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Her bir makro, en yüksek kalite standartlarında geliştirilir ve titizlikle test edilir.
                      Kullanıcılarımıza sadece en iyi ürünleri sunmaya özen gösteriyoruz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-macrosnip-red flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">İnovasyon</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Sürekli olarak yeni teknolojiler ve çözümler geliştirmek için çalışıyoruz. Oyun
                      dünyasındaki gelişmeleri yakından takip ederek, ürünlerimizi sürekli güncelliyoruz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-macrosnip-red flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Kullanıcı Odaklılık</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Kullanıcılarımızın geri bildirimlerini önemsiyor ve ihtiyaçlarına göre ürünlerimizi
                      şekillendiriyoruz. 7/24 müşteri desteği ile her zaman yanınızdayız.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-macrosnip-red flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Etik</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Dürüstlük ve şeffaflık ilkelerini benimsiyoruz. Kullanıcılarımıza her zaman net bilgiler
                      sunuyor ve onların güvenini kazanmak için çalışıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Bize Katılın</h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                MacroSnip ailesine katılın ve oyun deneyiminizi bir üst seviyeye taşıyın.
                En son makrolarımızı keşfedin ve rekabetçi avantaj elde edin.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="valorant-button valorant-angle red-gradient">
                  <Link href={`/${locale}/macros`}>
                    Makroları Keşfet
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/${locale}/contact`}>
                    Bize Ulaşın
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
