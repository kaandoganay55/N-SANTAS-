import Link from 'next/link';
import { FiAward, FiHeart, FiShield, FiUsers } from 'react-icons/fi';

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-stone-900 to-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            HAKKIMIZDA
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 leading-relaxed">
            Kalite, stil ve konforu bir araya getiren ayakkabı markası
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana İçerik */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6">
                Hikayemiz
              </h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                NiSANTASI, 1980 yılında İstanbul'un kalbinde kurulan bir ayakkabı markasıdır. 
                40 yılı aşkın tecrübemizle, kaliteli malzemeler ve ustaca işçilik ile 
                müşterilerimize en iyi ayakkabı deneyimini sunuyoruz.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Geleneksel el sanatlarını modern tasarımla buluşturarak, her adımda 
                konfor ve şıklığı bir arada sunan ürünler üretiyoruz.
              </p>
              <Link 
                href="/iletisim"
                className="inline-flex items-center px-8 py-4 bg-stone-900 text-white rounded-2xl font-semibold hover:bg-stone-800 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Bizimle İletişime Geçin
              </Link>
            </div>
            <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-stone-600 mb-4">1980</div>
                <p className="text-stone-700 text-lg">Kuruluş Yılımız</p>
              </div>
            </div>
          </div>
        </section>

        {/* Değerlerimiz */}
        <section className="py-16 bg-gradient-to-r from-white to-stone-50 rounded-3xl mb-16 border border-stone-200">
          <div className="px-8 md:px-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-12 text-center">
              Değerlerimiz
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-stone-200 transition-colors duration-300">
                  <FiAward className="h-8 w-8 text-stone-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Kalite</h3>
                <p className="text-stone-600">
                  En kaliteli malzemeler ve üstün işçilik anlayışı
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-stone-200 transition-colors duration-300">
                  <FiHeart className="h-8 w-8 text-stone-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Tutku</h3>
                <p className="text-stone-600">
                  Her ürünü aşkla ve özenle tasarlıyoruz
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-stone-300 transition-colors duration-300">
                  <FiShield className="h-8 w-8 text-stone-700" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Güven</h3>
                <p className="text-stone-600">
                  40 yıllık deneyim ve müşteri memnuniyeti
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-stone-300 transition-colors duration-300">
                  <FiUsers className="h-8 w-8 text-stone-700" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">Aile</h3>
                <p className="text-stone-600">
                  Müşterilerimizi ailemizin bir parçası görüyoruz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-stone-900 mb-2">40+</div>
              <p className="text-stone-600">Yıllık Deneyim</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-stone-800 mb-2">100K+</div>
              <p className="text-stone-600">Mutlu Müşteri</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-stone-900 mb-2">500+</div>
              <p className="text-stone-600">Ürün Çeşidi</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-stone-900 mb-2">50+</div>
              <p className="text-stone-600">Satış Noktası</p>
            </div>
          </div>
        </section>

        {/* Misyon & Vizyon */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 border border-emerald-200">
                              <h3 className="text-3xl font-bold text-stone-900 mb-6">Misyonumuz</h3>
                <p className="text-stone-700 text-lg leading-relaxed">
                Müşterilerimize en kaliteli, konforlu ve şık ayakkabıları sunarak, 
                her adımlarında kendilerini özel hissettirmek. Geleneksel el sanatlarını 
                modern teknoloji ile birleştirerek mükemmel ürünler üretmek.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200">
              <h3 className="text-3xl font-bold text-blue-900 mb-6">Vizyonumuz</h3>
              <p className="text-blue-800 text-lg leading-relaxed">
                Türkiye'nin en güvenilir ve tercih edilen ayakkabı markası olmak. 
                Uluslararası pazarlarda Türk kalitesini temsil ederek, dünya çapında 
                tanınan bir marka haline gelmek.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 