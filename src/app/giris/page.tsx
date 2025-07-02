'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield, FiSmartphone, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<Date | null>(null);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  
  const router = useRouter();

  // Check for biometric availability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PublicKeyCredential' in window) {
      setBiometricAvailable(true);
    }
  }, []);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  // Rate limiting check
  const isRateLimited = () => {
    if (loginAttempts >= 3 && lastAttemptTime) {
      const timeDiff = Date.now() - lastAttemptTime.getTime();
      return timeDiff < 300000; // 5 minutes
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRateLimited()) {
      setError('Çok fazla deneme yaptınız. 5 dakika sonra tekrar deneyin.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        setLastAttemptTime(new Date());
        
        if (newAttempts >= 3) {
          setError('Güvenlik nedeniyle hesabınız geçici olarak kilitlendi. 5 dakika sonra tekrar deneyin.');
        } else {
          setError(`E-posta veya şifre hatalı. ${3 - newAttempts} deneme hakkınız kaldı.`);
        }
      } else {
        setShowSuccessMessage('Giriş başarılı! Yönlendiriliyorsunuz...');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      setLoginAttempts(prev => prev + 1);
      setLastAttemptTime(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!biometricAvailable) return;
    
    try {
      setIsLoading(true);
      // Simulated biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccessMessage('Biometric giriş başarılı!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      setError('Biometric giriş başarısız oldu.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-yellow-500';
    if (passwordStrength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Zayıf';
    if (passwordStrength <= 50) return 'Orta';
    if (passwordStrength <= 75) return 'İyi';
    return 'Güçlü';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-stone-900 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block group">
            <h1 className="text-4xl font-bold tracking-[0.3em] text-stone-900 hover:text-stone-700 transition-all duration-300 transform group-hover:scale-105">
              NiSANTASI
            </h1>
          </Link>
          <h2 className="mt-8 text-3xl font-bold text-stone-900 animate-fade-in">
            Hoş Geldiniz
          </h2>
          <p className="mt-3 text-stone-700 text-lg animate-fade-in delay-200">
            Hesabınıza giriş yapın
          </p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-slide-down">
            <div className="flex items-center">
              <FiCheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 text-sm font-medium">{showSuccessMessage}</p>
            </div>
          </div>
        )}

        {/* Form - Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50/80 backdrop-blur border border-red-200 rounded-2xl p-4 animate-shake">
                <div className="flex items-center">
                  <FiAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Security Status */}
            {loginAttempts > 0 && (
              <div className="bg-yellow-50/80 backdrop-blur border border-yellow-200 rounded-2xl p-4">
                <div className="flex items-center">
                  <FiShield className="h-5 w-5 text-yellow-500 mr-2" />
                  <p className="text-yellow-700 text-sm">
                    Güvenlik: {loginAttempts}/3 deneme yapıldı
                  </p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2 group-focus-within:text-stone-900 transition-colors">
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className={`h-5 w-5 transition-colors ${emailValid && email ? 'text-green-500' : 'text-stone-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur group-hover:bg-white/70"
                  placeholder="ornek@email.com"
                />
                {email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {emailValid ? (
                      <FiCheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <FiAlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold text-stone-700 mb-2 group-focus-within:text-stone-900 transition-colors">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur group-hover:bg-white/70"
                  placeholder="Şifrenizi girin"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Şifre gücü:</span>
                    <span className="font-medium">{getPasswordStrengthText()}</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Options */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded transition-all"
                  />
                  <label htmlFor="remember-me" className="ml-3 text-sm text-stone-600">
                    Beni hatırla
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="remember-device"
                    name="remember-device"
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded transition-all"
                  />
                  <label htmlFor="remember-device" className="ml-3 text-sm text-stone-600">
                    Bu cihazı güvenilir olarak işaretle
                  </label>
                </div>
              </div>
              <Link
                href="/sifremi-unuttum"
                className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors"
              >
                Şifremi unuttum
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isRateLimited()}
              className="w-full bg-gradient-to-r from-stone-900 to-stone-800 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-stone-800 hover:to-stone-700 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Giriş yapılıyor...</span>
                </div>
              ) : (
                'GİRİŞ YAP'
              )}
            </button>

            {/* Biometric Login */}
            {biometricAvailable && (
              <button
                type="button"
                onClick={handleBiometricLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-stone-700 to-stone-600 text-white py-3 px-6 rounded-2xl font-medium hover:from-stone-600 hover:to-stone-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <FiSmartphone className="h-5 w-5" />
                <span>Biometric ile Giriş</span>
              </button>
            )}
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-stone-500 font-medium">veya</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-stone-300/50 rounded-2xl text-stone-700 font-medium hover:bg-white/70 hover:border-stone-400 transition-all duration-300 bg-white/30 backdrop-blur transform hover:scale-[1.02]">
                <div className="w-5 h-5 mr-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                Google ile devam et
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-stone-300/50 rounded-2xl text-stone-700 font-medium hover:bg-white/70 hover:border-stone-400 transition-all duration-300 bg-white/30 backdrop-blur transform hover:scale-[1.02]">
                <div className="w-5 h-5 mr-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
                Facebook ile devam et
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-stone-600">
              Hesabınız yok mu?{' '}
              <Link
                href="/kayit-ol"
                className="text-stone-700 hover:text-stone-900 font-semibold transition-colors hover:underline"
              >
                Hesap oluşturun
              </Link>
            </p>
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <FiShield className="h-6 w-6 text-stone-600" />
            </div>
            <p className="text-xs text-stone-600 font-medium">256-bit Güvenlik</p>
          </div>
          <div className="space-y-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-blue-600 font-bold text-lg">%</span>
            </div>
            <p className="text-xs text-stone-600 font-medium">Özel İndirimler</p>
          </div>
          <div className="space-y-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-purple-600 font-bold text-lg">♥</span>
            </div>
            <p className="text-xs text-stone-600 font-medium">Kişisel Favoriler</p>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-stone-50/80 backdrop-blur rounded-2xl p-4 border border-stone-200/50">
          <div className="flex items-center space-x-2">
            <FiInfo className="h-4 w-4 text-stone-500" />
            <p className="text-xs text-stone-600">
              Güvenliğiniz için tüm veriler şifrelenir ve güvenli sunucularda saklanır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 