import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { BlogSection } from "@/components/ui/blog-section";
import { LiveChat } from "@/components/ui/live-chat";
import Link from "next/link";

export default function Home() {
  const locale = "en";

  return (
    <main className="min-h-screen">
      {/* Animated background */}
      <AnimatedBackground />
      {/* Live chat */}
      <LiveChat />
      {/* Header */}
      <Header />
      {/* Main sections */}
      <HeroSection />
      <FeaturesSection />
      {/* Testimonials */}
      <TestimonialsSection />
      {/* Pricing */}
      <PricingSection />
      {/* Blog & News */}
      <BlogSection />
      {/* Footer */}
      <footer className="bg-macrosnip-darker py-10 border-t border-macrosnip-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 red-gradient-text">MacroSnip</h3>
              <p className="text-gray-400 text-sm">
                Elevate your gaming experience with high-performance macro scripts that give you a competitive edge in the gaming world.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={`/${locale}/macros?game=Valorant`} className="hover:text-white transition-colors">Valorant Macros</Link></li>
                <li><Link href={`/${locale}/macros?game=CS:GO`} className="hover:text-white transition-colors">CS:GO Macros</Link></li>
                <li><Link href={`/${locale}/macros?game=Fortnite`} className="hover:text-white transition-colors">Fortnite Macros</Link></li>
                <li><Link href={`/${locale}/macros?game=Apex Legends`} className="hover:text-white transition-colors">Apex Legends Macros</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href={`/${locale}/careers`} className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href={`/${locale}/refund`} className="hover:text-white transition-colors">Refund Policy</Link></li>
                <li><Link href={`/${locale}/gdpr`} className="hover:text-white transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-macrosnip-gray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MacroSnip. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="https://discord.com" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
