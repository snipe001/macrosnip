"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// SSS kategorileri ve soruları
const faqCategories = [
  {
    id: "general",
    name: "Genel Sorular",
    items: [
      {
        question: "MacroSnip nedir?",
        answer: "MacroSnip, oyun performansınızı artırmak için tasarlanmış özel makro yazılımları sunan bir platformdur. Profesyonel oyuncular tarafından test edilmiş ve geliştirilmiş makrolarımız, çeşitli popüler oyunlarda rekabetçi avantaj sağlar."
      },
      {
        question: "Makro kullanmak yasak mı?",
        answer: "Makro kullanımı, oyunun kurallarına ve kullanım şartlarına bağlıdır. Bazı oyunlar makro kullanımına kısıtlamalar getirebilir. MacroSnip, makroların yalnızca eğitim ve kişisel gelişim amacıyla kullanılmasını önerir. Kullanımdan önce ilgili oyunun kullanım şartlarını kontrol etmenizi tavsiye ederiz."
      },
      {
        question: "MacroSnip makroları nasıl çalışır?",
        answer: "MacroSnip makroları, fare ve klavye hareketlerinizi otomatikleştiren özel yazılımlardır. Bu makrolar, silah tepme kontrolü, hızlı hareket kombinasyonları ve karakter yeteneklerinin optimizasyonu gibi çeşitli işlevler için tasarlanmıştır. Makrolar, oyun içinde daha tutarlı performans elde etmenize yardımcı olur."
      }
    ]
  },
  {
    id: "purchase",
    name: "Satın Alma ve Ödeme",
    items: [
      {
        question: "Makroları nasıl satın alabilirim?",
        answer: "Makroları satın almak için, sitemizde ilgili ürün sayfasına gidip 'Sepete Ekle' veya 'Satın Al' butonuna tıklayın. Ödeme aşamasında, kredi kartı veya diğer ödeme yöntemlerini kullanabilirsiniz. Ödeme işlemi tamamlandıktan sonra, makronuzu hemen indirebilir ve kullanmaya başlayabilirsiniz."
      },
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer: "Kredi kartı, banka havalesi ve kripto para ödeme yöntemlerini kabul ediyoruz. Tüm ödemeler güvenli bir şekilde işlenir ve bilgileriniz korunur."
      },
      {
        question: "İade politikanız nedir?",
        answer: "Satın aldığınız ürünleri, satın alma tarihinden itibaren 7 gün içinde iade edebilirsiniz. İade işlemi için müşteri hizmetlerimizle iletişime geçmeniz gerekmektedir. Ancak, kullanılmış veya aktive edilmiş makrolar için iade yapılamaz."
      }
    ]
  },
  {
    id: "technical",
    name: "Teknik Sorular",
    items: [
      {
        question: "Makroları nasıl kurarım?",
        answer: "Her makro paketi ile birlikte detaylı kurulum talimatları verilir. Genellikle, indirdiğiniz ZIP dosyasını açmanız ve içindeki kurulum dosyasını çalıştırmanız yeterlidir. Bazı makrolar, fare veya klavye yazılımınızla entegrasyon gerektirebilir. Kurulum sırasında sorun yaşarsanız, destek ekibimizle iletişime geçebilirsiniz."
      },
      {
        question: "MacroSnip makroları hangi oyunlarla uyumludur?",
        answer: "Şu anda Valorant, CS:GO, Fortnite ve Apex Legends gibi popüler FPS oyunları için makrolar sunuyoruz. Sürekli olarak desteklediğimiz oyun listesini genişletiyoruz."
      },
      {
        question: "Makrolar tespit edilebilir mi?",
        answer: "MacroSnip makroları, tespit riskini en aza indirecek şekilde tasarlanmıştır. Ancak, hiçbir makro %100 tespit edilemez değildir. Makrolarımız, doğal oyun hareketlerini taklit edecek şekilde optimize edilmiştir, ancak kullanım sorumluluğu size aittir."
      },
      {
        question: "Bilgisayarımın sistem gereksinimleri nelerdir?",
        answer: "MacroSnip makroları, çoğu modern Windows işletim sisteminde (Windows 10/11) sorunsuz çalışır. Özel gereksinimler, satın aldığınız makronun ayrıntılarında belirtilir."
      }
    ]
  },
  {
    id: "account",
    name: "Hesap ve Destek",
    items: [
      {
        question: "Hesabımı nasıl oluştururum?",
        answer: "İlk alışverişinizde, e-posta adresinize otomatik olarak hesap oluşturma bağlantısı gönderilir. Bu bağlantıyı kullanarak şifrenizi belirleyebilir ve hesabınızı aktive edebilirsiniz. Hesabınız, makrolarınızı yönetmenize ve güncellemeleri almanıza olanak tanır."
      },
      {
        question: "Şifremi unuttum, ne yapmalıyım?",
        answer: "Giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak şifre sıfırlama işlemini başlatabilirsiniz. E-posta adresinize bir sıfırlama bağlantısı gönderilecektir."
      },
      {
        question: "MacroSnip ile nasıl iletişime geçebilirim?",
        answer: "Destek ekibimizle iletişime geçmek için support@macrosnip.com adresine e-posta gönderebilir veya web sitemizdeki iletişim formunu kullanabilirsiniz. Ayrıca, Discord sunucumuz üzerinden topluluk desteği alabilirsiniz."
      }
    ]
  }
];

