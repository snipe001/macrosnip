"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Download } from "lucide-react";

export default function PaymentSuccessPage() {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl mx-auto bg-macrosnip-dark bg-opacity-80 backdrop-blur-lg p-8 rounded-lg border border-macrosnip-gray valorant-angle-reverse overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-macrosnip-darker border-2 border-green-500 flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Satın alma işleminiz başarıyla tamamlandı. Ürün detayları ve hesap bilgileriniz e-posta adresinize gönderildi.
            </p>

            <div className="bg-macrosnip-darker rounded-lg p-6 w-full max-w-md mb-8">
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-green-400" />
                E-posta Bilgilerinizi Kontrol Edin
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                E-posta adresinize aşağıdaki bilgileri içeren bir mesaj gönderdik:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                  <span>Hesap oluşturma bağlantısı ve giriş bilgileri</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                  <span>Satın alınan makro yazılımı için indirme bağlantıları</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                  <span>Kurulum talimatları ve teknik destek bilgileri</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                  <span>Fatura ve ödeme detayları</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90" asChild>
                <Link href={`/${locale}/account`}>
                  <Download className="mr-2 h-5 w-5" />
                  Makrolarıma Git
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`/${locale}`}>
                  Ana Sayfaya Dön
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
