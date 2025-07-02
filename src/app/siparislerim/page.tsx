'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiPackage, FiTruck, FiCheck, FiX, FiEye, FiRefreshCw, FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  shippingAddress: string;
  estimatedDelivery?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'NS2024001234',
    date: '2024-01-15',
    status: 'delivered',
    total: 1299.90,
    items: [
      {
        id: '1',
        name: 'Klasik Siyah Deri Babet',
        image: '/product-1.jpg',
        quantity: 1,
        price: 1299.90,
        size: '38'
      }
    ],
    shippingAddress: 'Teşvikiye Mah. Valikonağı Cad. No:45/7 Nişantaşı/İstanbul'
  },
  {
    id: '2',
    orderNumber: 'NS2024001235',
    date: '2024-01-20',
    status: 'shipped',
    total: 1899.80,
    items: [
      {
        id: '2',
        name: 'Beyaz Minimal Babet',
        image: '/product-2.jpg',
        quantity: 2,
        price: 949.90,
        size: '37'
      }
    ],
    shippingAddress: 'Teşvikiye Mah. Valikonağı Cad. No:45/7 Nişantaşı/İstanbul',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: '3',
    orderNumber: 'NS2024001236',
    date: '2024-01-22',
    status: 'processing',
    total: 2599.70,
    items: [
      {
        id: '3',
        name: 'Siyah Oxford Deri Ayakkabı',
        image: '/product-3.jpg',
        quantity: 1,
        price: 1599.90,
        size: '40'
      },
      {
        id: '4',
        name: 'Gri Klasik Babet',
        image: '/product-4.jpg',
        quantity: 1,
        price: 999.80,
        size: '38'
      }
    ],
    shippingAddress: 'Teşvikiye Mah. Valikonağı Cad. No:45/7 Nişantaşı/İstanbul',
    estimatedDelivery: '2024-01-28'
  }
];

const statusColors = {
  processing: 'bg-stone-100 text-stone-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-stone-800 text-white',
  cancelled: 'bg-stone-200 text-stone-600'
};

const statusLabels = {
  processing: 'Hazırlanıyor',
  shipped: 'Kargoda',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal Edildi'
};

const statusIcons = {
  processing: FiRefreshCw,
  shipped: FiTruck,
  delivered: FiCheck,
  cancelled: FiX
};

export default function SiparislerimPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [orders] = useState<Order[]>(mockOrders);

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

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
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Siparişlerim</h1>
          <p className="text-xl text-stone-600">Sipariş geçmişinizi görüntüleyin ve takip edin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Filtrele</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 ${
                    selectedStatus === 'all' 
                      ? 'bg-stone-50 text-stone-900 font-medium' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  Tüm Siparişler
                </button>
                <button
                  onClick={() => setSelectedStatus('processing')}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 ${
                    selectedStatus === 'processing' 
                      ? 'bg-stone-50 text-stone-900 font-medium' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  Hazırlanıyor
                </button>
                <button
                  onClick={() => setSelectedStatus('shipped')}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 ${
                    selectedStatus === 'shipped' 
                      ? 'bg-stone-50 text-stone-900 font-medium' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  Kargoda
                </button>
                <button
                  onClick={() => setSelectedStatus('delivered')}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 ${
                    selectedStatus === 'delivered' 
                      ? 'bg-stone-50 text-stone-900 font-medium' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  Teslim Edildi
                </button>
                <button
                  onClick={() => setSelectedStatus('cancelled')}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-colors duration-200 ${
                    selectedStatus === 'cancelled' 
                      ? 'bg-stone-50 text-stone-900 font-medium' 
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  İptal Edildi
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Hızlı İşlemler</h3>
              <div className="space-y-3">
                <Link 
                  href="/favoriler" 
                  className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  <FiPackage className="h-4 w-4" />
                  <span>Tekrar Sipariş Ver</span>
                </Link>
                <Link 
                  href="/iade-degisim" 
                  className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors duration-200"
                >
                  <FiRefreshCw className="h-4 w-4" />
                  <span>İade & Değişim</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="lg:col-span-3 space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-12 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPackage className="h-8 w-8 text-stone-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Henüz sipariş bulunamadı</h3>
                <p className="text-stone-600 mb-6">Bu kategoride henüz bir siparişiniz bulunmuyor.</p>
                <Link 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200"
                >
                  Alışverişe Başla
                </Link>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const StatusIcon = statusIcons[order.status];
                return (
                  <div key={order.id} className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
                    {/* Order Header */}
                    <div className="p-6 border-b border-stone-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                            <StatusIcon className="h-6 w-6 text-stone-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-stone-900">#{order.orderNumber}</h3>
                            <div className="flex items-center space-x-4 text-sm text-stone-600">
                              <div className="flex items-center space-x-1">
                                <FiCalendar className="h-4 w-4" />
                                <span>{new Date(order.date).toLocaleDateString('tr-TR')}</span>
                              </div>
                              <span>•</span>
                              <span>{order.items.length} ürün</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                          <div className="text-right">
                            <div className="text-lg font-bold text-stone-900">
                              ₺{order.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center">
                              <span className="text-stone-400 text-xs">IMG</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-stone-900">{item.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-stone-600">
                                <span>Beden: {item.size}</span>
                                <span>•</span>
                                <span>Adet: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-stone-900">
                                ₺{item.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Info */}
                      <div className="mt-6 pt-4 border-t border-stone-100">
                        <div className="flex items-start space-x-3">
                          <FiMapPin className="h-5 w-5 text-stone-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-stone-900">Teslimat Adresi</p>
                            <p className="text-sm text-stone-600">{order.shippingAddress}</p>
                            {order.estimatedDelivery && (
                              <p className="text-sm text-stone-600 mt-1">
                                Tahmini Teslimat: {new Date(order.estimatedDelivery).toLocaleDateString('tr-TR')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link 
                          href={`/siparis/${order.id}`}
                          className="flex items-center justify-center space-x-2 px-4 py-2 border border-stone-300 text-stone-700 rounded-2xl hover:bg-stone-50 transition-colors duration-200"
                        >
                          <FiEye className="h-4 w-4" />
                          <span>Sipariş Detayı</span>
                        </Link>
                        {order.status === 'shipped' && (
                          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-stone-300 text-stone-700 rounded-2xl hover:bg-stone-50 transition-colors duration-200">
                            <FiTruck className="h-4 w-4" />
                            <span>Kargo Takip</span>
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200">
                            <FiRefreshCw className="h-4 w-4" />
                            <span>Tekrar Sipariş Ver</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 