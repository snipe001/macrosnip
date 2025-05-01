"use client";

import { Header } from "@/components/ui/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  Keyboard,
  CreditCard,
  ShoppingCart,
  Bell,
  Shield,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <User className="h-5 w-5 mr-2" />, label: "Profilim", href: "/account" },
    { icon: <Keyboard className="h-5 w-5 mr-2" />, label: "Makrolarım", href: "/account/macros" },
    { icon: <ShoppingCart className="h-5 w-5 mr-2" />, label: "Satın Alma Geçmişi", href: "/account/purchases" },
    { icon: <CreditCard className="h-5 w-5 mr-2" />, label: "Ödeme Yöntemleri", href: "/account/payment" },
    { icon: <Bell className="h-5 w-5 mr-2" />, label: "Bildirimler", href: "/account/notifications" },
    { icon: <Shield className="h-5 w-5 mr-2" />, label: "Güvenlik", href: "/account/security" },
    { icon: <Sliders className="h-5 w-5 mr-2" />, label: "Ayarlar", href: "/account/settings" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Yan menü */}
          <aside className="md:w-64 bg-macrosnip-dark rounded-lg p-4 border border-macrosnip-gray h-fit">
            <h2 className="text-xl font-bold mb-4 red-gradient-text">Hesap Yönetimi</h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-macrosnip-gray hover:text-white transition-colors",
                    pathname === item.href && "bg-macrosnip-gray text-white border-l-2 border-macrosnip-red"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Ana içerik */}
          <main className="flex-1 bg-macrosnip-dark rounded-lg p-6 border border-macrosnip-gray">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
