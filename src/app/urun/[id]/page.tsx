'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiHeart, FiTruck, FiRefreshCw, FiShield, FiStar, FiZoomIn, FiShare2, FiRotateCcw } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import FancyButton from '@/components/FancyButton';

// Örnek ürün verisi
const productData = {
  id: '1',
  name: 'JEREMİ BEBE MAVİ KIRIŞIK MAT KEMER DETAY DÜZ TABAN KADIN BABET',
  price: 899.90,
  originalPrice: 1199.90,
  images: [
    '/product-main-1.jpg',
    '/product-main-2.jpg',
    '/product-main-3.jpg',
    '/product-main-4.jpg'
  ],
  sizes: [36, 37, 38, 39, 40],
  colors: [
    { name: 'Bebe Mavi', color: '#87CEEB' },
    { name: 'Pembe', color: '#FFC0CB' },
    { name: 'Lila', color: '#DDA0DD' },
    { name: 'Yeşil', color: '#98FB98' },
    { name: 'Siyah', color: '#000000' }
  ],
  stock: 1,
  rating: 4.8,
  reviewCount: 127,
  description: 'RAHATLIK VE ŞIKLİK İÇİN TASARLANDI',
  features: [
    '%100 BİRİNCİ SINIF EL İŞÇİLİĞİ',
    'NEFES ALABİLİR DERİ MALZEME',
    'KAYMAZ TABAN TEKNOLOJISI',
    'ORTOPEDIK TABANI DESTEĞI'
  ],
  relatedProducts: [
    { id: '2', name: 'Benzer Model - Siyah', price: 799.90, image: '/related-1.jpg' },
    { id: '3', name: 'Benzer Model - Kahverengi', price: 849.90, image: '/related-2.jpg' },
    { id: '4', name: 'Benzer Model - Beyaz', price: 879.90, image: '/related-3.jpg' }
  ]
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addItem, openCart } = useCartStore();

  const formatPrice = (price: number) => {
    return `₺ ${price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
  };

  const discountPercentage = Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Lütfen bir beden seçin');
      return;
    }

    setIsAddingToCart(true);
    
    const cartItem = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      originalPrice: productData.originalPrice,
      image: productData.images[0] || '/placeholder.jpg',
      size: selectedSize,
      color: productData.colors[selectedColor].name,
      quantity: quantity
    };

    addItem(cartItem);
    
    setTimeout(() => {
      setIsAddingToCart(false);
      openCart();
    }, 800);
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Breadcrumb - Minimal */}
      <div className="border-b border-stone-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="text-sm">
            <ol className="flex items-center space-x-3 text-stone-500">
              <li><a href="/" className="hover:text-stone-900 transition-colors">Ana Sayfa</a></li>
              <li className="text-stone-300">•</li>
              <li><a href="/kadin" className="hover:text-stone-900 transition-colors">Kadın</a></li>
              <li className="text-stone-300">•</li>
              <li><a href="/kadin/babet" className="hover:text-stone-900 transition-colors">Babet</a></li>
              <li className="text-stone-300">•</li>
              <li className="text-stone-900 font-medium">Ürün Detayı</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Sol: Ürün Görselleri */}
          <div className="space-y-6">
            {/* Ana Görsel */}
            <div className="aspect-square bg-gradient-to-br from-stone-100/60 to-stone-200/40 rounded-3xl overflow-hidden relative group shadow-soft">
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-stone-400 text-2xl font-light">Ürün Resmi</span>
              </div>
              <button className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-medium opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110">
                <FiZoomIn className="h-5 w-5 text-stone-600" />
              </button>
            </div>
            
            {/* Thumbnail Görseller */}
            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gradient-to-br from-stone-100/60 to-stone-200/40 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover-lift ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-stone-900 shadow-medium scale-105' 
                      : 'hover:shadow-soft'
                  }`}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-stone-400 text-sm font-light">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sağ: Ürün Bilgileri */}
          <div className="space-y-10">
            {/* Başlık, Rating ve Fiyat */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(productData.rating) ? 'text-yellow-400 fill-current' : 'text-stone-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-600 font-medium">
                  {productData.rating} • {productData.reviewCount} değerlendirme
                </span>
              </div>
              
              {/* Başlık */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                {productData.name}
              </h1>
              
              {/* Fiyat */}
              <div className="space-y-3">
                {productData.originalPrice && (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="text-lg sm:text-xl text-stone-400 line-through font-light">
                      {formatPrice(productData.originalPrice)}
                    </span>
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-soft">
                      %{discountPercentage} İNDİRİM
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
                    {formatPrice(productData.price)}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    Stokta var
                  </span>
                </div>
              </div>
            </div>

            {/* Ürün Açıklaması */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                {productData.description}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-stone-900 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-stone-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beden Seçimi */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-stone-900">
                  Beden: {selectedSize || 'Seçiniz'}
                </h3>
                <button className="text-xs sm:text-sm text-stone-600 hover:text-stone-900 font-medium underline underline-offset-4 hover:no-underline transition-all">
                  Beden Rehberi
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 sm:py-3 px-2 sm:px-3 text-sm font-bold transition-all duration-300 hover:scale-105 hover-lift ${
                      selectedSize === size
                        ? 'bg-stone-900 text-white shadow-medium scale-105'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    } rounded-lg sm:rounded-xl`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Renk Seçimi */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-stone-900">
                Renk: {productData.colors[selectedColor].name}
              </h3>
              <div className="flex space-x-3">
                {productData.colors.map((colorOption, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110 hover-lift ${
                      selectedColor === index ? 'ring-4 ring-stone-900 ring-offset-2 scale-110 shadow-medium' : 'hover:shadow-soft'
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                    title={colorOption.name}
                  >
                    {selectedColor === index && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <span className="text-white text-sm sm:text-lg font-bold">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Miktar Seçimi */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-base sm:text-lg font-semibold text-stone-900">Miktar:</span>
                <div className="flex items-center bg-stone-100 rounded-lg sm:rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 sm:p-3 hover:bg-stone-200 transition-colors text-stone-600 hover:text-stone-900"
                  >
                    <FiMinus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <span className="px-4 sm:px-6 py-2 sm:py-3 font-bold text-lg sm:text-xl min-w-[60px] sm:min-w-[80px] text-center text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 sm:p-3 hover:bg-stone-200 transition-colors text-stone-600 hover:text-stone-900"
                  >
                    <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-emerald-100 px-3 sm:px-4 py-2 rounded-full">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-bold text-emerald-700">
                  Son {productData.stock} ürün
                </span>
              </div>
            </div>

            {/* Satın Alma Butonları */}
            <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-8">
              {/* Toplam Fiyat */}
              <div className="text-center py-3 sm:py-4">
                <p className="text-sm text-stone-600 mb-2">Toplam Tutar</p>
                <p className="text-3xl sm:text-4xl font-bold text-stone-900">
                  {formatPrice(productData.price * quantity)}
                </p>
                {productData.originalPrice && (
                  <p className="text-base sm:text-lg text-stone-400 line-through mt-1">
                    {formatPrice(productData.originalPrice * quantity)}
                  </p>
                )}
              </div>
              
              {/* Butonlar */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <FancyButton
                  onClick={handleBuyNow}
                  variant="dark"
                  className={`w-full sm:flex-1 ${!selectedSize || isAddingToCart ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isAddingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>İŞLENİYOR...</span>
                      </>
                    ) : (
                      <span>ŞİMDİ SATIN AL</span>
                    )}
                  </div>
                </FancyButton>
                
                <FancyButton
                  onClick={handleAddToCart}
                  variant="light"
                  className={`w-full sm:flex-1 bg-stone-100 hover:bg-stone-900 text-stone-900 hover:text-white border-stone-300 ${!selectedSize || isAddingToCart ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{isAddingToCart ? 'EKLENİYOR...' : 'SEPETE EKLE'}</span>
                  </div>
                </FancyButton>
                
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-3 sm:p-4 transition-all duration-300 hover:scale-110 hover-lift rounded-xl ${
                    isFavorite 
                      ? 'bg-red-100 text-red-600 shadow-soft' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <FiHeart className={`h-5 w-5 sm:h-6 sm:w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Güvenlik Badge'leri */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-stone-200">
                <div className="flex items-center space-x-2 text-stone-600">
                  <FiShield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Güvenli Ödeme</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-600">
                  <FiTruck className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Hızlı Teslimat</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-600">
                  <FiRotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Kolay İade</span>
                </div>
              </div>
            </div>

            {/* Avantajlar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8">
              <div className="flex items-center space-x-3 p-3 sm:p-4 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors">
                <FiTruck className="h-5 w-5 sm:h-6 sm:w-6 text-stone-700" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Ücretsiz Kargo</p>
                  <p className="text-stone-600 text-xs">1-2 gün teslimat</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 sm:p-4 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors">
                <FiRefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-stone-700" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">30 Gün İade</p>
                  <p className="text-stone-600 text-xs">Ücretsiz iade</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 sm:p-4 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors">
                <FiShield className="h-5 w-5 sm:h-6 sm:w-6 text-stone-700" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Güvenli Ödeme</p>
                  <p className="text-stone-600 text-xs">SSL koruması</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Renk Seçenekleri Bölümü */}
        <div className="mt-20 sm:mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8 sm:mb-16 text-center">
            Renk Seçenekleri
          </h2>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {productData.colors.map((colorOption, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden mb-3 sm:mb-4 transition-all duration-300 group-hover:shadow-medium hover-lift border border-stone-200">
                  <div 
                    className="h-full w-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{ backgroundColor: colorOption.color }}
                  >
                    <span className="text-white font-semibold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 px-2 sm:px-4 py-1 sm:py-2 rounded-full backdrop-blur-sm">
                      {colorOption.name}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-semibold text-stone-900 mb-1">{colorOption.name}</p>
                  <p className="text-xs text-stone-500">Aynı fiyat</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* İlgili Ürünler */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-stone-900 mb-12">Bu Ürünün Diğer Renkleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productData.relatedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group cursor-pointer animate-in fade-in-up duration-700 hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-stone-100/60 to-stone-200/40 rounded-3xl overflow-hidden mb-6 group-hover:shadow-medium transition-all duration-300 group-hover:scale-105">
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-stone-400 text-lg font-light">Ürün Resmi</span>
                  </div>
                </div>
                <h3 className="font-semibold text-stone-900 mb-3 group-hover:text-stone-700 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-stone-900">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 