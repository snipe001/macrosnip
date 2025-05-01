import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MacroSnip | Yüksek Performanslı Oyun Makroları",
  description:
    "Valorant ve popüler oyunlar için tasarlanmış yüksek performanslı makro scriptleri sunan MacroSnip platformu",
  keywords: [
    "makro",
    "script",
    "valorant",
    "oyun",
    "game",
    "gaming",
    "fps",
    "macro",
    "cheat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-gradient-to-br from-macrosnip-darker to-macrosnip-dark"
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
