"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { Product, getProductsByGame } from "@/app/data/products";

export default function CSGOPage() {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  // CS:GO ile ilgili makrolar
  const products = getProductsByGame("CS:GO");

  return (
    <main className="min-h-screen">
      <AnimatedBackground
        overlayClassName="bg-gradient-to-b from-macrosnip-darker/80 via-macrosnip-darker/80 to-macrosnip-darker"
      />
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/${locale}/games`} className="hover:text-white">Oyunlar</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">CS:GO</span>
          </div>

          {/* CS:GO Hero */}
          <div className="relative mb-16 overflow-hidden rounded-lg valorant-angle border border-macrosnip-gray">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-macrosnip-darker/20 z-10"></div>
            <img
              src="https://same-assets.com/images/d7f2d9b4-e835-4dba-ba8d-8b8e8e4fc2d8"
              alt="CS:GO"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="block">CS:GO</span>
                <span className="text-cyan-500 text-glow">Makroları</span>
              </h1>
              <p className="text-gray-200 max-w-xl mb-6">
                CS:GO için profesyonel oyuncular tarafından tasarlanmış, silah kontrolünü mükemmelleştiren
                ve nişan almayı kolaylaştıran özel makrolarla rekabetçi avantaj elde edin.
              </p>
              <Button asChild className="valorant-button valorant-angle bg-gradient-to-r from-blue-600 to-cyan-600 w-auto md:w-48">
                <Link href={`/${locale}/macros?game=CS:GO`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Makrolara Göz At
                </Link>
              </Button>
            </div>
          </div>

          {/* İçerik */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ana İçerik */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                <h2 className="text-2xl font-bold mb-4">CS:GO Makroları</h2>
                <p className="text-gray-300 mb-4">
                  Counter-Strike: Global Offensive (CS:GO), Valve tarafından geliştirilen popüler bir taktiksel nişancı oyunudur.
                  MacroSnip'in CS:GO için özel olarak tasarlanmış makroları ile oyun deneyiminizi üst seviyeye taşıyın.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Recoil Kontrolü</h3>
                    <p className="text-gray-400 text-sm">
                      AK-47, M4A4 ve AWP gibi popüler silahların tepme paternlerini otomatik olarak kontrol eden
                      özel makrolar ile isabet oranınızı artırın.
                    </p>
                  </div>
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Bunny Hop</h3>
                    <p className="text-gray-400 text-sm">
                      Gelişmiş bunny hop makroları ile rakiplerinizi şaşırtın ve harita etrafında daha hızlı hareket edin.
                    </p>
                  </div>
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Silah Değiştirme</h3>
                    <p className="text-gray-400 text-sm">
                      Hızlı silah değiştirme ve quickswitch makroları ile AWP kullanımınızı profesyonel seviyeye taşıyın.
                    </p>
                  </div>
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Granata Atış Optimizasyonu</h3>
                    <p className="text-gray-400 text-sm">
                      Smoke, flash ve molotov atışlarını daha hızlı ve doğru şekilde yapmanızı sağlayan makrolar ile taktiksel avantaj elde edin.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Neden MacroSnip'in CS:GO Makroları?</h3>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Global Elite oyuncular tarafından test edilmiş ve geliştirilmiş</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Her silah için özelleştirilmiş spray paternleri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>CS:GO güncellemeleriyle sürekli güncellenen ayarlar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Farklı oyun tarzlarına göre ayarlanabilir makro seçenekleri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span>Kullanımı kolay ve minimum tespit riski</span>
                  </li>
                </ul>

                <div className="text-sm text-gray-400 mt-8 p-4 border border-macrosnip-gray rounded-lg bg-macrosnip-darker">
                  <p>
                    <strong>Not:</strong> MacroSnip tarafından sağlanan makrolar yalnızca eğitim ve kişisel gelişim amacıyla
                    kullanılmalıdır. Rekabetçi ortamlarda kullanımından doğabilecek sonuçlardan kullanıcı sorumludur.
                    Kullanım öncesi her oyunun kendi kurallarını ve hizmet şartlarını incelemenizi öneririz.
                  </p>
                </div>
              </div>
            </div>

            {/* Yan Panel */}
            <div className="lg:col-span-1 space-y-8">
              {/* Popüler Ürünler */}
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                <h2 className="text-xl font-bold mb-4">Popüler CS:GO Makroları</h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-macrosnip-darker p-4 rounded-lg">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-cyan-500">
                          {(product.discountedPrice || product.price).toFixed(2)}₺
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/${locale}/macros/${product.slug}`}>
                            Detaylar
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/${locale}/macros?game=CS:GO`}>
                      Tüm CS:GO Makrolarını Gör
                    </Link>
                  </Button>
                </div>
              </div>

              {/* İpuçları */}
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                <h2 className="text-xl font-bold mb-4">CS:GO İpuçları</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium mb-1">Spray Kontrolü</h3>
                    <p className="text-gray-400">
                      İlk 5-7 mermi için imlecinizi aşağı çekmeye odaklanın, ardından spray paternine göre hafifçe sağa veya sola ayarlayın.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Ekonomi Yönetimi</h3>
                    <p className="text-gray-400">
                      Her round başında takım ekonomisini kontrol edin ve gerekirse eco round yapın. Full buy için en az 4000$ gerekir.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pozisyon Alma</h3>
                    <p className="text-gray-400">
                      Her zaman geri çekilebileceğiniz veya cover bulabileceğiniz pozisyonları tercih edin. Açık alanlarda durmaktan kaçının.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
