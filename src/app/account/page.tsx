"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Package,
  Settings,
  CreditCard,
  Download,
  ChevronRight,
  LogOut
} from "lucide-react";
import { products, type Product } from "@/app/data/products";

// Kullanıcının satın aldığı makro örneği
interface PurchasedMacro {
  id: string;
  purchaseDate: string;
  expiresAt?: string;
  product: Product | null;
  downloadLink: string;
  version: string;
  status: 'active' | 'expired' | 'pending';
}

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "tr";

  const [activeTab, setActiveTab] = useState<string>("macros");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState({
    name: "Kullanıcı",
    email: "kullanici@ornek.com",
    joinDate: "Mart 2023"
  });

  // Demo satın alınan makrolar
  const [purchasedMacros, setPurchasedMacros] = useState<PurchasedMacro[]>([
    {
      id: "purchase-001",
      purchaseDate: "2023-09-15",
      product: products.find(p => p.id === "macro-val-1"),
      downloadLink: "#",
      version: "1.2.5",
      status: "active"
    },
    {
      id: "purchase-002",
      purchaseDate: "2023-11-02",
      product: products.find(p => p.id === "macro-csgo-1"),
      downloadLink: "#",
      version: "2.0.1",
      status: "active"
    }
  ]);

  // Satınalma geçmişi (demo)
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      id: "order-001",
      date: "2023-09-15",
      products: ["Valorant Pro Spray Control"],
      total: 129.99,
      status: "Tamamlandı"
    },
    {
      id: "order-002",
      date: "2023-11-02",
      products: ["CS:GO Recoil Master Pro"],
      total: 139.99,
      status: "Tamamlandı"
    }
  ]);

  // Giriş durumunu kontrol et
  useEffect(() => {
    // Simüle edilmiş giriş durumu kontrolü
    // Gerçek uygulamamda bir API'ye istek yapacak
    const checkLoginStatus = async () => {
      // Giriş yapıldığını varsayalım
      setIsLoggedIn(true);
    };

    checkLoginStatus();
  }, []);

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  useEffect(() => {
    if (!isLoggedIn) {
      // Gerçek uygulamada burada yönlendirme yapılır
      //router.push(`/${locale}/login`);
    }
  }, [isLoggedIn, locale, router]);

  // Çıkış yap
  const handleLogout = () => {
    // Çıkış işlemi gerçekleştir
    setIsLoggedIn(false);
    router.push(`/${locale}/login`);
  };

  // İndirme işlemi
  const handleDownload = (macro: PurchasedMacro) => {
    alert(`${macro.product?.name} indirme bağlantısı açıldı.`);
  };

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-white">Hesabım</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sol Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                {/* Kullanıcı Bilgisi */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-macrosnip-gray flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="font-bold text-xl">{userProfile.name}</h3>
                  <p className="text-gray-400 text-sm">{userProfile.email}</p>
                  <p className="text-gray-500 text-xs mt-1">Üyelik: {userProfile.joinDate}</p>
                </div>

                {/* Menü */}
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === "macros" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("macros")}
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Makrolarım
                  </Button>
                  <Button
                    variant={activeTab === "purchases" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("purchases")}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Satın Alma Geçmişi
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Hesap Ayarları
                  </Button>
                </nav>

                <div className="mt-8 pt-6 border-t border-macrosnip-gray">
                  <Button
                    variant="outline"
                    className="w-full text-red-500 border-red-500/20 hover:bg-red-500/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Çıkış Yap
                  </Button>
                </div>
              </div>
            </div>

            {/* Ana İçerik */}
            <div className="md:col-span-3">
              {activeTab === "macros" && (
                <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                  <h2 className="text-2xl font-bold mb-6">Makrolarım</h2>

                  {purchasedMacros.length > 0 ? (
                    <div className="space-y-6">
                      {purchasedMacros.map((macro) => (
                        <div key={macro.id} className="bg-macrosnip-darker p-4 rounded-lg">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Ürün resmi */}
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-black flex-shrink-0">
                              {macro.product?.image && (
                                <img
                                  src={macro.product.image}
                                  alt={macro.product.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Ürün bilgileri */}
                            <div className="flex-grow">
                              <h3 className="font-bold text-lg">{macro.product?.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="bg-macrosnip-gray px-2 py-0.5 text-xs rounded-full">
                                  {macro.product?.game}
                                </span>
                                <span className="bg-green-900/50 text-green-400 px-2 py-0.5 text-xs rounded-full">
                                  Aktif
                                </span>
                                <span className="bg-macrosnip-gray px-2 py-0.5 text-xs rounded-full">
                                  Versiyon: {macro.version}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm mt-2">
                                Satın alma: {new Date(macro.purchaseDate).toLocaleDateString("tr-TR")}
                              </p>
                            </div>

                            {/* İşlemler */}
                            <div>
                              <Button
                                className="valorant-button valorant-angle bg-gradient-to-r from-blue-600 to-cyan-600"
                                onClick={() => handleDownload(macro)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                İndir
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="text-center mt-8">
                        <Button asChild>
                          <Link href={`/${locale}/macros`}>
                            Daha Fazla Makro Keşfet
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Henüz makronuz yok</h3>
                      <p className="text-gray-400 mb-6">
                        Satın aldığınız makrolar burada görüntülenecektir.
                      </p>
                      <Button asChild>
                        <Link href={`/${locale}/macros`}>
                          Makroları Keşfedin
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "purchases" && (
                <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                  <h2 className="text-2xl font-bold mb-6">Satın Alma Geçmişi</h2>

                  {purchaseHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="text-left py-3 px-4 border-b border-macrosnip-gray">Sipariş No</th>
                            <th className="text-left py-3 px-4 border-b border-macrosnip-gray">Tarih</th>
                            <th className="text-left py-3 px-4 border-b border-macrosnip-gray">Ürünler</th>
                            <th className="text-left py-3 px-4 border-b border-macrosnip-gray">Toplam</th>
                            <th className="text-left py-3 px-4 border-b border-macrosnip-gray">Durum</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchaseHistory.map((order) => (
                            <tr key={order.id} className="hover:bg-macrosnip-darker">
                              <td className="py-3 px-4 border-b border-macrosnip-gray">{order.id}</td>
                              <td className="py-3 px-4 border-b border-macrosnip-gray">{order.date}</td>
                              <td className="py-3 px-4 border-b border-macrosnip-gray">
                                {order.products.join(", ")}
                              </td>
                              <td className="py-3 px-4 border-b border-macrosnip-gray font-medium">
                                {order.total.toFixed(2)}₺
                              </td>
                              <td className="py-3 px-4 border-b border-macrosnip-gray">
                                <span className="bg-green-900/50 text-green-400 px-2 py-0.5 text-xs rounded-full">
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Satın alma geçmişi yok</h3>
                      <p className="text-gray-400 mb-6">
                        Yaptığınız satın almalar burada listelenecektir.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                  <h2 className="text-2xl font-bold mb-6">Hesap Ayarları</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profil Bilgileri</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1">Adınız</label>
                          <Input
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                            className="bg-macrosnip-darker border-macrosnip-gray"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">E-posta Adresi</label>
                          <Input
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            disabled
                          />
                          <p className="text-xs text-gray-500 mt-1">E-posta adresiniz değiştirilemez</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-macrosnip-gray">
                      <h3 className="text-lg font-medium mb-4">Şifre Değiştir</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1">Mevcut Şifre</label>
                          <Input
                            type="password"
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Yeni Şifre</label>
                          <Input
                            type="password"
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-macrosnip-gray">
                      <h3 className="text-lg font-medium mb-4">Bildirim Ayarları</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="emailNotifications"
                            className="h-4 w-4 accent-macrosnip-red bg-macrosnip-darker border-macrosnip-gray rounded"
                            defaultChecked
                          />
                          <label htmlFor="emailNotifications" className="ml-2 text-sm">
                            E-posta bildirimleri
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="updateNotifications"
                            className="h-4 w-4 accent-macrosnip-red bg-macrosnip-darker border-macrosnip-gray rounded"
                            defaultChecked
                          />
                          <label htmlFor="updateNotifications" className="ml-2 text-sm">
                            Makro güncellemeleri hakkında bildirimler
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="promotionNotifications"
                            className="h-4 w-4 accent-macrosnip-red bg-macrosnip-darker border-macrosnip-gray rounded"
                            defaultChecked
                          />
                          <label htmlFor="promotionNotifications" className="ml-2 text-sm">
                            Kampanya ve indirimler hakkında bildirimler
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>
                        Değişiklikleri Kaydet
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
