import ProductCard from '@/components/ProductCard';
import TextSlider from '@/components/TextSlider';
import FancyButton from '@/components/FancyButton';

// Örnek ürün verileri - Sadece siyah, beyaz, yeşil tonları
const featuredProducts = [
  {
    id: '1',
    name: 'KLASİK SİYAH DERİ BABET',
    price: 899.90,
    originalPrice: 1199.90,
    images: ['/product-1.jpg'],
    colors: ['#000000', '#1f2937', '#374151']
  },
  {
    id: '2',
    name: 'BEYAZ MİNİMAL BABET',
    price: 799.90,
    originalPrice: 999.90,
    images: ['/product-2.jpg'],
    colors: ['#ffffff', '#f9fafb']
  },
  {
    id: '3',
    name: 'YEŞİL SÜET BABET',
    price: 1299.90,
    images: ['/product-3.jpg'],
    colors: ['#059669', '#065f46', '#064e3b']
  },
  {
    id: '4',
    name: 'GRI KLASIK BABET',
    price: 699.90,
    originalPrice: 899.90,
    images: ['/product-4.jpg'],
    colors: ['#6b7280', '#4b5563']
  }
];

const newProducts = [
  {
    id: '5',
    name: 'SİYAH OXFORD DERİ AYAKKABI',
    price: 1599.90,
    images: ['/product-5.jpg'],
    colors: ['#000000', '#1f2937']
  },
  {
    id: '6',
    name: 'BEYAZ TOPUKLU AYAKKABI',
    price: 1099.90,
    originalPrice: 1399.90,
    images: ['/product-6.jpg'],
    colors: ['#ffffff', '#f3f4f6']
  },
  {
    id: '7',
    name: 'YEŞİL CASUAL SNEAKER',
    price: 899.90,
    images: ['/product-7.jpg'],
    colors: ['#10b981', '#059669']
  },
  {
    id: '8',
    name: 'SİYAH EVENING HEELS',
    price: 1299.90,
    originalPrice: 1599.90,
    images: ['/product-8.jpg'],
    colors: ['#000000', '#111827']
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <div className="absolute inset-0 bg-gradient-to-r from-black/3 to-transparent"></div>
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-stone-900 mb-8 tracking-tight leading-none">
            YENİ SEZON
            <br />
            <span className="text-stone-900">AYAKKABI</span>
            <br />
            KOLEKSİYONU
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Şık ve konforlu ayakkabılarla stilinizi tamamlayın
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <FancyButton href="/tum-urunler" variant="dark">
              ÜRÜNLERE GÖZ AT
            </FancyButton>
            <FancyButton href="/katalog" variant="light">
              KATALOĞİ İNCELE
            </FancyButton>
          </div>
        </div>
      </section>

      {/* Scrolling Text Section */}
      <TextSlider 
        texts={[
          "PREMIUM QUALITY FOOTWEAR",
          "HANDCRAFTED WITH PASSION", 
          "STYLE THAT SPEAKS VOLUMES",
          "COMFORT REDEFINED",
          "MODERN ELEGANCE"
        ]}
        className="py-8 bg-gradient-to-r from-stone-100 to-stone-50 border-y border-stone-200"
        speed={35}
        textColor="text-stone-700"
        separator="•"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Products Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              ÖNE ÇIKAN ÜRÜNLER
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              En popüler ve beğenilen modellerimizi keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <FancyButton href="/tum-urunler" variant="dark">
              Tüm Ürünleri Görüntüle
            </FancyButton>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-r from-white to-stone-50 rounded-3xl mb-16 border border-stone-200">
          <div className="px-8 md:px-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-12 text-center">
              KATEGORİLER
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4 relative">
                  <div className="h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-stone-800 mb-4 block">BABET</span>
                      <p className="text-stone-600">Günlük kullanım için ideal</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-center text-stone-900 group-hover:text-stone-700 transition-colors duration-300">Günlük Babetler</h3>
              </div>
              
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4 relative">
                  <div className="h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-stone-800 mb-4 block">TOPUKLU</span>
                      <p className="text-stone-600">Şık ve zarif görünüm</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-center text-stone-900 group-hover:text-stone-700 transition-colors duration-300">Zarif Topuklular</h3>
              </div>
              
              <div className="group cursor-pointer">
                                  <div className="aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4 relative">
                  <div className="h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-stone-800 mb-4 block">OXFORD</span>
                      <p className="text-stone-700">Klasik ve professional</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-center text-stone-900 group-hover:text-stone-700 transition-colors duration-300">Klasik Oxfordlar</h3>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Second Scrolling Text Section */}
      <div className="my-16">
        <TextSlider 
          texts={[
            "NiSANTASI EXCLUSIVE COLLECTION",
            "LUXURY MEETS COMFORT", 
            "TURKISH CRAFTSMANSHIP",
            "DESIGNED FOR MODERN LIFE",
            "STEP INTO ELEGANCE"
          ]}
          className="py-8 bg-gradient-to-r from-stone-200 to-stone-100"
          speed={40}
          textColor="text-stone-700"
          direction="right"
          separator="◆"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Arrivals Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              YENİ GELENLER
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              En son eklenen modelleri ilk siz görün
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map((product) => (
              <div key={product.id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Third Scrolling Text Section */}
      <div className="my-16">
        <TextSlider 
          texts={[
            "FREE SHIPPING WORLDWIDE",
            "30 DAY RETURN POLICY", 
            "PREMIUM CUSTOMER SERVICE",
            "SECURE PAYMENT GUARANTEED"
          ]}
          className="py-6 bg-gradient-to-r from-stone-800 to-stone-900"
          speed={25}
          textColor="text-stone-100"
          separator="•"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-white to-stone-50 rounded-3xl p-12 text-center border border-stone-200">
            <h2 className="text-3xl font-bold text-stone-900 mb-6">
              KAMPANYALARDAN HABERDAR OLUN
            </h2>
            <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Yeni ürünler, özel indirimler ve kampanyalardan ilk siz haberdar olun
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto items-center">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-6 py-4 border-2 border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-stone-900 placeholder-stone-400 rounded-2xl"
              />
              <FancyButton variant="dark">
                ABONE OL
              </FancyButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
