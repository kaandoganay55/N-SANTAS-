'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingBag, FiPlus } from 'react-icons/fi';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors?: string[];
  category?: string;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  originalPrice, 
  images, 
  colors = [],
  category = ''
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoriteStore();
  const { addItem } = useCartStore();
  
  // Hydration sorununu önlemek için
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isInFavorites = mounted ? isFavorite(id) : false;

  const formatPrice = (price: number) => {
    return `₺ ${price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInFavorites) {
      removeFromFavorites(id);
    } else {
      addToFavorites({
        id,
        name,
        price,
        originalPrice,
        images,
        colors,
        category
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      image: images[0] || '/default-product.jpg',
      quantity: 1,
      size: 38, // Default size
      color: colors[selectedColor] || '#000000'
    });
  };

  return (
    <div 
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/urun/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden">
          {/* Product Image */}
          <div className="h-full w-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-105">
            <span className="text-stone-400 text-lg font-medium">Ürün Resmi</span>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 ${
              isInFavorites 
                ? 'bg-rose-500 text-white shadow-rose-200' 
                : 'bg-white/90 backdrop-blur-sm text-stone-600 hover:bg-white hover:text-rose-500'
            }`}
          >
            <FiHeart className={`h-4 w-4 ${isInFavorites ? 'fill-current' : ''}`} />
          </button>

          {/* Discount Badge */}
          {originalPrice && (
            <div className="absolute top-4 left-4">
              <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                -%{Math.round(((originalPrice - price) / originalPrice) * 100)}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Product Name */}
          <h3 className="font-semibold text-stone-900 text-sm mb-3 line-clamp-2 leading-relaxed group-hover:text-stone-700 transition-colors duration-300">
            {name}
          </h3>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              {originalPrice && (
                <span className="text-stone-400 line-through text-xs">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span className="font-bold text-stone-900 text-base">
                {formatPrice(price)}
              </span>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-stone-800 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>

          {/* Colors */}
          {colors.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-medium text-stone-600 uppercase tracking-wide">Renk Seçenekleri</p>
              <div className="flex space-x-2">
                {colors.slice(0, 4).map((color, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColor(index);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125 hover:shadow-lg ${
                      selectedColor === index 
                        ? 'border-stone-800 shadow-md scale-110' 
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {colors.length > 4 && (
                  <div className="w-6 h-6 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:bg-stone-200 hover:border-stone-400">
                    <span className="text-xs font-bold text-stone-600">+{colors.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
} 