export default function FAQPage() {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(["general"]);
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  // Kategori aç/kapa
  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prevState =>
      prevState.includes(categoryId)
        ? prevState.filter(id => id !== categoryId)
        : [...prevState, categoryId]
    );
  };

  // Soru aç/kapa
  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prevState =>
      prevState.includes(questionId)
        ? prevState.filter(id => id !== questionId)
        : [...prevState, questionId]
    );
  };

  // Filtrelenmiş kategoriler
  const filteredCategories = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : faqCategories;

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">Sıkça Sorulan Sorular</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 red-gradient-text">Sıkça Sorulan Sorular</h1>
            <p className="text-gray-400 mb-8 max-w-3xl">
              MacroSnip hakkında merak ettiğiniz tüm soruların cevaplarını burada bulabilirsiniz.
              Aradığınız cevabı bulamazsanız, bizimle iletişime geçmekten çekinmeyin.
            </p>

            {/* Arama */}
            <div className="relative mb-12">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Sorunuzu arayın..."
                className="bg-macrosnip-dark border-macrosnip-gray pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* SSS içeriği */}
            <div className="space-y-6">
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <div key={category.id} className="bg-macrosnip-dark border border-macrosnip-gray rounded-lg overflow-hidden">
                    {/* Kategori başlığı */}
                    <button
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xl"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        openCategories.includes(category.id) ? "rotate-180" : ""
                      )} />
                    </button>

                    {/* Kategori içeriği */}
                    <div className={cn(
                      "transition-all overflow-hidden",
                      openCategories.includes(category.id) ? "max-h-[2000px]" : "max-h-0"
                    )}>
                      <div className="p-4 pt-0 space-y-4">
                        {category.items.map((item, idx) => {
                          const questionId = `${category.id}-${idx}`;
                          return (
                            <div key={questionId} className="border-b border-macrosnip-gray last:border-0 pb-4 last:pb-0">
                              <button
                                className="w-full flex items-center justify-between text-left font-medium text-white py-2"
                                onClick={() => toggleQuestion(questionId)}
                              >
                                <span>{item.question}</span>
                                <ChevronDown className={cn(
                                  "h-5 w-5 transition-transform text-gray-400",
                                  openQuestions.includes(questionId) ? "rotate-180" : ""
                                )} />
                              </button>

                              <div className={cn(
                                "overflow-hidden transition-all",
                                openQuestions.includes(questionId) ? "max-h-96" : "max-h-0"
                              )}>
                                <p className="text-gray-400 mt-2 leading-relaxed">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-macrosnip-dark border border-macrosnip-gray rounded-lg">
                  <p className="text-lg text-gray-400">
                    Aramanızla eşleşen soru bulunamadı. Lütfen farklı bir arama terimi deneyin veya
                    <Link href={`/${locale}/contact`} className="text-macrosnip-red ml-1">
                      bizimle iletişime geçin
                    </Link>.
                  </p>
                </div>
              )}
            </div>

            {/* Hala yanıt bulamadınız? */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Aradığınız cevabı bulamadınız mı?</h2>
              <p className="text-gray-400 mb-6">
                Ekibimiz her türlü sorunuzda size yardımcı olmak için hazır.
              </p>
              <Button asChild className="valorant-button valorant-angle red-gradient px-6">
                <Link href={`/${locale}/contact`}>
                  Bize Ulaşın
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
