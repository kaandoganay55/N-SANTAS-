'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiSearch, FiX, FiClock, FiTrendingUp } from 'react-icons/fi';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  category: string;
  description?: string;
  inStock: boolean;
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
    description: 'Günlük kullanım için ideal, konforlu siyah deri babet',
    inStock: true
  },
  {
    id: '2',
    name: 'Beyaz Minimal Babet',
    price: 799.90,
    originalPrice: 999.90,
    images: ['/product-2.jpg'],
    colors: ['#ffffff', '#f9fafb'],
    category: 'babet',
    description: 'Minimalist tasarım, beyaz renk babet ayakkabı',
    inStock: true
  },
  {
    id: '3',
    name: 'Siyah Oxford Deri Ayakkabı',
    price: 1599.90,
    images: ['/product-3.jpg'],
    colors: ['#000000', '#1f2937'],
    category: 'oxford',
    description: 'Profesyonel görünüm için klasik oxford ayakkabı',
    inStock: true
  },
  {
    id: '4',
    name: 'Gri Klasik Babet',
    price: 699.90,
    originalPrice: 899.90,
    images: ['/product-4.jpg'],
    colors: ['#6b7280', '#4b5563'],
    category: 'babet',
    description: 'Şık gri renkte, her kombine uygun babet',
    inStock: false
  },
  {
    id: '5',
    name: 'Siyah Evening Heels',
    price: 1299.90,
    originalPrice: 1599.90,
    images: ['/product-5.jpg'],
    colors: ['#000000', '#111827'],
    category: 'topuklu',
    description: 'Özel geceler için zarif topuklu ayakkabı',
    inStock: true
  }
];

const popularSearches = [
  'siyah babet',
  'oxford ayakkabı',
  'topuklu ayakkabı',
  'beyaz ayakkabı',
  'deri ayakkabı',
  'klasik babet',
  'minimal ayakkabı',
  'iş ayakkabısı'
];

export default function AramaPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // URL'den arama parametresini al
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  // Son aramaları localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Arama önerilerini oluştur
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = allProducts
        .filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(product => product.name)
        .slice(0, 5);
      
      const popularFiltered = popularSearches
        .filter(search => search.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3);
      
      setSuggestions([...filtered, ...popularFiltered]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const performSearch = (query: string) => {
    setIsSearching(true);
    
    // Simüle edilmiş arama gecikmesi
    setTimeout(() => {
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      setShowSuggestions(false);
      
      // Son aramalara ekle
      if (query.trim()) {
        const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Ürün Arama</h1>
          <p className="text-xl text-stone-600">Aradığınız ürünü bulun</p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün, kategori veya marka ara..."
                className="w-full pl-16 pr-16 py-6 text-lg border border-stone-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900 placeholder-stone-400 shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 transition-colors duration-200"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-xl border border-stone-100 z-10">
                <div className="p-4">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 rounded-2xl hover:bg-stone-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <FiSearch className="h-4 w-4 text-stone-400" />
                      <span className="text-stone-700">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Content */}
        {!searchQuery && searchResults.length === 0 ? (
          /* Default State */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Popular Searches */}
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FiTrendingUp className="h-6 w-6 text-stone-600" />
                <h2 className="text-2xl font-bold text-stone-900">Popüler Aramalar</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="px-4 py-3 bg-stone-50 hover:bg-stone-100 rounded-2xl text-stone-700 text-left transition-colors duration-200"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <FiClock className="h-6 w-6 text-stone-600" />
                    <h2 className="text-2xl font-bold text-stone-900">Son Aramalar</h2>
                  </div>
                  <button
                    onClick={clearRecentSearches}
                    className="text-stone-600 hover:text-stone-900 text-sm transition-colors duration-200"
                  >
                    Temizle
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.slice(0, 8).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-4 py-3 hover:bg-stone-50 rounded-2xl text-stone-700 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <FiClock className="h-4 w-4 text-stone-400" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : isSearching ? (
          /* Loading State */
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-600">Aranıyor...</p>
          </div>
        ) : (
          /* Search Results */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-stone-900">
                "{searchQuery}" için {searchResults.length} sonuç bulundu
              </h2>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-12 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="h-8 w-8 text-stone-600" />
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-4">Sonuç bulunamadı</h3>
                <p className="text-stone-600 mb-8">
                  "{searchQuery}" aramanız için sonuç bulunamadı. Farklı bir arama terimi deneyin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearSearch}
                    className="px-6 py-3 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200"
                  >
                    Yeni Arama
                  </button>
                  <button
                    onClick={() => handleSuggestionClick('babet')}
                    className="px-6 py-3 border border-stone-300 text-stone-700 rounded-2xl hover:bg-stone-50 transition-colors duration-200"
                  >
                    Tüm Babetleri Gör
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 