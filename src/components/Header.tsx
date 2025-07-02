'use client';

import Link from 'next/link';
import { FiSearch, FiUser, FiShoppingBag, FiHeart, FiChevronDown, FiLogIn, FiUserPlus, FiSettings, FiLogOut } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import BurgerMenu from './BurgerMenu';

export default function Header() {
  const { toggleCart, getTotalItems } = useCartStore();
  const { getFavoriteCount } = useFavoriteStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  
  // Hydration sorununu önlemek için
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const totalItems = mounted ? getTotalItems() : 0;
  const favoriteCount = mounted ? getFavoriteCount() : 0;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    setIsUserMenuOpen(false);
  };

  // Ayakkabı kategorileri
  const shoeCategories = [
    {
      title: 'YENİ SEZON',
      items: [
        { name: 'Yeni Koleksiyon', href: '/kategori/yeni-koleksiyon' },
        { name: 'Trend Modeller', href: '/kategori/trend' },
        { name: 'Limited Edition', href: '/kategori/limited' }
      ]
    },
    {
      title: 'TOPUKLU',
      items: [
        { name: 'Stiletto', href: '/kategori/stiletto' },
        { name: 'Kalın Topuk', href: '/kategori/kalin-topuk' },
        { name: 'İnce Topuk', href: '/kategori/ince-topuk' }
      ]
    },
    {
      title: 'BABET',
      items: [
        { name: 'Düz Babet', href: '/kategori/duz-babet' },
        { name: 'Topuklu Babet', href: '/kategori/topuklu-babet' }
      ]
    },
    {
      title: 'TERLİK',
      items: [
        { name: 'Düz Terlik', href: '/kategori/duz-terlik' },
        { name: 'Topuklu Terlik', href: '/kategori/topuklu-terlik' },
        { name: 'Bohem Terlik', href: '/kategori/bohem-terlik' }
      ]
    },
    {
      title: 'SANDALET',
      items: [
        { name: 'Düz Sandalet', href: '/kategori/duz-sandalet' },
        { name: 'Topuklu Sandalet', href: '/kategori/topuklu-sandalet' },
        { name: 'Beach Collection', href: '/kategori/beach-collection' }
      ]
    },
    {
      title: 'LOAFER & MAKOSEN',
      items: [
        { name: 'Klasik Loafer', href: '/kategori/klasik-loafer' },
        { name: 'Modern Makosen', href: '/kategori/modern-makosen' }
      ]
    },
    {
      title: 'GÜNLÜK AYAKKABI',
      items: [
        { name: 'Spor Ayakkabı', href: '/kategori/spor' },
        { name: 'Casual', href: '/kategori/casual' }
      ]
    }
  ];

  const additionalCategories = [
    { name: 'SPOR', href: '/kategori/spor-ayakkabi' },
    { name: 'BOT', href: '/kategori/bot' },
    { name: 'ÇANTA', href: '/kategori/canta' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-200/60 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <BurgerMenu 
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-all duration-300 hover:scale-110"
            />
          </div>

          {/* Sol Menü - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {/* TÜM ÜRÜNLER - Dropdown Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsMenuOpen(true)}
              onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
              <Link 
                href="/tum-urunler" 
                className="text-stone-600 hover:text-stone-900 transition-all duration-200 text-sm font-medium tracking-wide relative group py-2 flex items-center space-x-1"
              >
                <span>TÜM ÜRÜNLER</span>
                <FiChevronDown className={`h-3 w-3 transition-transform duration-300 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
              
              {/* Dropdown Menu */}
              {isProductsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-xl border border-stone-200 py-6 z-50 animate-in fade-in-up duration-300">
                  <div className="grid grid-cols-4 gap-8 px-8">
                    {/* Ana kategoriler */}
                    {shoeCategories.map((category, index) => (
                      <div key={category.title} className="space-y-3">
                        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide border-b border-stone-200 pb-2">
                          {category.title}
                        </h3>
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200 hover:translate-x-1"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Alt kısım - Ek kategoriler */}
                  <div className="border-t border-stone-200 mt-6 pt-4 px-8">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-8">
                        {additionalCategories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors duration-200"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/tum-urunler"
                        className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors duration-200"
                      >
                        Tüm Ürünleri Görüntüle →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              href="/outlet" 
              className="text-stone-600 hover:text-stone-900 transition-all duration-200 text-sm font-medium tracking-wide relative group py-2"
            >
              OUTLET
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <Link 
              href="/hakkimizda" 
              className="text-stone-600 hover:text-stone-900 transition-all duration-200 text-sm font-medium tracking-wide relative group py-2"
            >
              HAKKIMIZDA
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/iletisim" 
              className="text-stone-600 hover:text-stone-900 transition-all duration-200 text-sm font-medium tracking-wide relative group py-2"
            >
              İLETİŞİM
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-500 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-center">
            <Link href="/" className="text-2xl font-bold tracking-[0.3em] text-stone-900 hover:text-stone-700 transition-colors duration-300">
              NiSANTASI
            </Link>
          </div>

          {/* Sağ İkonlar */}
          <div className="flex items-center space-x-2">
            <button className="text-stone-600 hover:text-stone-900 transition-all duration-200 p-2.5 hover:bg-stone-50 rounded-full">
              <FiSearch className="h-5 w-5" />
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-stone-600 hover:text-stone-900 transition-all duration-200 p-2.5 hover:bg-stone-50 rounded-full flex items-center space-x-1"
              >
                <FiUser className="h-5 w-5" />
                {session && <FiChevronDown className={`h-3 w-3 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />}
              </button>
              
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-20 animate-in fade-in-up duration-300">
                    {session ? (
                      <>
                        <div className="px-4 py-3 border-b border-stone-200">
                          <p className="text-sm font-semibold text-stone-900">
                            {session.user?.name || 'Kullanıcı'}
                          </p>
                          <p className="text-xs text-stone-500">
                            {session.user?.email}
                          </p>
                        </div>
                        <Link
                          href="/hesabim"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiUser className="h-4 w-4" />
                          <span>Hesabım</span>
                        </Link>
                        <Link
                          href="/siparislerim"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiShoppingBag className="h-4 w-4" />
                          <span>Siparişlerim</span>
                        </Link>
                        <Link
                          href="/favoriler"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiHeart className="h-4 w-4" />
                          <span>Favorilerim</span>
                        </Link>
                        <Link
                          href="/ayarlar"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiSettings className="h-4 w-4" />
                          <span>Ayarlar</span>
                        </Link>
                        <hr className="my-2 border-stone-200" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                        >
                          <FiLogOut className="h-4 w-4" />
                          <span>Çıkış Yap</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/giris"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiLogIn className="h-4 w-4" />
                          <span>Giriş Yap</span>
                        </Link>
                        <Link
                          href="/kayit-ol"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FiUserPlus className="h-4 w-4" />
                          <span>Hesap Oluştur</span>
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <Link 
              href="/favoriler"
              className="hidden sm:block text-stone-600 hover:text-stone-900 transition-all duration-200 relative p-2.5 hover:bg-stone-50 rounded-full"
            >
              <FiHeart className="h-5 w-5" />
              {mounted && favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                  {favoriteCount > 99 ? '99+' : favoriteCount}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleCart}
              className="text-stone-600 hover:text-stone-900 transition-all duration-200 relative p-2.5 hover:bg-stone-50 rounded-full"
            >
              <FiShoppingBag className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4 animate-in fade-in-up duration-300">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/tum-urunler" 
                className="text-stone-600 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TÜM ÜRÜNLER
              </Link>
              <Link 
                href="/outlet" 
                className="text-stone-600 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                OUTLET
              </Link>
              <Link 
                href="/hakkimizda" 
                className="text-stone-600 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HAKKIMIZDA
              </Link>
              <Link 
                href="/iletisim" 
                className="text-stone-600 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İLETİŞİM
              </Link>
              <hr className="border-stone-200" />
              {!session ? (
                <>
                  <Link 
                    href="/giris" 
                    className="text-stone-600 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 hover:translate-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GİRİŞ YAP
                  </Link>
                  <Link 
                    href="/kayit-ol" 
                    className="text-stone-700 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 hover:translate-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    HESAP OLUŞTUR
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="text-stone-700 hover:text-stone-900 transition-all duration-300 text-sm font-medium tracking-wide px-2 py-1 text-left hover:translate-x-2"
                >
                  ÇIKIŞ YAP
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 