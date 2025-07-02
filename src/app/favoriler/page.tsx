'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingBag, FiX, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '@/components/ProductCard';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function FavorilerPage() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavoriteStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  // Hydration sorununu önlemek için
  useEffect(() => {
    setMounted(true);
  }, []);

  const removeFavorite = (productId: string) => {
    removeFromFavorites(productId);
  };

  const sortedAndFilteredFavorites = mounted ? favorites
    .filter(item => {
      if (filterBy === 'all') return true;
      if (filterBy === 'onSale') return item.originalPrice && item.originalPrice > item.price;
      return item.category === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case 'oldest':
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/hesabim" className="text-stone-600 hover:text-stone-900 transition-colors duration-200">
              ← Hesabıma Dön
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-stone-900 mb-2">Favorilerim</h1>
              <p className="text-xl text-stone-600">{favorites.length} ürün favorilerinizde</p>
            </div>
            
            {/* Clear All Button */}
            {mounted && favorites.length > 0 && (
              <button 
                onClick={() => clearFavorites()}
                className="flex items-center space-x-2 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors duration-200"
              >
                <FiX className="h-4 w-4" />
                <span>Tümünü Temizle</span>
              </button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-12 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="h-8 w-8 text-stone-600" />
            </div>
            <h3 className="text-2xl font-semibold text-stone-900 mb-4">Henüz favori ürününüz yok</h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <>
            {/* Filters and Controls */}
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Category Filter */}
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-2 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="babet">Babet</option>
                    <option value="oxford">Oxford</option>
                    <option value="topuklu">Topuklu</option>
                    <option value="onSale">İndirimli</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                  >
                    <option value="newest">En Yeni Eklenen</option>
                    <option value="oldest">En Eski Eklenen</option>
                    <option value="priceLow">Fiyat: Düşükten Yükseğe</option>
                    <option value="priceHigh">Fiyat: Yüksekten Düşüğe</option>
                    <option value="name">A-Z Sırala</option>
                  </select>
                </div>

                {/* View Mode */}
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
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedAndFilteredFavorites.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard {...product} />
                    
                    {/* Remove from Favorites Button */}
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-lg"
                    >
                      <FiX className="h-4 w-4 text-stone-600" />
                    </button>


                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {sortedAndFilteredFavorites.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center">
                        <span className="text-stone-400 text-sm">IMG</span>
                      </div>

                      {/* Product Info */}
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
                        </div>
                        <p className="text-sm text-stone-600">
                          Favorilere eklendi: {new Date(product.addedDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200">
                          <FiShoppingBag className="h-4 w-4" />
                          <span>Sepete Ekle</span>
                        </button>
                        <button
                          onClick={() => removeFavorite(product.id)}
                          className="p-2 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results Info */}
            <div className="mt-12 text-center">
              <p className="text-stone-600">
                {sortedAndFilteredFavorites.length} ürün gösteriliyor
                {filterBy !== 'all' && ` (${filterBy} filtresi aktif)`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 