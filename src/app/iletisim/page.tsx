'use client';

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      alert('Mesajınız başarıyla gönderildi!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-stone-900 to-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            İLETİŞİM
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 leading-relaxed">
            Size nasıl yardımcı olabiliriz?
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* İletişim Bilgileri */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="h-8 w-8 text-stone-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Adres</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Nişantaşı Mahallesi<br />
                Teşvikiye Caddesi No: 123<br />
                Şişli / İstanbul
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Telefon</h3>
              <p className="text-stone-600">
                +90 212 123 45 67<br />
                +90 532 123 45 67
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">E-posta</h3>
              <p className="text-stone-600">
                info@nisantasi.com<br />
                destek@nisantasi.com
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="h-8 w-8 text-stone-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">Çalışma Saatleri</h3>
              <p className="text-stone-600 text-sm">
                Pazartesi - Cumartesi<br />
                09:00 - 20:00<br />
                Pazar: 11:00 - 18:00
              </p>
            </div>
          </div>
        </section>

        {/* İletişim Formu */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6">
                Bize Yazın
              </h2>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Sorularınız, önerileriniz veya şikayetleriniz için aşağıdaki formu kullanabilirsiniz. 
                En kısa sürede size dönüş yapacağız.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                    <FiMail className="h-6 w-6 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">7/24 E-posta Desteği</p>
                    <p className="text-stone-600">Mesajlarınıza 24 saat içinde yanıt veriyoruz</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiPhone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Telefon Desteği</p>
                    <p className="text-stone-600">Hafta içi 09:00-18:00 arasında ulaşabilirsiniz</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-stone-700 mb-2">
                    Konu *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Mesajınızın konusu"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 border border-stone-300 rounded-2xl placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                
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
                    <div className="flex items-center justify-center space-x-2">
                      <FiSend className="h-5 w-5" />
                      <span>MESAJ GÖNDER</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Harita ve Sosyal Medya */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="h-16 w-16 text-stone-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Mağaza Konumu</h3>
                <p className="text-stone-700">Nişantaşı'nın kalbinde</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-stone-900 mb-6">Sosyal Medya</h3>
                <p className="text-lg text-stone-600 mb-6">
                  Bizi sosyal medyada takip edin ve son koleksiyonlarımızdan haberdar olun.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white hover:bg-emerald-700 transition-colors duration-300 shadow-lg"
                >
                  <FiInstagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-stone-800 rounded-2xl flex items-center justify-center text-white hover:bg-stone-900 transition-colors duration-300 shadow-lg"
                >
                  <FiFacebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-stone-600 rounded-2xl flex items-center justify-center text-white hover:bg-stone-700 transition-colors duration-300 shadow-lg"
                >
                  <FiTwitter className="h-6 w-6" />
                </a>
              </div>
              
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <h4 className="font-semibold text-stone-900 mb-2">💡 İpucu</h4>
                <p className="text-stone-700 text-sm">
                  Acil durumlar için WhatsApp hattımızı kullanabilirsiniz: +90 532 123 45 67
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 