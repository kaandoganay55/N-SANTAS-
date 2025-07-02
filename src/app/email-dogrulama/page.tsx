'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiCheck, FiAlertCircle, FiRefreshCw, FiArrowLeft, FiClock, FiShield } from 'react-icons/fi';

export default function EmailDogrulamaPage() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 dakika
  const [email, setEmail] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push('/kayit-ol');
    }
  }, [searchParams, router]);

  // Geri sayım timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Yeniden gönderme cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Sonraki input'a odaklan
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Lütfen 6 haneli doğrulama kodunu girin');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          verificationCode: code
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('E-posta adresiniz başarıyla doğrulandı! Giriş sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          router.push('/giris?verified=true');
        }, 1500);
      } else {
        setError(data.error || 'Doğrulama başarısız oldu');
        // Hatalı girişte kodları temizle
        setVerificationCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend || resendCooldown > 0) return;

    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Yeni doğrulama kodu gönderildi');
        setTimeLeft(900); // 15 dakika sıfırla
        setCanResend(false);
        setResendCooldown(60); // 1 dakika cooldown
        setVerificationCode(['', '', '', '', '', '']);
      } else {
        setError(data.error || 'Kod gönderilemedi');
      }
    } catch (error) {
      setError('Kod gönderilirken hata oluştu');
    } finally {
      setIsResending(false);
    }
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
            E-posta Doğrulama
          </h2>
          <p className="mt-3 text-stone-700 text-lg animate-fade-in delay-200">
            {email} adresine gönderilen 6 haneli kodu girin
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-slide-down">
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-slide-down">
            <div className="flex items-center">
              <FiCheck className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 text-sm font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Timer */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-stone-600 mb-4">
                <FiClock className="h-5 w-5" />
                <span className="text-lg font-mono">
                  {timeLeft > 0 ? formatTime(timeLeft) : 'Süre doldu'}
                </span>
              </div>
              {timeLeft === 0 && (
                <p className="text-red-600 text-sm">
                  Doğrulama kodunun süresi doldu. Yeni kod talep edin.
                </p>
              )}
            </div>

            {/* Code Input */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-stone-700 text-center">
                Doğrulama Kodu
              </label>
              <div className="flex justify-center space-x-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || verificationCode.join('').length !== 6}
              className="w-full bg-gradient-to-r from-stone-900 to-stone-800 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-stone-800 hover:to-stone-700 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Doğrulanıyor...</span>
                </div>
              ) : (
                'DOĞRULA'
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center space-y-3">
              <p className="text-stone-600">Kod gelmedi mi?</p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend || resendCooldown > 0 || isResending}
                className="text-stone-700 hover:text-stone-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                <FiRefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
                <span>
                  {resendCooldown > 0 
                    ? `Yeniden gönder (${resendCooldown}s)` 
                    : canResend 
                      ? 'Yeniden gönder' 
                      : 'Yeniden gönder'
                  }
                </span>
              </button>
            </div>
          </form>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-stone-200/50">
            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full flex items-center justify-center mx-auto">
                  <FiMail className="h-6 w-6 text-stone-600" />
                </div>
                <h3 className="font-medium text-stone-900">Spam Kontrolü</h3>
                <p className="text-xs text-stone-600">
                  E-posta gelmiyorsa spam klasörünüzü kontrol edin
                </p>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/kayit-ol"
              className="text-stone-600 hover:text-stone-900 font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>Kayıt sayfasına dön</span>
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-stone-50/80 backdrop-blur rounded-2xl p-4 border border-stone-200/50">
          <div className="flex items-center space-x-2">
            <FiShield className="h-4 w-4 text-stone-500" />
            <p className="text-xs text-stone-600">
              Güvenliğiniz için doğrulama kodu 15 dakika geçerlidir ve tek kullanımlıktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 