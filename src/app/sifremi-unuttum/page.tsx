'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Burada şifre sıfırlama API'si çağrılacak
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-25 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              E-posta Gönderildi
            </h2>
            <p className="text-stone-600 text-lg mb-8">
              <strong>{email}</strong> adresine şifre sıfırlama linki gönderildi. 
              E-postanızı kontrol edin.
            </p>
            <div className="space-y-4">
              <Link
                href="/giris"
                className="w-full bg-stone-900 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-stone-800 transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center"
              >
                Giriş Sayfasına Dön
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="w-full border-2 border-stone-300 text-stone-700 py-4 px-6 rounded-2xl font-semibold hover:bg-stone-50 hover:border-stone-400 transition-all duration-200"
              >
                Tekrar Gönder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-25 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-[0.3em] text-stone-900 hover:text-stone-700 transition-colors">
              NiSANTASI
            </h1>
          </Link>
          <h2 className="mt-8 text-3xl font-bold text-stone-900">
            Şifremi Unuttum
          </h2>
          <p className="mt-3 text-stone-600 text-lg">
            E-posta adresinizi girin, şifre sıfırlama linki gönderelim
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

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                E-posta Adresi
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Kayıtlı e-posta adresiniz"
                />
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Bu adrese şifre sıfırlama linki gönderilecektir
              </p>
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
                  <span>Gönderiliyor...</span>
                </div>
              ) : (
                'ŞİFRE SIFIRLAMA LİNKİ GÖNDER'
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href="/giris"
              className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>Giriş sayfasına geri dön</span>
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-stone-500">
            E-postanızı alamıyor musunuz? Spam klasörünü kontrol etmeyi unutmayın.
          </p>
        </div>
      </div>
    </div>
  );
} 