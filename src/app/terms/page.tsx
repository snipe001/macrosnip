"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export default function TermsPage() {
  const params = useParams();
  const { t, locale } = useTranslations();

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white">
              {t('nav.home', 'Ana Sayfa')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">{t('footer.termsOfService', 'Kullanım Şartları')}</span>
          </div>

          <div className="max-w-4xl mx-auto bg-macrosnip-dark border border-macrosnip-gray rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-8">{t('footer.termsOfService', 'Kullanım Şartları')}</h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                Son güncelleme: 01.05.2025
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">1. Kabul Edilen Şartlar</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip web sitesini ve hizmetlerini kullanarak, bu Kullanım Şartları'nı kabul etmiş olursunuz. Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayın. MacroSnip, bu şartları herhangi bir zamanda değiştirme hakkını saklı tutar ve değişiklikler web sitesinde yayınlandığı anda geçerli olur.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">2. Hizmet Kullanımı</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip hizmetlerini kullanmak için 18 yaşında veya daha büyük olmanız gerekmektedir. Hesap oluşturduğunuzda, doğru ve eksiksiz bilgi sağlamakla yükümlüsünüz. Hesabınızın güvenliğinden ve hesabınız altında gerçekleşen tüm etkinliklerden siz sorumlusunuz.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Ürünler ve Hizmetler</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip, oyun performansını artırmak için tasarlanmış makro yazılımları sağlar. Bu ürünler, belirli oyunlarda belirli işlevleri otomatikleştirmek veya optimize etmek için tasarlanmıştır.
              </p>
              <p className="text-gray-300 mb-4">
                Satın alınan ürünler, ödeme onayından sonra dijital olarak teslim edilir. Satın alım sırasında verdiğiniz e-posta adresine indirme bağlantıları ve aktivasyon bilgileri gönderilir.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">4. Kullanım Kısıtlamaları</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip ürünlerini satın alarak, şunları yapmamayı kabul edersiniz:
              </p>
              <ul className="text-gray-300 mb-4 list-disc pl-6 space-y-2">
                <li>Ürünleri tersine mühendislik, kaynak kodunu çıkarma veya değiştirme</li>
                <li>Ürünleri başkalarına satma, kiralama veya lisanslama</li>
                <li>Ürünleri, oyun geliştiricilerinin hizmet şartlarını ihlal edecek şekilde kullanma</li>
                <li>Ürünleri, makul olmayan veya orantısız bir şekilde sunucu yükü oluşturacak şekilde kullanma</li>
                <li>MacroSnip'in yazılı izni olmadan ürünleri ticari amaçlarla kullanma</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Sorumluluk Reddi</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip ürünleri "olduğu gibi" ve "mevcut olduğu şekilde" sağlanır, herhangi bir garanti olmaksızın. MacroSnip, ürünlerinin kesintisiz veya hatasız çalışacağını garanti etmez.
              </p>
              <p className="text-gray-300 mb-4">
                MacroSnip, ürünlerinin kullanımından kaynaklanan herhangi bir dolaylı, tesadüfi, özel veya sonuç olarak ortaya çıkan zararlardan sorumlu değildir. Bu, hesap kaybı, oyun içi cezalar veya yasaklamalar dahil ancak bunlarla sınırlı olmamak üzere herhangi bir zararı içerir.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">6. İade Politikası</h2>
              <p className="text-gray-300 mb-4">
                İade politikamızla ilgili detaylı bilgi için lütfen <Link href={`/${locale}/refund`} className="text-macrosnip-red hover:underline">İade Politikası</Link> sayfamızı ziyaret edin.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Fikri Mülkiyet</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip web sitesindeki ve ürünlerindeki tüm içerik, MacroSnip'in mülkiyetindedir ve telif hakkı, ticari marka ve diğer fikri mülkiyet yasaları ile korunmaktadır. MacroSnip'in açık yazılı izni olmadan içeriği çoğaltmak, dağıtmak veya kullanmak yasaktır.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Hesap Sonlandırma</h2>
              <p className="text-gray-300 mb-4">
                MacroSnip, kendi takdirine bağlı olarak, herhangi bir sebeple ve herhangi bir zamanda kullanıcı hesaplarını sonlandırma veya askıya alma hakkını saklı tutar. Hesap sonlandırma durumunda, kullanıcıya bildirim yapılacak ve erişimi olan tüm ürünler devre dışı bırakılacaktır.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">9. İletişim</h2>
              <p className="text-gray-300 mb-4">
                Bu Kullanım Şartları ile ilgili herhangi bir sorunuz varsa, lütfen <span className="text-macrosnip-red">support@macrosnip.com</span> adresinden bizimle iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
