"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basit doğrulama
    if (!email || !password) {
      setError("Tüm alanları doldurun");
      setLoading(false);
      return;
    }

    // Burada gerçek bir API çağrısı olacak
    try {
      // Giriş simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Başarılı giriş
      router.push("/tr");
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto bg-macrosnip-dark bg-opacity-80 backdrop-blur-lg p-8 rounded-lg border border-macrosnip-gray valorant-angle-reverse relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 red-gradient"></div>

          <h1 className="text-3xl font-bold mb-6 red-gradient-text text-center">Giriş Yap</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-200 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-posta
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-macrosnip-darker border-macrosnip-gray"
                placeholder="ornek@mail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Şifre
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-macrosnip-darker border-macrosnip-gray"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 accent-macrosnip-red bg-macrosnip-darker border-macrosnip-gray rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm">
                  Beni hatırla
                </label>
              </div>

              <div className="text-sm">
                <Link href="/tr/forgot-password" className="red-gradient-text hover:opacity-80">
                  Şifremi Unuttum
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full valorant-button valorant-angle red-gradient text-white font-bold py-3"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-5 w-5 mr-2 border-2 border-t-transparent border-white rounded-full"></span>
                  Giriş Yapılıyor...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Giriş Yap
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-400">
              MacroSnip ürünlerinden birini satın alarak otomatik olarak bir hesap oluşturabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
