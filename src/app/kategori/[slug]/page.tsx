'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiStar } from 'react-icons/fi';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Klasik Siyah Deri Babet',
    price: 899.90,
    originalPrice: 1199.90,
    images: ['/product-1.jpg'],
    colors: ['#000000', '#1f2937', '#374151'],
    category: 'babet',
    sizes: ['36', '37', '38', '39', '40'],
    inStock: true,
    isNew: false,
    rating: 4.5,
    reviewCount: 127
  },
  {
    id: '2',
    name: 'Beyaz Minimal Babet',
    price: 799.90,
    originalPrice: 999.90,
    images: ['/product-2.jpg'],
    colors: ['#ffffff', '#f9fafb'],
    category: 'babet',
    sizes: ['35', '36', '37', '38', '39'],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Gri Klasik Babet',
    price: 699.90,
    originalPrice: 899.90,
    images: ['/product-4.jpg'],
    colors: ['#6b7280', '#4b5563'],
    category: 'babet',
    sizes: ['36', '37', '38', '39'],
    inStock: false,
    isNew: false,
    rating: 4.3,
    reviewCount: 78
  },
  {
    id: '4',
    name: 'Siyah Oxford Deri Ayakkabı',
    price: 1599.90,
    images: ['/product-3.jpg'],
    colors: ['#000000', '#1f2937'],
    category: 'oxford',
    sizes: ['38', '39', '40', '41', '42'],
    inStock: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: '5',
    name: 'Kahverengi Oxford Ayakkabı',
    price: 1799.90,
    images: ['/product-6.jpg'],
    colors: ['#6b4423', '#8b5a2b'],
    category: 'oxford',
    sizes: ['39', '40', '41', '42', '43'],
    inStock: true,
    isNew: false,
    rating: 4.6,
    reviewCount: 92
  },
  {
    id: '6',
    name: 'Siyah Evening Heels',
    price: 1299.90,
    originalPrice: 1599.90,
    images: ['/product-5.jpg'],
    colors: ['#000000', '#111827'],
    category: 'topuklu',
    sizes: ['35', '36', '37', '38', '39', '40'],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 203
  }
];

const categoryData = {
  'babet': {
    title: 'Babet Ayakkabılar',
    description: 'Şıklık ve konforun buluştuğu, günlük kullanım için ideal babet modelleri',
    heroText: 'Her anınıza uygun, zarif ve rahat babet koleksiyonumuzla stilinizi tamamlayın.'
  },
  'oxford': {
    title: 'Oxford Ayakkabılar',
    description: 'Klasik ve modern tasarımların birleştiği, profesyonel görünüm için oxford modelleri',
    heroText: 'İş hayatından sosyal etkinliklere kadar her ortamda güven veren oxford ayakkabılar.'
  },
  'topuklu': {
    title: 'Topuklu Ayakkabılar',
    description: 'Özel günleriniz için zarif ve şık topuklu ayakkabı modelleri',
    heroText: 'Kadınlığınızı öne çıkaran, her adımda zarafet katan topuklu ayakkabılar.'
  },
  'terlik': {
    title: 'Terlik Modelleri',
    description: 'Ev rahatlığını yaşatan, konforlu terlik çeşitleri',
    heroText: 'Ev konforunuzun vazgeçilmezi, yumuşak ve rahat terlik modelleri.'
  },
  'sandalet': {
    title: 'Sandalet Koleksiyonu',
    description: 'Yaz aylarının vazgeçilmezi, ferah ve şık sandalet modelleri',
    heroText: 'Sıcak günlerde ayaklarınızın nefes almasını sağlayan, trend sandalet tasarımları.'
  },
  'spor': {
    title: 'Spor Ayakkabılar',
    description: 'Aktif yaşamınızın destekçisi, konforlu spor ayakkabı modelleri',
    heroText: 'Spor aktivitelerinden günlük kullanıma kadar her an için uygun, dayanıklı tasarımlar.'
  }
};

const priceRanges = [
  { key: 'all', label: 'Tüm Fiyatlar', min: 0, max: Infinity },
  { key: '0-500', label: '0 - 500 ₺', min: 0, max: 500 },
  { key: '500-1000', label: '500 - 1.000 ₺', min: 500, max: 1000 },
  { key: '1000-1500', label: '1.000 - 1.500 ₺', min: 1000, max: 1500 },
  { key: '1500+', label: '1.500 ₺ +', min: 1500, max: Infinity }
];

const sortOptions = [
  { key: 'relevance', label: 'Önerilen' },
  { key: 'newest', label: 'En Yeniler' },
  { key: 'priceLow', label: 'Fiyat: Düşükten Yükseğe' },
  { key: 'priceHigh', label: 'Fiyat: Yüksekten Düşüğe' },
  { key: 'rating', label: 'En Yüksek Puan' },
  { key: 'popular', label: 'En Popüler' }
];

