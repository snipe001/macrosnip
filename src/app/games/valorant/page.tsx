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

export default function ValorantPage() {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  // Valorant ile ilgili makrolar
  const products = getProductsByGame("Valorant");

  return (
    <main className="min-h-screen">
      <AnimatedBackground
        videoBackground="/videos/jett-valorant.mp4"
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
            <span className="text-white">Valorant</span>
          </div>

          {/* Valorant Hero */}
          <div className="relative mb-16 overflow-hidden rounded-lg valorant-angle border border-macrosnip-gray">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-macrosnip-darker/20 z-10"></div>
            <img
              src="https://same-assets.com/images/a3d2d9b4-e835-4dba-ba8d-8b8e8e4fc2d7"
              alt="Valorant"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="block">Valorant</span>
                <span className="red-gradient-text text-glow">Makroları</span>
              </h1>
              <p className="text-gray-200 max-w-xl mb-6">
                Valorant için özel olarak tasarlanmış, rekabetçi avantaj sağlayan profesyonel makrolar ile
                rakiplerinize fark atın. Eşsiz sprey kontrolü, nişan alma desteği ve karakter yeteneği optimizasyonları.
              </p>
              <Button asChild className="valorant-button valorant-angle red-gradient w-auto md:w-48">
                <Link href={`/${locale}/macros?game=Valorant`}>
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
                <h2 className="text-2xl font-bold mb-4">Valorant Makroları</h2>
                <p className="text-gray-300 mb-4">
                  Valorant, Riot Games tarafından geliştirilen 5v5 karakter tabanlı taktiksel nişancı oyunudur.
                  Hassas hedef alma ve silah kontrolü gerektiren bu oyunda, MacroSnip özelleştirilmiş makrolarımız
                  ile rekabetçi avantaj elde edin.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Sprey Kontrolü</h3>
                    <p className="text-gray-400 text-sm">
                      Phantom ve Vandal gibi popüler silahların tepme paternlerini otomatik olarak kontrol eden gelişmiş
                      algoritmalarımız sayesinde isabet oranınızı artırın.
                    </p>
                  </div>
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Ajan Yetenekleri</h3>
                    <p className="text-gray-400 text-sm">
                      Jett, Reyna, Chamber gibi ajanların yeteneklerini maksimum verimle kullanmanızı sağlayan
                      makrolar ile rakiplerinizi şaşırtın.
                    </p>
                  </div>
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Hareket Optimizasyonu</h3>
                    <p className="text-gray-400 text-sm">
                      Counter-strafe, jiggle peek ve diğer gelişmiş hareket tekniklerini mükemmelleştiren özel
                      makrolar ile düşmanlarınızı şaşırtın.
                    </p>
                  </div>
                  <div className="bg-macrosnip-darker rounded-lg p-4">
                    <h3 className="font-bold mb-2">Anti-Recoil</h3>
                    <p className="text-gray-400 text-sm">
                      Silah tepme paternlerini karşılayan otomatik ayarlamalar ile uzun mesafe çatışmalarda bile
                      doğruluk sağlayın.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Neden MacroSnip'in Valorant Makroları?</h3>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-macrosnip-red mt-2 mr-2"></span>
                    <span>Profesyonel oyuncular tarafından test edilmiş ve onaylanmış</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-macrosnip-red mt-2 mr-2"></span>
                    <span>Yüksek hassasiyete sahip recoil kontrol algoritmaları</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-macrosnip-red mt-2 mr-2"></span>
                    <span>Sürekli güncellenen ve oyun güncellemeleriyle uyumlu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-macrosnip-red mt-2 mr-2"></span>
                    <span>Tüm ekran çözünürlükleri ve fare DPI ayarlarıyla uyumlu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-macrosnip-red mt-2 mr-2"></span>
                    <span>Güvenli kullanım için optimize edilmiş, tespit edilme riski düşük</span>
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
                <h2 className="text-xl font-bold mb-4">Popüler Valorant Makroları</h2>
                <div className="space-y-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="bg-macrosnip-darker p-4 rounded-lg">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold red-gradient-text">
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
                    <Link href={`/${locale}/macros?game=Valorant`}>
                      Tüm Valorant Makrolarını Gör
                    </Link>
                  </Button>
                </div>
              </div>

              {/* İpuçları */}
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                <h2 className="text-xl font-bold mb-4">Valorant İpuçları</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium mb-1">Crosshair Yerleştirme</h3>
                    <p className="text-gray-400">
                      Her zaman baş seviyesinde nişan almayı alışkanlık haline getirin. Rakiplerin çıkabileceği köşelere önceden nişan alın.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Ekonomi Yönetimi</h3>
                    <p className="text-gray-400">
                      Her roundda takım ekonomisini göz önünde bulundurun. Gerektiğinde save roundları yapın.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Ajan Seçimi</h3>
                    <p className="text-gray-400">
                      Haritaya ve takım kompozisyonuna uygun ajanları seçmeye çalışın. Her haritada bazı ajanlar daha avantajlıdır.
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
