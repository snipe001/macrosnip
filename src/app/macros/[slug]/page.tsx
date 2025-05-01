"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Download,
  Star,
  ChevronRight,
  Share2,
  Heart,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { getProductBySlug, type Product } from "@/app/data/products";
import { useTranslations } from "@/hooks/use-translations";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { t, locale } = useTranslations();

  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'requirements'>('description');

  // Ürün verilerini yükle
  useEffect(() => {
    setIsLoading(true);
    const fetchedProduct = getProductBySlug(slug);

    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setIsLoading(false);
    } else {
      // Ürün bulunamadıysa 404 sayfasına yönlendir
      router.push(`/${locale}/not-found`);
    }
  }, [slug, router, locale]);

  // Sepete ekle
  const handleAddToCart = () => {
    // Burada normalde bir API isteği yapılacak
    setAddedToCart(true);

    // 2 saniye sonra bildirimi kaldır
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // Satın al
  const handleBuyNow = () => {
    // Sepete ekle ve ödeme sayfasına yönlendir
    router.push(`/${locale}/cart`);
  };

  if (isLoading || !product) {
    return (
      <main className="min-h-screen">
        <AnimatedBackground />
        <Header />
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-12 w-12 border-4 border-macrosnip-red border-t-transparent rounded-full"></div>
            <span className="mt-4 text-xl">{t('common.loading', 'Yükleniyor...')}</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white">
              {t('nav.home')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/${locale}/macros`} className="hover:text-white">
              {t('nav.macros')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/${locale}/macros?game=${product.game}`} className="hover:text-white">
              {product.game}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">{product.name}</span>
          </div>

          {/* Ürün Detayları */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ürün Görseli */}
            <div className="bg-macrosnip-dark border border-macrosnip-gray rounded-lg p-6 valorant-angle overflow-hidden">
              <div className="aspect-video w-full h-auto rounded-md overflow-hidden bg-macrosnip-darker relative">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {product.videoPreview && (
                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" className="bg-macrosnip-darker/80 backdrop-blur-md border-macrosnip-gray">
                      <Download className="mr-2 h-4 w-4" />
                      {t('macros.product.viewDemo', 'Demo İzle')}
                    </Button>
                  </div>
                )}

                {/* Discount Badge */}
                {product.discountedPrice && (
                  <div className="absolute top-4 left-4 bg-macrosnip-red px-3 py-1 rounded-md text-sm font-bold">
                    {Math.round((1 - product.discountedPrice / product.price) * 100)}% {t('macros.product.discount')}
                  </div>
                )}
              </div>

              {/* Mini Gallery */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                <div className="rounded-md overflow-hidden border-2 border-macrosnip-red">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden bg-macrosnip-darker">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="rounded-md overflow-hidden bg-macrosnip-darker">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="rounded-md overflow-hidden bg-macrosnip-darker">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-50" />
                </div>
              </div>
            </div>

            {/* Ürün Bilgileri */}
            <div>
              <div className="bg-macrosnip-dark border border-macrosnip-gray rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <span className="bg-macrosnip-gray px-3 py-1 rounded-md text-sm">
                      {product.game}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-5 w-5 text-gray-400" />
                    <span className="ml-1">{product.downloads.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-macrosnip-darker px-3 py-1 rounded-md text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center mb-6">
                  {product.discountedPrice ? (
                    <>
                      <span className="text-3xl font-bold red-gradient-text mr-4">
                        {product.discountedPrice.toFixed(2)}₺
                      </span>
                      <span className="text-xl line-through text-gray-500">
                        {product.price.toFixed(2)}₺
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold red-gradient-text">
                      {product.price.toFixed(2)}₺
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                  <Button
                    className="valorant-button valorant-angle red-gradient"
                    onClick={handleBuyNow}
                  >
                    {t('macros.product.buyNow')}
                  </Button>
                  <Button
                    variant="secondary"
                    className="valorant-button valorant-angle-reverse border-macrosnip-red"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t('macros.product.addToCart')}
                  </Button>
                  <Button variant="ghost" className="sm:ml-auto">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Sepete eklendi bildirimi */}
                {addedToCart && (
                  <div className="flex items-center p-3 rounded-md bg-green-900/20 text-green-400 mb-6">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{t('cart.addedToCart', 'Ürün sepete eklendi')}</span>
                  </div>
                )}

                {/* Ürün Detay Sekmeleri */}
                <div className="border-t border-macrosnip-gray pt-6">
                  <div className="flex space-x-4 border-b border-macrosnip-gray">
                    <button
                      className={cn(
                        "pb-2 px-2 text-sm font-medium",
                        activeTab === "description"
                          ? "text-white border-b-2 border-macrosnip-red"
                          : "text-gray-400 hover:text-white"
                      )}
                      onClick={() => setActiveTab("description")}
                    >
                      {t('product.description', 'Açıklama')}
                    </button>
                    <button
                      className={cn(
                        "pb-2 px-2 text-sm font-medium",
                        activeTab === "features"
                          ? "text-white border-b-2 border-macrosnip-red"
                          : "text-gray-400 hover:text-white"
                      )}
                      onClick={() => setActiveTab("features")}
                    >
                      {t('product.features', 'Özellikler')}
                    </button>
                    <button
                      className={cn(
                        "pb-2 px-2 text-sm font-medium",
                        activeTab === "requirements"
                          ? "text-white border-b-2 border-macrosnip-red"
                          : "text-gray-400 hover:text-white"
                      )}
                      onClick={() => setActiveTab("requirements")}
                    >
                      {t('product.requirements', 'Gereksinimler')}
                    </button>
                  </div>

                  <div className="py-4">
                    {activeTab === "description" && (
                      <div className="text-gray-300">
                        <p>{product.description}</p>
                      </div>
                    )}

                    {activeTab === "features" && (
                      <ul className="text-gray-300 space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === "requirements" && (
                      <div className="text-gray-300">
                        <h3 className="font-medium mb-2">Minimum Sistem Gereksinimleri</h3>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Windows 10 veya 11 (64-bit)</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>4 GB RAM</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>100MB boş disk alanı</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Desteklenen oyun yüklü olmalıdır</span>
                          </li>
                        </ul>

                        <div className="flex items-center mt-4 p-3 rounded-md bg-amber-900/20 text-amber-400">
                          <AlertTriangle className="h-5 w-5 mr-2 shrink-0" />
                          <span>
                            MacroSnip uygulamasını kullanabilmek için Yönetici haklarına sahip olmanız gerekir.
                          </span>
                        </div>
                      </div>
                    )}
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
