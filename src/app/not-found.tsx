"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";

export default function NotFound() {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
          <div className="relative w-64 h-64 mb-6">
            <div className="absolute inset-0 bg-macrosnip-red/10 animate-ping rounded-full"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-macrosnip-darker border-4 border-macrosnip-red rounded-full">
              <span className="text-9xl font-bold text-macrosnip-red">404</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 red-gradient-text">Sayfa Bulunamadı</h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
          </p>

          <div className="flex gap-4">
            <Button asChild>
              <Link href={`/${locale}`}>
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${locale}/macros`}>
                Makroları Keşfet
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
