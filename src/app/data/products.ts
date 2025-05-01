export interface Product {
  id: string;
  name: string;
  game: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  videoPreview?: string;
  rating: number;
  downloads: number;
  isPopular?: boolean;
  isNew?: boolean;
  tags: string[];
  features: string[];
  slug: string;
}

export const products: Product[] = [
  {
    id: "macro-val-1",
    name: "Valorant Pro Spray Control",
    slug: "valorant-pro-spray-control",
    game: "Valorant",
    description: "Phantom ve Vandal için gelişmiş sprey kontrolü. Nişan alma ve tepme kontrolü için özel geliştirilen makro, rekabetçi oyunlarda avantaj sağlar.",
    price: 149.99,
    discountedPrice: 129.99,
    image: "https://same-assets.com/images/a3d2d9b4-e835-4dba-ba8d-8b8e8e4fc2d7",
    videoPreview: "https://same-assets.com/videos/valorant-macro-demo-1.mp4",
    rating: 4.8,
    downloads: 3250,
    isPopular: true,
    tags: ["FPS", "Spray Control", "Pro"],
    features: [
      "Phantom ve Vandal için optimize edilmiş",
      "100'den fazla toplamış veri ile geliştirilmiş algoritma",
      "Tüm ekran çözünürlükleri ile uyumlu",
      "Anti-Ban koruması",
      "Otomatik güncellemeler"
    ]
  },
  {
    id: "macro-val-2",
    name: "Valorant Jett Ultimate Booster",
    slug: "valorant-jett-ultimate-booster",
    game: "Valorant",
    description: "Jett'in ultisini maksimum performansla kullanın. Hızlı hedef geçişleri ve keskin bıçak atışları için optimize edilmiş özel makro.",
    price: 129.99,
    image: "https://same-assets.com/images/a3d2d9b4-e835-4dba-ba8d-8b8e8e4fc2d7",
    videoPreview: "https://same-assets.com/videos/valorant-macro-demo-2.mp4",
    rating: 4.7,
    downloads: 2100,
    isNew: true,
    tags: ["Agent", "Ultimate", "Pro"],
    features: [
      "Jett ultisi için maksimum performans",
      "Hızlı hedef geçişleri",
      "Otomatik bıçak atışı optimizasyonu",
      "Düşük gecikme süresi",
      "Tüm ekran çözünürlükleri ile uyumlu"
    ]
  },
  {
    id: "macro-val-3",
    name: "Valorant Chamber Aim Booster",
    slug: "valorant-chamber-aim-booster",
    game: "Valorant",
    description: "Chamber ile kafadan vuruş oranınızı artırın. Vuruş, geri çekilme ve teleport için mükemmel zamanlama sağlayan özel makro.",
    price: 159.99,
    discountedPrice: 139.99,
    image: "https://same-assets.com/images/a3d2d9b4-e835-4dba-ba8d-8b8e8e4fc2d7",
    rating: 4.6,
    downloads: 1800,
    tags: ["Agent", "Headshot", "Pro"],
    features: [
      "Chamber ile kafadan vuruş optimizasyonu",
      "Headhunter yeteneği için özel ayarlar",
      "Tour De Force ultisi için hassas nişan alma",
      "Hızlı teleport taktiği",
      "Gelişmiş pozisyon alma"
    ]
  },
  {
    id: "macro-val-4",
    name: "Valorant Movement Master",
    slug: "valorant-movement-master",
    game: "Valorant",
    description: "Gelişmiş hareket teknikleri ve peek optimizasyonu. Jiggle peek, counter-strafe ve bunny hop tekniklerinizi güçlendirin.",
    price: 119.99,
    discountedPrice: 99.99,
    image: "https://same-assets.com/images/a3d2d9b4-e835-4dba-ba8d-8b8e8e4fc2d7",
    videoPreview: "https://same-assets.com/videos/valorant-macro-demo-3.mp4",
    rating: 4.5,
    downloads: 2500,
    isPopular: true,
    tags: ["Movement", "Peek", "Training"],
    features: [
      "Mükemmel counter-strafe zamanlaması",
      "Jiggle peek optimizasyonu",
      "Bunny hop tekniği",
      "Hareket hızı optimizasyonu",
      "Peek & shot zamanlama asistanı"
    ]
  },
  {
    id: "macro-val-5",
    name: "Valorant Recoil Master",
    slug: "valorant-recoil-master",
    game: "Valorant",
    description: "Tüm silahlar için tepme kontrolünü mükemmelleştirin. Spray ve burst atış paternlerini otomatik olarak düzenleyen özel algoritma.",
    price: 139.99,
    image: "https://same-assets.com/images/a3d2d9b4-e835-4dba-ba8d-8b8e8e4fc2d7",
    rating: 4.9,
    downloads: 3800,
    isPopular: true,
    tags: ["Recoil", "Spray", "Pro"],
    features: [
      "Tüm silahlar için tepme kontrolü",
      "Farklı mesafelere göre otomatik ayarlama",
      "Burst ve spray paternleri için özelleştirme",
      "Anti-recoil algoritması",
      "Silah değiştirme hızı optimizasyonu"
    ]
  },
  {
    id: "macro-csgo-1",
    name: "CS:GO Recoil Master Pro",
    slug: "csgo-recoil-master-pro",
    game: "CS:GO",
    description: "AK-47, M4A4 ve diğer popüler silahlar için profesyonel sprey kontrolü. Tepme paternlerini otomatik olarak düzenleyen ileri seviye makro.",
    price: 159.99,
    discountedPrice: 139.99,
    image: "https://same-assets.com/images/d7f2d9b4-e835-4dba-ba8d-8b8e8e4fc2d8",
    videoPreview: "https://same-assets.com/videos/csgo-macro-demo-1.mp4",
    rating: 4.8,
    downloads: 4100,
    isPopular: true,
    tags: ["Recoil", "Spray", "Pro"],
    features: [
      "AK-47, M4A4, M4A1-S ve AWP için özel ayarlar",
      "Sprey paternlerinin gerçek zamanlı düzeltmesi",
      "Farklı mesafelere göre otomatik ayarlama",
      "CS:GO güncelleme uyumluluğu",
      "Kişiselleştirilebilir ayarlar paneli"
    ]
  },
  {
    id: "macro-fort-1",
    name: "Fortnite Turbo Building Pro",
    slug: "fortnite-turbo-building-pro",
    game: "Fortnite",
    description: "Ultra-hızlı inşa kombinasyonları ve edit makroları. Build savaşlarında hız ve doğruluk avantajı sağlayan tam paket.",
    price: 129.99,
    discountedPrice: 109.99,
    image: "https://same-assets.com/images/f5e2d9b4-e835-4dba-ba8d-8b8e8e4fc2d9",
    videoPreview: "https://same-assets.com/videos/fortnite-macro-demo-1.mp4",
    rating: 4.7,
    downloads: 3600,
    isNew: true,
    tags: ["Building", "Editing", "Pro"],
    features: [
      "Tek tuşla 90° dönüş ve rampa kombinasyonları",
      "Hızlı duvar-pencere edit makroları",
      "Edit-reset kombinasyonları",
      "Otomatik silah değiştirme optimizasyonu",
      "Kişiselleştirilebilir inşa desenleri"
    ]
  },
  {
    id: "macro-apex-1",
    name: "Apex Legends Recoil Stabilizer",
    slug: "apex-legends-recoil-stabilizer",
    game: "Apex Legends",
    description: "R-301, Flatline ve diğer silahlar için tepme kontrolü. Uzun mesafe çatışmalarda doğruluk sağlayan makro paketi.",
    price: 149.99,
    image: "https://same-assets.com/images/a9c2d9b4-e835-4dba-ba8d-8b8e8e4fc2d0",
    rating: 4.6,
    downloads: 2800,
    tags: ["Recoil", "Aim", "Pro"],
    features: [
      "Popüler silahlar için tepme kontrolü",
      "Eklenti-bazlı ayarlama (barrel stabilizer vb.)",
      "Karakter yeteneği entegrasyonu",
      "Otomatik tepme telafisi",
      "Sezon güncellemelerine uyumlu"
    ]
  }
];

// Filtreleme fonksiyonları
export function getProductsByGame(game: string): Product[] {
  return products.filter(product => product.game.toLowerCase() === game.toLowerCase());
}

export function getPopularProducts(limit = 4): Product[] {
  return products
    .filter(product => product.isPopular)
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
}

export function getNewProducts(limit = 4): Product[] {
  return products
    .filter(product => product.isNew)
    .slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.game.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}
