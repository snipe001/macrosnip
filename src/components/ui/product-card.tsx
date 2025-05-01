"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, BarChart2, Play, Pause, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  game: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  videoPreview?: string;
  rating: number;
  downloads: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export function ProductCard({
  id,
  name,
  game,
  description,
  price,
  discountedPrice,
  image,
  videoPreview,
  rating,
  downloads,
  isPopular,
  isNew
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fiyat indirimi varsa yüzde hesapla
  const discountPercentage = discountedPrice
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  return (
    <motion.div
      className={cn(
        "flex flex-col h-full bg-macrosnip-dark overflow-hidden valorant-angle group relative",
        "border border-macrosnip-gray hover:border-macrosnip-red transition-colors"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPlaying(false);
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Popüler/Yeni etiketleri */}
      {isPopular && (
        <div className="absolute top-3 right-3 z-10 bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded">
          POPÜLER
        </div>
      )}

      {isNew && (
        <div className="absolute top-3 right-3 z-10 bg-green-500 text-black px-2 py-1 text-xs font-bold rounded">
          YENİ
        </div>
      )}

      {/* İndirim etiketi */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-macrosnip-red text-white px-2 py-1 text-xs font-bold rounded">
          %{discountPercentage} İNDİRİM
        </div>
      )}

      {/* Video/Resim alanı */}
      <div className="relative aspect-video overflow-hidden">
        {videoPreview ? (
          <>
            {/* Video veya resim göster */}
            {isPlaying ? (
              <video
                src={videoPreview}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={image}
                alt={name}
                width={400}
                height={225}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            )}

            {/* Oynat/durdur butonu */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity",
                isPlaying && "opacity-0 group-hover:opacity-60"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-macrosnip-red bg-opacity-90 text-white hover:bg-opacity-100 hover:scale-110 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>
          </>
        ) : (
          <Image
            src={image}
            alt={name}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        )}

        {/* Oyun etiketi */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 px-2 py-1 text-xs font-medium text-white rounded">
          {game}
        </div>
      </div>

      {/* İçerik alanı */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
          <div className="flex items-center space-x-1 text-yellow-400 text-sm">
            <span>★</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-2 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-4 w-4 text-macrosnip-light-gray" />
            <span className="text-macrosnip-light-gray text-sm">{downloads}+ indirme</span>
          </div>

          <div className="flex items-center">
            {discountedPrice ? (
              <>
                <span className="text-macrosnip-light-gray line-through text-sm mr-2">
                  {price.toFixed(2)}₺
                </span>
                <span className="font-bold text-lg red-gradient-text">
                  {discountedPrice.toFixed(2)}₺
                </span>
              </>
            ) : (
              <span className="font-bold text-lg">{price.toFixed(2)}₺</span>
            )}
          </div>
        </div>

        {/* Butonlar */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="valorant-button border-macrosnip-gray hover:border-macrosnip-red group-hover:border-macrosnip-red transition-all"
          >
            <Info className="mr-1 h-4 w-4" />
            Detaylar
          </Button>

          <Button
            size="sm"
            className="valorant-button valorant-angle red-gradient text-white"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Sepete Ekle
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