export default function KategoriPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showOnlyOnSale, setShowOnlyOnSale] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const currentCategory = categoryData[categorySlug as keyof typeof categoryData];

  // Kategori ürünlerini filtrele
  useEffect(() => {
    const categoryProducts = allProducts.filter(product => product.category === categorySlug);
    setProducts(categoryProducts);
  }, [categorySlug]);

  // Filtreleme ve sıralama
  useEffect(() => {
    let filtered = products.filter(product => {
      // Fiyat filtresi
      const priceRange = priceRanges.find(range => range.key === selectedPriceRange);
      if (priceRange && (product.price < priceRange.min || product.price > priceRange.max)) {
        return false;
      }

      // Beden filtresi
      if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) {
        return false;
      }

      // Stok filtresi
      if (showOnlyInStock && !product.inStock) {
        return false;
      }

      // İndirim filtresi
      if (showOnlyOnSale && !product.originalPrice) {
        return false;
      }

      // Yeni ürün filtresi
      if (showOnlyNew && !product.isNew) {
        return false;
      }

      return true;
    });

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popular':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedPriceRange, selectedSizes, showOnlyInStock, showOnlyOnSale, showOnlyNew, sortBy]);

  const clearAllFilters = () => {
    setSelectedPriceRange('all');
    setSelectedSizes([]);
    setShowOnlyInStock(false);
    setShowOnlyOnSale(false);
    setShowOnlyNew(false);
  };

  const hasActiveFilters = selectedPriceRange !== 'all' || selectedSizes.length > 0 || 
    showOnlyInStock || showOnlyOnSale || showOnlyNew;

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Kategori Bulunamadı</h1>
          <p className="text-stone-600 mb-8">Aradığınız kategori mevcut değil.</p>
          <Link 
            href="/tum-urunler" 
            className="px-6 py-3 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200"
          >
            Tüm Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">{currentCategory.title}</h1>
            <p className="text-xl text-stone-300 mb-4 max-w-3xl mx-auto">
              {currentCategory.heroText}
            </p>
            <p className="text-stone-400">{filteredProducts.length} ürün bulundu</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-stone-300 rounded-2xl text-stone-700 hover:bg-stone-50 transition-colors duration-200"
            >
              <FiFilter className="h-4 w-4" />
              <span>Filtreler</span>
              <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="mb-6">
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                  >
                    <span>Filtreleri Temizle</span>
                  </button>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">Fiyat Aralığı</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.key}
                      onClick={() => setSelectedPriceRange(range.key)}
                      className={`w-full text-left px-3 py-2 rounded-2xl transition-colors duration-200 ${
                        selectedPriceRange === range.key
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-stone-900 mb-4">Beden</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['35', '36', '37', '38', '39', '40', '41', '42', '43'].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        if (selectedSizes.includes(size)) {
                          setSelectedSizes(selectedSizes.filter(s => s !== size));
                        } else {
                          setSelectedSizes([...selectedSizes, size]);
                        }
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-2xl transition-colors duration-200 ${
                        selectedSizes.includes(size)
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showOnlyInStock}
                    onChange={(e) => setShowOnlyInStock(e.target.checked)}
                    className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                  />
                  <span className="text-stone-700">Sadece stokta olanlar</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showOnlyOnSale}
                    onChange={(e) => setShowOnlyOnSale(e.target.checked)}
                    className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                  />
                  <span className="text-stone-700">Sadece indirimliler</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showOnlyNew}
                    onChange={(e) => setShowOnlyNew(e.target.checked)}
                    className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                  />
                  <span className="text-stone-700">Sadece yeni ürünler</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-stone-600">Sırala:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-2xl transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <FiGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-2xl transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <FiList className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-12 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiFilter className="h-8 w-8 text-stone-600" />
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-4">Ürün bulunamadı</h3>
                <p className="text-stone-600 mb-8">
                  Bu kategoride seçili filtrelerinize uygun ürün bulunamadı.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center">
                        <span className="text-stone-400 text-sm">IMG</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">{product.name}</h3>
                        <div className="flex items-center space-x-4 mb-3">
                          {product.originalPrice && (
                            <span className="text-stone-400 line-through">
                              ₺{product.originalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </span>
                          )}
                          <span className="text-lg font-bold text-stone-900">
                            ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </span>
                          {!product.inStock && (
                            <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">
                              Stokta Yok
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-stone-600">
                          {product.rating && (
                            <div className="flex items-center space-x-1">
                              <FiStar className="h-4 w-4 fill-current text-stone-400" />
                              <span>{product.rating}</span>
                              <span>({product.reviewCount} değerlendirme)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 