'use client';

import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-[0.3em]">NiSANTASI</h3>
              <p className="text-stone-400 leading-relaxed">
                Modern ve şık ayakkabılarla stilinizi tamamlayın. Kaliteli malzeme ve kusursuz işçilik.
              </p>
              <div className="flex space-x-4">
                <button className="p-3 bg-stone-800 hover:bg-stone-700 rounded-full transition-colors">
                  <FiInstagram className="h-5 w-5" />
                </button>
                <button className="p-3 bg-stone-800 hover:bg-stone-700 rounded-full transition-colors">
                  <FiFacebook className="h-5 w-5" />
                </button>
                <button className="p-3 bg-stone-800 hover:bg-stone-700 rounded-full transition-colors">
                  <FiTwitter className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Hızlı Linkler</h4>
              <ul className="space-y-3">
                <li><a href="/tum-urunler" className="text-stone-400 hover:text-white transition-colors">Tüm Ürünler</a></li>
                <li><a href="/outlet" className="text-stone-400 hover:text-white transition-colors">Outlet</a></li>
                <li><a href="/yeni-gelenler" className="text-stone-400 hover:text-white transition-colors">Yeni Gelenler</a></li>
                <li><a href="/en-cok-satanlar" className="text-stone-400 hover:text-white transition-colors">En Çok Satanlar</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Müşteri Hizmetleri</h4>
              <ul className="space-y-3">
                <li><a href="/iade-degisim" className="text-stone-400 hover:text-white transition-colors">İade & Değişim</a></li>
                <li><a href="/kargo-bilgi" className="text-stone-400 hover:text-white transition-colors">Kargo Bilgileri</a></li>
                <li><a href="/boyut-rehberi" className="text-stone-400 hover:text-white transition-colors">Boyut Rehberi</a></li>
                <li><a href="/sss" className="text-stone-400 hover:text-white transition-colors">Sık Sorulanlar</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">İletişim</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FiPhone className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-400">+90 212 XXX XX XX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="h-5 w-5 text-stone-400" />
                  <span className="text-stone-400">info@nisantasi.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FiMapPin className="h-5 w-5 text-stone-400 mt-0.5" />
                  <span className="text-stone-400">Nişantaşı, İstanbul<br />Türkiye</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-400 text-sm">
              © 2024 NiSANTASI. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/gizlilik" className="text-stone-400 hover:text-white transition-colors">
                Gizlilik Politikası
              </a>
              <a href="/kullanim-sartlari" className="text-stone-400 hover:text-white transition-colors">
                Kullanım Şartları
              </a>
              <a href="/cerez" className="text-stone-400 hover:text-white transition-colors">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 