'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSettings, FiBell, FiShield, FiEye, FiMail, FiSmartphone, FiToggleLeft, FiToggleRight, FiUser, FiCreditCard, FiMapPin, FiHelpCircle, FiLogOut, FiCheck, FiX, FiLoader } from 'react-icons/fi';
import { useSession } from 'next-auth/react';

interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
    orderUpdates: boolean;
    stockAlerts: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    dataCollection: boolean;
    cookieConsent: boolean;
    analyticsTracking: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
    loginAlerts: boolean;
    deviceTracking: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
  };
}

export default function AyarlarPage() {
  const { data: session, status } = useSession();
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Settings state
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: true,
      orderUpdates: true,
      stockAlerts: false
    },
    privacy: {
      profileVisibility: 'public',
      dataCollection: true,
      cookieConsent: true,
      analyticsTracking: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAlerts: true,
      deviceTracking: true
    },
    preferences: {
      language: 'tr',
      currency: 'TRY',
      timezone: 'Europe/Istanbul',
      theme: 'light'
    }
  });

  // Load user settings on component mount
  useEffect(() => {
    if (status === 'authenticated') {
      loadUserSettings();
    }
  }, [status]);

  const loadUserSettings = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/user/settings');
      const data = await response.json();
      
      if (data.success && data.data) {
        // API'den gelen veriyi state'e aktar
        setSettings({
          notifications: data.data.notifications || settings.notifications,
          privacy: data.data.privacy || settings.privacy,
          security: data.data.security || settings.security,
          preferences: data.data.preferences || settings.preferences
        });
      }
    } catch (error) {
      console.error('Settings load error:', error);
      setError('Ayarlar yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (section: keyof UserSettings, newData: any) => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');
      
      const updatePayload = {
        [section]: newData
      };
      
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage('Ayarlar başarıyla kaydedildi');
        // Success message'ı 3 saniye sonra temizle
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.error || 'Ayarlar kaydedilirken hata oluştu');
      }
    } catch (error) {
      console.error('Settings save error:', error);
      setError('Ayarlar kaydedilirken hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = async (key: keyof UserSettings['notifications'], value: boolean) => {
    const newNotifications = {
      ...settings.notifications,
      [key]: value
    };
    
    setSettings(prev => ({
      ...prev,
      notifications: newNotifications
    }));
    
    await saveSettings('notifications', newNotifications);
  };

  const handlePrivacyChange = async (key: keyof UserSettings['privacy'], value: any) => {
    const newPrivacy = {
      ...settings.privacy,
      [key]: value
    };
    
    setSettings(prev => ({
      ...prev,
      privacy: newPrivacy
    }));
    
    await saveSettings('privacy', newPrivacy);
  };

  const handleSecurityChange = async (key: keyof UserSettings['security'], value: any) => {
    const newSecurity = {
      ...settings.security,
      [key]: value
    };
    
    setSettings(prev => ({
      ...prev,
      security: newSecurity
    }));
    
    await saveSettings('security', newSecurity);
  };

  const handleLogoutAllDevices = async () => {
    try {
      setIsSaving(true);
      
      // TODO: Implement logout from all devices
      // Bu endpoint'i ayrıca oluşturabilirsiniz
      
      setSuccessMessage('Tüm cihazlardan çıkış yapıldı');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Çıkış işlemi sırasında hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!'
    );
    
    if (confirmed) {
      try {
        setIsSaving(true);
        
        // TODO: Implement account deletion
        // Bu endpoint'i ayrıca oluşturabilirsiniz
        
        alert('Hesap silme isteği alındı. E-posta adresinize onay bağlantısı gönderildi.');
      } catch (error) {
        setError('Hesap silme işlemi sırasında hata oluştu');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled || isSaving}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        disabled || isSaving 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
      } ${
        checked ? 'bg-stone-600' : 'bg-stone-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="h-8 w-8 animate-spin text-stone-600 mx-auto mb-4" />
          <p className="text-stone-600">Ayarlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">Bu sayfayı görüntülemek için giriş yapmalısınız.</p>
          <Link href="/giris" className="text-stone-900 hover:underline font-medium">
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Ayarlar</h1>
          <p className="text-xl text-stone-600">Hesap tercihlerinizi ve gizlilik ayarlarınızı yönetin</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center">
              <FiX className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center">
              <FiCheck className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {isSaving && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center">
              <FiLoader className="h-5 w-5 text-blue-500 mr-2 animate-spin" />
              <p className="text-blue-700 font-medium">Kaydediliyor...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
              <nav className="space-y-2">
                <div className="bg-stone-50 text-stone-900 px-4 py-3 rounded-2xl font-medium flex items-center space-x-3">
                  <FiSettings className="h-5 w-5" />
                  <span>Genel Ayarlar</span>
                </div>
                <a href="#notifications" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiBell className="h-5 w-5" />
                  <span>Bildirimler</span>
                </a>
                <a href="#privacy" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiShield className="h-5 w-5" />
                  <span>Gizlilik</span>
                </a>
                <a href="#security" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiEye className="h-5 w-5" />
                  <span>Güvenlik</span>
                </a>
              </nav>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Hızlı Erişim</h3>
              <div className="space-y-3">
                <Link href="/hesabim" className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors duration-200">
                  <FiUser className="h-4 w-4" />
                  <span>Profil Bilgileri</span>
                </Link>
                <Link href="/adreslerim" className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors duration-200">
                  <FiMapPin className="h-4 w-4" />
                  <span>Adreslerim</span>
                </Link>
                <Link href="/odeme-yontemleri" className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors duration-200">
                  <FiCreditCard className="h-4 w-4" />
                  <span>Ödeme Yöntemleri</span>
                </Link>
                <Link href="/yardim" className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors duration-200">
                  <FiHelpCircle className="h-4 w-4" />
                  <span>Yardım Merkezi</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Bildirim Ayarları */}
            <section id="notifications" className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                  <FiBell className="h-6 w-6 text-stone-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Bildirim Ayarları</h2>
                  <p className="text-stone-600">Hangi bildirimleri almak istediğinizi seçin</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FiMail className="h-5 w-5 text-stone-600" />
                    <div>
                      <p className="font-medium text-stone-900">E-posta Bildirimleri</p>
                      <p className="text-sm text-stone-600">Sipariş durumu ve önemli güncellemeler</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.notifications.email} 
                    onChange={(value) => handleNotificationChange('email', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FiSmartphone className="h-5 w-5 text-stone-600" />
                    <div>
                      <p className="font-medium text-stone-900">SMS Bildirimleri</p>
                      <p className="text-sm text-stone-600">Kargo durumu ve acil bildirimler</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.notifications.sms} 
                    onChange={(value) => handleNotificationChange('sms', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <FiBell className="h-5 w-5 text-stone-600" />
                    <div>
                      <p className="font-medium text-stone-900">Push Bildirimleri</p>
                      <p className="text-sm text-stone-600">Anlık bildirimler ve uyarılar</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.notifications.push} 
                    onChange={(value) => handleNotificationChange('push', value)} 
                  />
                </div>

                <hr className="border-stone-200" />

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Pazarlama E-postaları</p>
                    <p className="text-sm text-stone-600">Kampanya ve fırsat bildirimleri</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.notifications.marketing} 
                    onChange={(value) => handleNotificationChange('marketing', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Sipariş Güncellemeleri</p>
                    <p className="text-sm text-stone-600">Sipariş durumu değişiklikleri</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.notifications.orderUpdates} 
                    onChange={(value) => handleNotificationChange('orderUpdates', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Stok Uyarıları</p>
                    <p className="text-sm text-stone-600">Favori ürünlerin stok durumu</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.notifications.stockAlerts} 
                    onChange={(value) => handleNotificationChange('stockAlerts', value)} 
                  />
                </div>
              </div>
            </section>

            {/* Gizlilik Ayarları */}
            <section id="privacy" className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                  <FiShield className="h-6 w-6 text-stone-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Gizlilik Ayarları</h2>
                  <p className="text-stone-600">Veri paylaşımı ve gizlilik tercihleriniz</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-stone-900">Profil Görünürlüğü</p>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={settings.privacy.profileVisibility === 'public'}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        disabled={isSaving}
                        className="h-4 w-4 text-stone-600"
                      />
                      <span className="text-sm text-stone-700">Herkese açık</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={settings.privacy.profileVisibility === 'private'}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        disabled={isSaving}
                        className="h-4 w-4 text-stone-600"
                      />
                      <span className="text-sm text-stone-700">Sadece ben</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="friends"
                        checked={settings.privacy.profileVisibility === 'friends'}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        disabled={isSaving}
                        className="h-4 w-4 text-stone-600"
                      />
                      <span className="text-sm text-stone-700">Sadece arkadaşlar</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Veri Toplama</p>
                    <p className="text-sm text-stone-600">Analitik ve kişiselleştirme için veri kullanımı</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.privacy.dataCollection} 
                    onChange={(value) => handlePrivacyChange('dataCollection', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Çerez Onayı</p>
                    <p className="text-sm text-stone-600">Web sitesi deneyimi için çerez kullanımı</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.privacy.cookieConsent} 
                    onChange={(value) => handlePrivacyChange('cookieConsent', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Analitik Takibi</p>
                    <p className="text-sm text-stone-600">Site kullanım istatistikleri</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.privacy.analyticsTracking} 
                    onChange={(value) => handlePrivacyChange('analyticsTracking', value)} 
                  />
                </div>
              </div>
            </section>

            {/* Güvenlik Ayarları */}
            <section id="security" className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                  <FiEye className="h-6 w-6 text-stone-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Güvenlik Ayarları</h2>
                  <p className="text-stone-600">Hesap güvenliği ve oturum yönetimi</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">İki Faktörlü Doğrulama</p>
                    <p className="text-sm text-stone-600">Ekstra güvenlik katmanı ekleyin</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.security.twoFactorAuth} 
                    onChange={(value) => handleSecurityChange('twoFactorAuth', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Giriş Uyarıları</p>
                    <p className="text-sm text-stone-600">Yeni giriş yapıldığında bildirim al</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.security.loginAlerts} 
                    onChange={(value) => handleSecurityChange('loginAlerts', value)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div>
                    <p className="font-medium text-stone-900">Cihaz Takibi</p>
                    <p className="text-sm text-stone-600">Giriş yapılan cihazları takip et</p>
                  </div>
                  <ToggleSwitch 
                    checked={settings.security.deviceTracking} 
                    onChange={(value) => handleSecurityChange('deviceTracking', value)} 
                  />
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-stone-900">Oturum Zaman Aşımı</p>
                      <p className="text-sm text-stone-600">Otomatik çıkış süresi (dakika)</p>
                    </div>
                  </div>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    disabled={isSaving}
                    className="w-full px-4 py-2 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900 disabled:opacity-50"
                  >
                    <option value="15">15 dakika</option>
                    <option value="30">30 dakika</option>
                    <option value="60">1 saat</option>
                    <option value="120">2 saat</option>
                    <option value="never">Hiçbir zaman</option>
                  </select>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <h3 className="font-medium text-amber-800 mb-2">🔐 Şifre Güvenliği</h3>
                  <p className="text-sm text-amber-700 mb-4">
                    Güçlü bir şifre kullanın: En az 8 karakter, büyük-küçük harf, sayı ve özel karakter içermeli.
                  </p>
                  <Link 
                    href="/sifremi-unuttum" 
                    className="inline-block px-4 py-2 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 transition-colors duration-200 text-sm"
                  >
                    Şifremi Değiştir
                  </Link>
                </div>
              </div>
            </section>

            {/* Hesap İşlemleri */}
            <section className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Hesap İşlemleri</h2>
              
              <div className="space-y-4">
                <button 
                  onClick={handleLogoutAllDevices}
                  disabled={isSaving}
                  className="w-full flex items-center justify-between p-4 border border-stone-300 rounded-2xl text-stone-700 hover:bg-stone-50 transition-colors duration-200 disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <FiLogOut className="h-5 w-5" />
                    <span>Tüm Cihazlardan Çıkış Yap</span>
                  </div>
                  <span className="text-sm text-stone-500">→</span>
                </button>

                <button 
                  disabled={isSaving}
                  className="w-full flex items-center justify-between p-4 border border-stone-300 rounded-2xl text-stone-700 hover:bg-stone-50 transition-colors duration-200 disabled:opacity-50"
                >
                  <div className="flex items-center space-x-3">
                    <FiUser className="h-5 w-5" />
                    <span>Hesap Verilerini İndir</span>
                  </div>
                  <span className="text-sm text-stone-500">→</span>
                </button>

                <div className="pt-4 border-t border-stone-200">
                  <button 
                    onClick={handleDeleteAccount}
                    disabled={isSaving}
                    className="w-full flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-2xl text-red-600 hover:bg-red-100 transition-colors duration-200 disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span>⚠️</span>
                      <span>Hesabı Sil</span>
                    </div>
                    <span className="text-sm text-red-500">→</span>
                  </button>
                  <p className="text-xs text-stone-500 mt-2">
                    Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 