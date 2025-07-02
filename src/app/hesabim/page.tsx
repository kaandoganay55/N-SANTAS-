'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3, FiSave, FiX, FiShield, FiKey, FiSettings, FiPackage, FiHeart, FiCreditCard, FiLoader, FiCheck, FiAlertCircle, FiCamera } from 'react-icons/fi';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  bio: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };
  socialMedia: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

export default function HesabimPage() {
  const { data: session, status } = useSession();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    bio: '',
    avatar: '',
    address: {
      street: '',
      city: '',
      district: '',
      postalCode: '',
      country: 'Türkiye'
    },
    socialMedia: {
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });

  const [tempData, setTempData] = useState<UserData>(userData);

  // Load user profile data
  useEffect(() => {
    if (status === 'authenticated') {
      loadUserProfile();
    }
  }, [status]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      
      if (data.success && data.data) {
        const profileData = {
          name: data.data.name || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
          birthDate: data.data.birthDate || '',
          gender: data.data.gender || '',
          bio: data.data.bio || '',
          avatar: data.data.avatar || '',
          address: {
            street: data.data.address?.street || '',
            city: data.data.address?.city || '',
            district: data.data.address?.district || '',
            postalCode: data.data.address?.postalCode || '',
            country: data.data.address?.country || 'Türkiye'
          },
          socialMedia: {
            instagram: data.data.socialMedia?.instagram || '',
            twitter: data.data.socialMedia?.twitter || '',
            linkedin: data.data.socialMedia?.linkedin || ''
          }
        };
        setUserData(profileData);
        setTempData(profileData);
      }
    } catch (error) {
      console.error('Profile load error:', error);
      setError('Profil bilgileri yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setTempData(userData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');
      
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserData(tempData);
        setIsEditing(false);
        setSuccessMessage('Profil başarıyla güncellendi');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.error || 'Profil güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('Profile save error:', error);
      setError('Profil güncellenirken hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
    setError('');
  };

  const handleChange = (field: string, value: string) => {
    const fieldParts = field.split('.');
    
    if (fieldParts.length === 1) {
      setTempData(prev => ({ ...prev, [field]: value }));
    } else if (fieldParts.length === 2) {
      const [parentField, childField] = fieldParts;
      
      if (parentField === 'address') {
        setTempData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [childField]: value
          }
        }));
      } else if (parentField === 'socialMedia') {
        setTempData(prev => ({
          ...prev,
          socialMedia: {
            ...prev.socialMedia,
            [childField]: value
          }
        }));
      }
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      setError('');
      
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserData(prev => ({ ...prev, avatar: data.avatarUrl }));
        setTempData(prev => ({ ...prev, avatar: data.avatarUrl }));
        setSuccessMessage('Profil fotoğrafı başarıyla güncellendi');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.error || 'Fotoğraf yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      setError('Fotoğraf yüklenirken hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="h-8 w-8 animate-spin text-stone-600 mx-auto mb-4" />
          <p className="text-stone-600">Profil yükleniyor...</p>
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
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Hesabım</h1>
          <p className="text-xl text-stone-600">Profil bilgilerinizi yönetin ve hesap ayarlarınızı düzenleyin</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 text-red-500 mr-2" />
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
              <div className="text-center mb-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt="Profil" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-stone-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
                      <FiUser className="h-10 w-10 text-stone-600" />
                    </div>
                  )}
                  
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-stone-900 text-white p-2 rounded-full cursor-pointer hover:bg-stone-800 transition-colors">
                    <FiCamera className="h-3 w-3" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={isSaving}
                  />
                </div>
                <h3 className="text-xl font-semibold text-stone-900">{userData.name || 'İsim belirtilmemiş'}</h3>
                <p className="text-stone-600">{userData.email}</p>
                {userData.bio && (
                  <p className="text-sm text-stone-500 mt-2">{userData.bio}</p>
                )}
              </div>

              <nav className="space-y-2">
                <div className="bg-stone-50 text-stone-900 px-4 py-3 rounded-2xl font-medium flex items-center space-x-3">
                  <FiUser className="h-5 w-5" />
                  <span>Profil Bilgileri</span>
                </div>
                <Link href="/siparislerim" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiPackage className="h-5 w-5" />
                  <span>Siparişlerim</span>
                </Link>
                <Link href="/adreslerim" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiMapPin className="h-5 w-5" />
                  <span>Adreslerim</span>
                </Link>
                <Link href="/favoriler" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiHeart className="h-5 w-5" />
                  <span>Favorilerim</span>
                </Link>
                <Link href="/ayarlar" className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-3 rounded-2xl transition-colors duration-200 flex items-center space-x-3">
                  <FiSettings className="h-5 w-5" />
                  <span>Ayarlar</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Information */}
            <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-stone-900">Profil Bilgileri</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200 disabled:opacity-50"
                  >
                    <FiEdit3 className="h-4 w-4" />
                    <span>Düzenle</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center space-x-2 px-4 py-2 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-colors duration-200 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <FiLoader className="h-4 w-4 animate-spin" />
                      ) : (
                        <FiSave className="h-4 w-4" />
                      )}
                      <span>Kaydet</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex items-center space-x-2 px-4 py-2 bg-stone-200 text-stone-700 rounded-2xl hover:bg-stone-300 transition-colors duration-200 disabled:opacity-50"
                    >
                      <FiX className="h-4 w-4" />
                      <span>İptal</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ad Soyad */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Ad Soyad</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                      <FiUser className="h-5 w-5 text-stone-600" />
                      <span className="text-stone-900">{userData.name || 'Belirtilmemiş'}</span>
                    </div>
                  )}
                </div>

                {/* E-posta */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">E-posta</label>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                    <FiMail className="h-5 w-5 text-stone-600" />
                    <span className="text-stone-900">{userData.email}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">E-posta adresinizi değiştirmek için destek ekibiyle iletişime geçin.</p>
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Telefon</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                      <FiPhone className="h-5 w-5 text-stone-600" />
                      <span className="text-stone-900">{userData.phone || 'Belirtilmemiş'}</span>
                    </div>
                  )}
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Doğum Tarihi</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={tempData.birthDate}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                      <FiCalendar className="h-5 w-5 text-stone-600" />
                      <span className="text-stone-900">
                        {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Cinsiyet */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Cinsiyet</label>
                  {isEditing ? (
                    <select
                      value={tempData.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                    >
                      <option value="">Seçiniz</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Belirtmek istemiyorum</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                      <FiUser className="h-5 w-5 text-stone-600" />
                      <span className="text-stone-900">
                        {userData.gender === 'male' ? 'Erkek' : 
                         userData.gender === 'female' ? 'Kadın' : 
                         userData.gender === 'other' ? 'Belirtmek istemiyorum' : 'Belirtilmemiş'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Şehir */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Şehir</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.address.city}
                      onChange={(e) => handleChange('address.city', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="Şehir"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                      <FiMapPin className="h-5 w-5 text-stone-600" />
                      <span className="text-stone-900">{userData.address.city || 'Belirtilmemiş'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Hakkımda</label>
                {isEditing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900 resize-none"
                    placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  />
                ) : (
                  <div className="px-4 py-3 bg-stone-50 rounded-2xl">
                    <span className="text-stone-900">{userData.bio || 'Henüz bir açıklama eklenmemiş.'}</span>
                  </div>
                )}
              </div>

              {/* Adres */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Adres</label>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={tempData.address.street}
                      onChange={(e) => handleChange('address.street', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="Sokak/Cadde"
                    />
                    <input
                      type="text"
                      value={tempData.address.district}
                      onChange={(e) => handleChange('address.district', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="İlçe"
                    />
                    <input
                      type="text"
                      value={tempData.address.postalCode}
                      onChange={(e) => handleChange('address.postalCode', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="Posta Kodu"
                    />
                    <input
                      type="text"
                      value={tempData.address.country}
                      onChange={(e) => handleChange('address.country', e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent text-stone-900"
                      placeholder="Ülke"
                    />
                  </div>
                ) : (
                  <div className="flex items-start space-x-3 px-4 py-3 bg-stone-50 rounded-2xl">
                    <FiMapPin className="h-5 w-5 text-stone-600 mt-0.5" />
                    <div className="text-stone-900">
                      {userData.address.street && (
                        <div>{userData.address.street}</div>
                      )}
                      {(userData.address.district || userData.address.city) && (
                        <div>{userData.address.district} {userData.address.city}</div>
                      )}
                      {userData.address.postalCode && (
                        <div>{userData.address.postalCode} {userData.address.country}</div>
                      )}
                      {!userData.address.street && !userData.address.city && (
                        <span>Adres bilgisi belirtilmemiş</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 text-center">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPackage className="h-6 w-6 text-stone-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">--</div>
                <p className="text-stone-600">Toplam Sipariş</p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 text-center">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="h-6 w-6 text-stone-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">--</div>
                <p className="text-stone-600">Favori Ürün</p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6 text-center">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="h-6 w-6 text-stone-600" />
                </div>
                <div className="text-2xl font-bold text-stone-900 mb-1">--</div>
                <p className="text-stone-600">Kayıtlı Adres</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 