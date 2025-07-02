'use client';

import { useCartStore } from '@/store/cartStore';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems
  } = useCartStore();
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return `₺ ${price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-full">
              <FiShoppingBag className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Sepetim
              </h2>
              <p className="text-sm text-stone-600">
                {mounted ? getTotalItems() : 0} ürün
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-stone-200 rounded-full transition-all duration-300 hover:scale-110"
          >
            <FiX className="h-5 w-5 text-stone-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-32 h-32 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <FiShoppingBag className="h-12 w-12 text-stone-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">
                Sepetiniz boş
              </h3>
              <p className="text-stone-500 mb-8 leading-relaxed">
                Sepetinize ürün ekleyerek alışverişe başlayın
              </p>
              <button
                onClick={closeCart}
                className="bg-stone-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-stone-800 transition-all duration-300 hover:-translate-y-1 transform shadow-lg hover:shadow-xl"
              >
                Alışverişe Devam Et
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.size}-${item.color}`} 
                  className="bg-stone-50 rounded-2xl p-4 hover:bg-stone-100 transition-all duration-300 hover:shadow-md group"
                  style={{ 
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                        <span className="text-xs text-stone-500 font-medium">Resim</span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-stone-900 line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-xs text-stone-500 mb-3">
                        <span>Beden: {item.size}</span>
                        <span>•</span>
                        <span>Renk: {item.color}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.originalPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                          <span className="text-sm font-bold text-stone-900">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="p-1.5 hover:bg-stone-200 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <FiMinus className="h-3 w-3 text-stone-600" />
                          </button>
                          <span className="text-sm font-semibold min-w-[24px] text-center bg-white px-2 py-1 rounded-lg shadow-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="p-1.5 hover:bg-stone-200 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <FiPlus className="h-3 w-3 text-stone-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-300 self-start hover:scale-110"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 bg-stone-50 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-stone-900">Toplam:</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-stone-900">
                  {formatPrice(getTotalPrice())}
                </span>
                <p className="text-xs text-stone-500">KDV Dahil</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-stone-900 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
                Sepeti Görüntüle
              </button>
              <button className="w-full bg-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
                Hızlı Satın Al
              </button>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-xs text-stone-500">
                ✓ Ücretsiz kargo • ✓ 30 gün ücretsiz iade
              </p>
              <p className="text-xs text-stone-400">
                SSL güvenli ödeme sistemi
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CSS for fadeInUp animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
} 