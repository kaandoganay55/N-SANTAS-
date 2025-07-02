import ProductCard from '@/components/ProductCard';
import { FiPercent, FiTruck, FiClock, FiShield } from 'react-icons/fi';

// Outlet ürünleri
const outletProducts = [
  {
    id: 'outlet-1',
    name: 'KLASİK SİYAH DERİ OXFORD',
    price: 799.90,
    originalPrice: 1299.90,
    images: ['/outlet-1.jpg'],
    colors: ['#000000', '#8B4513']
  },
  {
    id: 'outlet-2',
    name: 'SÜET TOPUKLU AYAKKABI',
    price: 599.90,
    originalPrice: 999.90,
    images: ['/outlet-2.jpg'],
    colors: ['#D2B48C', '#F5DEB3', '#DDA0DD']
  },
  {
    id: 'outlet-3',
    name: 'CASUAL SNEAKER BEYAZ',
    price: 449.90,
    originalPrice: 699.90,
    images: ['/outlet-3.jpg'],
    colors: ['#FFFFFF', '#F5F5F5', '#E5E5E5']
  },
  {
    id: 'outlet-4',
    name: 'EVENING HEELS GOLD',
    price: 899.90,
    originalPrice: 1399.90,
    images: ['/outlet-4.jpg'],
    colors: ['#FFD700', '#FFA500']
  },
  {
    id: 'outlet-5',
    name: 'BABET MAVİ DERİ',
    price: 549.90,
    originalPrice: 799.90,
    images: ['/outlet-5.jpg'],
    colors: ['#87CEEB', '#4682B4']
  },
  {
    id: 'outlet-6',
    name: 'KLASIK KAHVE OXFORD',
    price: 699.90,
    originalPrice: 1099.90,
    images: ['/outlet-6.jpg'],
    colors: ['#8B4513', '#A0522D']
  }
];

export default function OutletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-400 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <FiPercent className="h-6 w-6 text-white" />
            <span className="text-white font-semibold">BÜYÜK İNDİRİM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            OUTLET
          </h1>
          <p className="text-xl md:text-2xl text-rose-100 leading-relaxed mb-8">
            %70'e varan indirimlerle kaliteli ayakkabılar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
              <span className="text-white font-bold text-lg">Sınırlı Stok!</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
              <span className="text-white font-bold text-lg">Son Fırsat!</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Avantajlar */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPercent className="h-7 w-7 text-stone-600" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">%70'e Varan İndirim</h3>
              <p className="text-stone-600 text-sm">Sezon sonu büyük fırsatları</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="h-7 w-7 text-stone-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Ücretsiz Kargo</h3>
              <p className="text-stone-600 text-sm">299₺ üzeri alışverişlerde</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="h-7 w-7 text-stone-600" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Hızlı Teslimat</h3>
              <p className="text-stone-600 text-sm">24-48 saat içinde kargoda</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="h-7 w-7 text-stone-700" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Kalite Garantisi</h3>
              <p className="text-stone-600 text-sm">Aynı kalite, uygun fiyat</p>
            </div>
          </div>
        </section>

        {/* Uyarı Bandı */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <FiClock className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">⏰ Son Gün Fırsatları!</h3>
                <p className="text-amber-700 mt-1">
                  Outlet ürünlerinde sınırlı stok bulunmaktadır. Beğendiğiniz ürünleri kaçırmayın!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Outlet Ürünleri */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
              OUTLET ÜRÜNLERİ
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Sezon sonu indirimleriyle kaliteli ayakkabıları uygun fiyatlarla keşfedin
            </p>
            <div className="mt-6 inline-flex items-center space-x-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full">
              <FiPercent className="h-4 w-4" />
              <span className="font-semibold text-sm">İndirimli Fiyatlar</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {outletProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-in fade-in-up duration-700"
                style={{ animationDelay: `${200 + (index * 100)}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* İndirim Kategorileri */}
        <section className="py-16 bg-gradient-to-r from-white to-stone-50 rounded-3xl mb-16 border border-stone-200">
          <div className="px-8 md:px-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-12 text-center">
              İNDİRİM KATEGORİLERİ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4 relative">
                  <div className="h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-stone-900 mb-4 block">%50</span>
                      <p className="text-stone-700">BABET & OXFORD</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-stone-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    HOT
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-stone-900">Klasik Modeller</h3>
              </div>
              
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4 relative">
                  <div className="h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-stone-800 mb-4 block">%70</span>
                      <p className="text-stone-700">TOPUKLU & ÇIZME</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-stone-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-stone-900">Şık Modeller</h3>
              </div>
              
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4 relative">
                  <div className="h-full w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <span className="text-5xl font-bold text-stone-900 mb-4 block">%60</span>
                      <p className="text-stone-700">SPOR & CASUAL</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-stone-900">Rahat Modeller</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Son Fırsat Uyarısı */}
        <section className="py-12">
          <div className="bg-gradient-to-r from-rose-400 to-rose-500 rounded-3xl p-8 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">⚡ SON FIRSAT!</h3>
            <p className="text-xl mb-6 text-rose-100">
              Outlet ürünlerinde stoklar tükenmeden yerinizi alın
            </p>
            <div className="inline-flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-bold">Sınırlı Stok</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-bold">Hızlı Kargo</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-bold">Güvenli Ödeme</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 