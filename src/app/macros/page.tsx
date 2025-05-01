"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Filter,
  Gamepad2,
  ShoppingCart,
  SlidersHorizontal,
  X,
  ChevronDown
} from "lucide-react";
import { products as allProducts } from "../data/products";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Fallback bileşeni
function MacrosPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-macrosnip-red border-t-transparent rounded-full mb-4 mx-auto"></div>
        <p className="text-lg">Yükleniyor...</p>
      </div>
    </div>
  );
}

// Ana bileşen
function MacrosPageContent() {
  const searchParams = useSearchParams();
  const gameParam = searchParams.get("game");

  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedGame, setSelectedGame] = useState<string | null>(gameParam);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Tüm oyunları ve etiketleri topla
  const allGames = Array.from(new Set(allProducts.map(p => p.game)));
  const allTags = Array.from(new Set(allProducts.flatMap(p => p.tags)));

  // Filtre ve sıralama işlemi
  useEffect(() => {
    let result = [...allProducts];

    // Oyun filtresi
    if (selectedGame) {
      result = result.filter(product => product.game === selectedGame);
    }

    // Etiket filtresi
    if (selectedTags.length > 0) {
      result = result.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    // Fiyat aralığı filtresi
    result = result.filter(product => {
      const priceToCheck = product.discountedPrice || product.price;
      return priceToCheck >= priceRange[0] && priceToCheck <= priceRange[1];
    });

    // Arama filtresi
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Sıralama
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popularity") {
      result.sort((a, b) => b.downloads - a.downloads);
    }

    setFilteredProducts(result);
  }, [selectedGame, selectedTags, priceRange, searchTerm, sortBy]);

  // URL'den oyun parametresi değişirse state'i güncelle
  useEffect(() => {
    if (gameParam) {
      setSelectedGame(gameParam);
    }
  }, [gameParam]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Arkaplan videosu için oyuna göre dinamik video seçimi
  const getBackgroundVideo = () => {
    if (selectedGame === "Valorant") {
      return "/videos/jett-valorant.mp4";
    }
    return "/videos/neon-valorant.mp4";
  };

  return (
    <main className="min-h-screen">
      <AnimatedBackground
        videoBackground={getBackgroundVideo()}
        overlayClassName="bg-gradient-to-b from-macrosnip-darker/70 via-macrosnip-darker/80 to-macrosnip-darker"
      />
      <Header />

      {/* Hero bölümü */}
      <section className="pt-28 pb-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="block text-white">Oyun Performansını</span>
              <span className="block red-gradient-text text-glow">Yükselten Makrolar</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Profesyonel oyuncular tarafından tasarlanmış, rekabetçi avantaj sağlayan
              özel makro koleksiyonumuzu keşfedin.
            </p>

            {/* Arama kutusu */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Makro ara..."
                className="bg-macrosnip-dark border-macrosnip-gray pl-10 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-3"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filtre ve ürün listesi */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobil filtre toggle */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtreler
                <ChevronDown className={cn("h-4 w-4 transition-transform", isFilterOpen && "rotate-180")} />
              </Button>

              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{filteredProducts.length} ürün</span>
              </div>
            </div>

            {/* Filtre sidebat - mobil için açılır kapanır */}
            <div className={cn(
              "lg:w-64 space-y-6 bg-macrosnip-dark lg:bg-transparent p-4 lg:p-0 rounded-lg border border-macrosnip-gray lg:border-0",
              "lg:block transition-all duration-300",
              isFilterOpen ? "block" : "hidden"
            )}>
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Gamepad2 className="mr-2 h-5 w-5 text-macrosnip-red" />
                  Oyunlar
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded",
                      !selectedGame ? "bg-macrosnip-gray text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    Tüm Oyunlar
                  </button>
                  {allGames.map(game => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded",
                        selectedGame === game ? "bg-macrosnip-gray text-white" : "text-gray-400 hover:text-white"
                      )}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <SlidersHorizontal className="mr-2 h-5 w-5 text-macrosnip-red" />
                  Fiyat Aralığı
                </h3>
                <div className="px-3 py-4">
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as number[])}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>{priceRange[0]}₺</span>
                    <span>{priceRange[1]}₺</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Filter className="mr-2 h-5 w-5 text-macrosnip-red" />
                  Etiketler
                </h3>
                <div className="flex flex-wrap gap-2 px-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1 text-sm rounded border",
                        selectedTags.includes(tag)
                          ? "bg-macrosnip-red text-white border-macrosnip-red"
                          : "bg-transparent border-macrosnip-gray text-gray-300 hover:border-macrosnip-red"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobil için filtre kapatma butonu */}
              <div className="lg:hidden pt-4 border-t border-macrosnip-gray">
                <Button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full"
                >
                  Filtreleri Uygula
                </Button>
              </div>
            </div>

            {/* Ürün listesi */}
            <div className="flex-1">
              {/* Toplam ürün sayısı ve sıralama */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-macrosnip-dark p-4 rounded-lg border border-macrosnip-gray">
                <div className="hidden lg:block">
                  <span className="text-gray-300">
                    <strong>{filteredProducts.length}</strong> ürün bulundu
                  </span>
                </div>

                <div className="flex items-center w-full sm:w-auto">
                  <span className="text-gray-300 mr-3 whitespace-nowrap">Sıralama:</span>
                  <select
                    className="bg-macrosnip-darker border border-macrosnip-gray rounded p-2 pr-8 text-white flex-grow sm:flex-grow-0"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Önerilen</option>
                    <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                    <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                    <option value="rating">Değerlendirme</option>
                    <option value="popularity">Popülerlik</option>
                  </select>
                </div>
              </div>

              {/* Ürün kartları */}
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key="product-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        game={product.game}
                        description={product.description}
                        price={product.price}
                        discountedPrice={product.discountedPrice}
                        image={product.image}
                        videoPreview={product.videoPreview}
                        rating={product.rating}
                        downloads={product.downloads}
                        isPopular={product.isPopular}
                        isNew={product.isNew}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="h-24 w-24 rounded-full bg-macrosnip-dark flex items-center justify-center mb-6 border border-macrosnip-gray">
                      <Search className="h-12 w-12 text-macrosnip-light-gray" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Sonuç bulunamadı</h3>
                    <p className="text-gray-400 max-w-md">
                      Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı anahtar kelimeler deneyin veya filtreleri sıfırlayın.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedGame(null);
                        setSelectedTags([]);
                        setPriceRange([0, 200]);
                      }}
                    >
                      Filtreleri Sıfırla
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function MacrosPage() {
  return (
    <Suspense fallback={<MacrosPageLoading />}>
      <MacrosPageContent />
    </Suspense>
  );
}
