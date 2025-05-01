"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  ChevronRight,
  Mail
} from "lucide-react";
import { PaymentForm } from "@/components/ui/payment-form";
import { type Product, getProductById } from "@/app/data/products";

// Sepet öğesi tipi
interface CartItem {
  id: string;
  quantity: number;
  product: Product | null;
}

// Demo sepetteki öğeler
const initialCartItems: CartItem[] = [
  { id: "macro-val-1", quantity: 1, product: null },
  { id: "macro-csgo-1", quantity: 1, product: null },
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAccountCreation, setIsAccountCreation] = useState(true);

  // Sepet öğelerini yükle
  useEffect(() => {
    // Ürün verilerini getir
    const itemsWithProducts = cartItems.map(item => {
      return {
        ...item,
        product: getProductById(item.id)
      }
    });

    setCartItems(itemsWithProducts.filter(item => item.product !== undefined) as CartItem[]);
  }, []);

  // Sepetten öğe kaldır
  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Öğe sayısını değiştir
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Sepet toplamını hesapla
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.discountedPrice || item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Ödeme adımına geç
  const proceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  // Ödeme işlemini tamamla ve hesap oluştur
  const handleCompletePayment = async () => {
    if (!userEmail || !userName) {
      alert("Lütfen e-posta adresinizi ve adınızı girin");
      return;
    }

    setLoading(true);

    try {
      // Ödeme simülasyonu ve hesap oluşturma süreci
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Başarılı ödeme sonrası - normalde API'ye gönderilir
      alert(`Ödeme başarılı!\n\nKullanıcı adınız: ${userName}\nE-posta adresiniz: ${userEmail}\n\nE-posta adresinize hesap bilgileriniz gönderildi.`);

      // Sepeti temizle ve ana sayfaya yönlendir
      router.push("/tr/payment-success");
    } catch (error) {
      alert("Ödeme işlemi sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Sepet boşsa gösterilecek içerik
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen">
        <AnimatedBackground />
        <Header />

        <div className="h-screen flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl mx-auto bg-macrosnip-dark bg-opacity-80 backdrop-blur-lg p-8 rounded-lg border border-macrosnip-gray">
            <div className="flex flex-col items-center justify-center text-center">
              <ShoppingCart className="h-24 w-24 text-gray-500 mb-4" />
              <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
              <p className="text-gray-400 mb-8">
                Sepetinizde henüz ürün bulunmuyor. Makro ve yazılım koleksiyonumuzu keşfedin.
              </p>
              <Button asChild>
                <Link href="/tr/macros">
                  Makroları Keşfet
                </Link>
              </Button>
            </div>
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
          <h1 className="text-3xl font-bold mb-8 red-gradient-text">
            {checkoutStep === 'cart' ? 'Sepetim' : 'Ödeme'}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Ana içerik alanı */}
            <div className="lg:w-2/3 space-y-6">
              {checkoutStep === 'cart' ? (
                // Sepet içeriği
                <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                  <h2 className="text-xl font-bold mb-4">Ürünler</h2>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-macrosnip-darker rounded-lg">
                        {/* Ürün resmi */}
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-black flex-shrink-0">
                          {item.product?.image && (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Ürün detayları */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium">{item.product?.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">{item.product?.game}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.product?.tags.map(tag => (
                              <span key={tag} className="bg-macrosnip-gray px-2 py-0.5 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Fiyat ve işlemler */}
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="text-right">
                            <div className="flex items-center">
                              {item.product?.discountedPrice && (
                                <span className="line-through text-gray-400 text-sm mr-2">
                                  {item.product.price.toFixed(2)}₺
                                </span>
                              )}
                              <span className="text-lg font-bold red-gradient-text">
                                {(item.product?.discountedPrice || item.product?.price || 0).toFixed(2)}₺
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <button
                              className="bg-macrosnip-gray px-3 py-1 rounded-l"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="bg-macrosnip-darker px-4 py-1">
                              {item.quantity}
                            </span>
                            <button
                              className="bg-macrosnip-gray px-3 py-1 rounded-r"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>

                            <button
                              className="ml-3 text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Ödeme formu
                <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray">
                  <h2 className="text-xl font-bold mb-4">Ödeme Bilgileri</h2>

                  <div className="space-y-6">
                    {/* Kullanıcı Bilgileri */}
                    <div className="p-4 bg-macrosnip-darker rounded-lg space-y-4">
                      <h3 className="font-semibold flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Kullanıcı Bilgileri
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1">Adınız</label>
                          <Input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="bg-macrosnip-dark border-macrosnip-gray"
                            placeholder="Adınız"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">E-posta</label>
                          <Input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="bg-macrosnip-dark border-macrosnip-gray"
                            placeholder="ornek@mail.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="createAccount"
                          checked={isAccountCreation}
                          onChange={() => setIsAccountCreation(!isAccountCreation)}
                          className="h-4 w-4 accent-macrosnip-red bg-macrosnip-darker border-macrosnip-gray rounded"
                        />
                        <label htmlFor="createAccount" className="ml-2 text-sm">
                          Satın alım sonrası hesap oluştur ve kullanıcı bilgilerini mail gönder
                        </label>
                      </div>
                    </div>

                    {/* Kredi Kartı Bilgileri */}
                    <PaymentForm />
                  </div>
                </div>
              )}

              {/* Navigasyon butonları */}
              <div className="flex justify-between">
                {checkoutStep === 'checkout' && (
                  <Button variant="outline" onClick={() => setCheckoutStep('cart')}>
                    Sepete Dön
                  </Button>
                )}

                {checkoutStep === 'cart' ? (
                  <Button className="ml-auto valorant-button red-gradient" onClick={proceedToCheckout}>
                    Ödemeye Geç <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    className="ml-auto valorant-button red-gradient"
                    onClick={handleCompletePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent border-white rounded-full"></span>
                        İşleniyor...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Ödemeyi Tamamla
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Sipariş özeti */}
            <div className="lg:w-1/3">
              <div className="bg-macrosnip-dark p-6 rounded-lg border border-macrosnip-gray sticky top-28">
                <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{calculateSubtotal().toFixed(2)}₺</span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>KDV (%18)</span>
                    <span>{(calculateSubtotal() * 0.18).toFixed(2)}₺</span>
                  </div>

                  <div className="border-t border-macrosnip-gray pt-4 flex justify-between font-bold">
                    <span>Toplam</span>
                    <span className="red-gradient-text">
                      {(calculateSubtotal() * 1.18).toFixed(2)}₺
                    </span>
                  </div>

                  <div className="text-xs text-gray-400">
                    <p>Satın alma işlemini tamamladığınızda, kullanım şartlarını ve gizlilik politikasını kabul etmiş olursunuz.</p>
                    <p className="mt-2">Faturanız e-posta adresinize gönderilecektir.</p>
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
