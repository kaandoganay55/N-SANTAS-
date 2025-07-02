'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone, FiCheck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return false;
    }
    
    if (!acceptTerms) {
      setError('Kullanım şartlarını kabul etmelisiniz');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          acceptMarketing
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // E-posta doğrulama sayfasına yönlendir
        router.push(`/email-dogrulama?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(data.message || 'Kayıt oluşturulurken bir hata oluştu');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-[0.3em] text-stone-900 hover:text-stone-700 transition-colors">
              NiSANTASI
            </h1>
          </Link>
          <h2 className="mt-8 text-3xl font-bold text-stone-900">
            Hesap Oluşturun
          </h2>
          <p className="mt-3 text-stone-900 text-lg">
            Üye olun ve özel fırsatları kaçırmayın
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-stone-700 mb-2">
                  Ad *
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Adınız"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-stone-700 mb-2">
                  Soyad *
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                E-posta Adresi *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-2">
                Telefon Numarası
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="0XXX XXX XX XX"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-stone-700 mb-2">
                Şifre *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="En az 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-stone-700 mb-2">
                Şifre Tekrarı *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Şifrenizi tekrar girin"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-stone-600">
                    <Link href="/kullanim-sartlari" className="text-stone-600 hover:text-stone-900 font-medium">
                      Kullanım Şartları
                    </Link>
                    {' '}ve{' '}
                    <Link href="/gizlilik-politikasi" className="text-stone-600 hover:text-stone-900 font-medium">
                      Gizlilik Politikası
                    </Link>
                    {''}nı okudum ve kabul ediyorum. *
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptMarketing"
                    name="acceptMarketing"
                    type="checkbox"
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptMarketing" className="text-stone-600">
                    Kampanya ve özel teklifler hakkında e-posta almak istiyorum.
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-stone-900 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-stone-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Hesap oluşturuluyor...</span>
                </div>
              ) : (
                'HESAP OLUŞTUR'
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-stone-500">veya</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-stone-300 rounded-2xl text-stone-700 font-medium hover:bg-stone-50 hover:border-stone-400 transition-all duration-200">
                <div className="w-5 h-5 mr-3 bg-red-500 rounded"></div>
                Google ile kayıt ol
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-stone-300 rounded-2xl text-stone-700 font-medium hover:bg-stone-50 hover:border-stone-400 transition-all duration-200">
                <div className="w-5 h-5 mr-3 bg-blue-600 rounded"></div>
                Facebook ile kayıt ol
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-stone-600">
              Zaten hesabınız var mı?{' '}
              <Link
                href="/giris"
                className="text-stone-600 hover:text-stone-900 font-semibold"
              >
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <FiCheck className="h-6 w-6 text-stone-600" />
            </div>
            <p className="text-xs text-stone-600">Hızlı Üyelik</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-blue-600 font-bold">%</span>
            </div>
            <p className="text-xs text-stone-600">Özel İndirimler</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-purple-600 font-bold">★</span>
            </div>
            <p className="text-xs text-stone-600">VIP Ayrıcalıklar</p>
          </div>
        </div>
      </div>
    </div>
  );
} 