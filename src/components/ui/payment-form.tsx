"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Check, Wallet, Lock, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PaymentMethod = "card" | "paypal" | "crypto" | "bank";

export function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(true);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulating payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <Card className="bg-macrosnip-darker border-macrosnip-gray max-w-md mx-auto">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-500 mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Ödeme Başarılı</h2>
          <p className="text-gray-400 mb-6">Ödemeniz başarıyla tamamlandı. Makro hesabınıza tanımlandı.</p>
          <Button className="bg-macrosnip-red hover:bg-macrosnip-red/90 text-white w-full">
            Makrolarıma Git
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-macrosnip-darker border-macrosnip-gray">
      <CardHeader>
        <CardTitle>Ödeme Bilgileri</CardTitle>
        <CardDescription>
          Güvenli ödeme işlemi için bilgilerinizi girin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">Ödeme Yöntemi</label>
            <div className="grid grid-cols-4 gap-2">
              <div
                className={cn(
                  "p-3 rounded-md flex flex-col items-center justify-center cursor-pointer text-center transition-all",
                  paymentMethod === "card"
                    ? "bg-macrosnip-red/10 border border-macrosnip-red"
                    : "bg-macrosnip-dark border border-macrosnip-gray hover:border-gray-500"
                )}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className={cn("h-6 w-6 mb-1", paymentMethod === "card" ? "text-macrosnip-red" : "text-gray-400")} />
                <span className="text-xs">Kredi Kartı</span>
              </div>
              <div
                className={cn(
                  "p-3 rounded-md flex flex-col items-center justify-center cursor-pointer text-center transition-all",
                  paymentMethod === "paypal"
                    ? "bg-blue-500/10 border border-blue-500"
                    : "bg-macrosnip-dark border border-macrosnip-gray hover:border-gray-500"
                )}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="h-6 w-6 mb-1 flex items-center justify-center">
                  <Image src="https://same-assets.com/images/paypal-logo.png" alt="PayPal" width={16} height={16} />
                </div>
                <span className="text-xs">PayPal</span>
              </div>
              <div
                className={cn(
                  "p-3 rounded-md flex flex-col items-center justify-center cursor-pointer text-center transition-all",
                  paymentMethod === "crypto"
                    ? "bg-orange-500/10 border border-orange-500"
                    : "bg-macrosnip-dark border border-macrosnip-gray hover:border-gray-500"
                )}
                onClick={() => setPaymentMethod("crypto")}
              >
                <div className="h-6 w-6 mb-1 flex items-center justify-center">
                  <Image src="https://same-assets.com/images/bitcoin-logo.png" alt="Crypto" width={16} height={16} />
                </div>
                <span className="text-xs">Kripto</span>
              </div>
              <div
                className={cn(
                  "p-3 rounded-md flex flex-col items-center justify-center cursor-pointer text-center transition-all",
                  paymentMethod === "bank"
                    ? "bg-green-500/10 border border-green-500"
                    : "bg-macrosnip-dark border border-macrosnip-gray hover:border-gray-500"
                )}
                onClick={() => setPaymentMethod("bank")}
              >
                <Wallet className={cn("h-6 w-6 mb-1", paymentMethod === "bank" ? "text-green-500" : "text-gray-400")} />
                <span className="text-xs">Banka</span>
              </div>
            </div>
          </div>

          {paymentMethod === "card" && (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">Kart Bilgileri</label>
                  <button
                    type="button"
                    onClick={() => setShowCardDetails(!showCardDetails)}
                    className="text-xs text-gray-400 hover:text-white flex items-center"
                  >
                    {showCardDetails ? "Gizle" : "Göster"}
                    <ChevronsUpDown className="h-3 w-3 ml-1" />
                  </button>
                </div>

                {showCardDetails && (
                  <>
                    <div className="bg-macrosnip-dark p-4 rounded-md border border-macrosnip-gray mb-4">
                      <div className="mb-4">
                        <label className="text-xs text-gray-400 mb-1 block">Kart Numarası</label>
                        <div className="relative">
                          <Input
                            className="pl-10 bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="XXXX XXXX XXXX XXXX"
                          />
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                          <label className="text-xs text-gray-400 mb-1 block">Son Kullanma Tarihi</label>
                          <Input
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="AA/YY"
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="text-xs text-gray-400 mb-1 block">Güvenlik Kodu (CVV)</label>
                          <Input
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="XXX"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-macrosnip-dark p-4 rounded-md border border-macrosnip-gray">
                      <div className="mb-4">
                        <label className="text-xs text-gray-400 mb-1 block">Kart Sahibi</label>
                        <Input
                          className="bg-macrosnip-darker border-macrosnip-gray"
                          placeholder="Kart üzerindeki isim"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                          <label className="text-xs text-gray-400 mb-1 block">E-posta</label>
                          <Input
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="eposta@ornek.com"
                            type="email"
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="text-xs text-gray-400 mb-1 block">Telefon</label>
                          <Input
                            className="bg-macrosnip-darker border-macrosnip-gray"
                            placeholder="+90XXXXXXXXXX"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {paymentMethod === "paypal" && (
            <div className="bg-macrosnip-dark p-6 rounded-md border border-macrosnip-gray text-center">
              <div className="mb-4">
                <Image src="https://same-assets.com/images/paypal-full-logo.png" alt="PayPal" width={120} height={30} className="mx-auto" />
              </div>
              <p className="text-gray-400 text-sm mb-6">PayPal ile güvenli ve hızlı ödeme yapın. Ödeme yapmak için PayPal hesabınıza yönlendirileceksiniz.</p>
              <Button className="bg-[#0070ba] hover:bg-[#005ea6] text-white w-full">
                PayPal ile Öde
              </Button>
            </div>
          )}

          {paymentMethod === "crypto" && (
            <div className="bg-macrosnip-dark p-6 rounded-md border border-macrosnip-gray text-center">
              <div className="mb-4 flex justify-center space-x-4">
                <Image src="https://same-assets.com/images/bitcoin-logo.png" alt="Bitcoin" width={32} height={32} />
                <Image src="https://same-assets.com/images/ethereum-logo.png" alt="Ethereum" width={32} height={32} />
                <Image src="https://same-assets.com/images/usdt-logo.png" alt="USDT" width={32} height={32} />
              </div>
              <p className="text-gray-400 text-sm mb-6">Desteklenen kripto paralar ile güvenli ödeme yapın. İşlemi tamamlamak için QR kod tarayın veya adrese kripto gönderimi yapın.</p>
              <div className="bg-macrosnip-darker p-4 rounded-md border border-macrosnip-gray mb-4">
                <p className="text-xs text-gray-400 mb-1">Bitcoin Adresi</p>
                <p className="text-sm text-white font-mono break-all">bc1q8c6t5r9w2y7jhl4h9wl8kd38zj2rz4zp3nv005</p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32 bg-white p-2 rounded-md">
                  <Image src="https://same-assets.com/images/qr-code-placeholder.png" alt="QR Code" width={128} height={128} />
                </div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                Ödemeyi Doğrula
              </Button>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div className="bg-macrosnip-dark p-6 rounded-md border border-macrosnip-gray">
              <p className="text-gray-400 text-sm mb-4">Banka havalesi ile ödeme yapmak için aşağıdaki hesap bilgilerini kullanabilirsiniz.</p>

              <div className="mb-6 space-y-4">
                <div className="bg-macrosnip-darker p-3 rounded-md border border-macrosnip-gray">
                  <p className="text-xs text-gray-400 mb-1">Banka</p>
                  <p className="text-sm text-white">Garanti Bankası</p>
                </div>
                <div className="bg-macrosnip-darker p-3 rounded-md border border-macrosnip-gray">
                  <p className="text-xs text-gray-400 mb-1">Hesap Sahibi</p>
                  <p className="text-sm text-white">MacroSnip Teknoloji A.Ş.</p>
                </div>
                <div className="bg-macrosnip-darker p-3 rounded-md border border-macrosnip-gray">
                  <p className="text-xs text-gray-400 mb-1">IBAN</p>
                  <p className="text-sm text-white font-mono break-all">TR12 3456 7890 1234 5678 9012 34</p>
                </div>
                <div className="bg-macrosnip-darker p-3 rounded-md border border-macrosnip-gray">
                  <p className="text-xs text-gray-400 mb-1">Açıklama</p>
                  <p className="text-sm text-white font-mono">MC-875423</p>
                  <p className="text-xs text-gray-400 mt-1">Lütfen açıklama kısmına bu referans kodunu yazınız</p>
                </div>
              </div>

              <div className="p-3 bg-yellow-500/10 rounded-md border border-yellow-600 mb-6">
                <p className="text-xs text-yellow-500">Ödemeyi yaptıktan sonra "Ödemeyi Bildirme" butonuna tıklayarak ödeme bilgilerinizi bize iletebilirsiniz.</p>
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                Ödemeyi Bildirme Formunu Aç
              </Button>
            </div>
          )}

          <div className="mt-8">
            <div className="bg-macrosnip-dark p-4 rounded-md border border-macrosnip-gray mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Ara Toplam</span>
                <span className="text-white">₺249.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">KDV (%20)</span>
                <span className="text-white">₺49.80</span>
              </div>
              <div className="border-t border-macrosnip-gray my-2 pt-2"></div>
              <div className="flex justify-between">
                <span className="font-bold text-white">Toplam</span>
                <span className="font-bold text-macrosnip-red">₺298.80</span>
              </div>
            </div>

            <div className="flex items-center justify-start mb-4">
              <Lock className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-xs text-gray-400">Güvenli Ödeme - Bilgileriniz 256-bit SSL ile korunmaktadır</span>
            </div>
          </div>

          {paymentMethod === "card" && (
            <Button
              className="w-full bg-macrosnip-red hover:bg-macrosnip-red/90 text-white"
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  İşleniyor...
                </>
              ) : "Ödemeyi Tamamla"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
