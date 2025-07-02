# NiSANTASI - Modern E-Ticaret Sitesi

Bu proje, gösterilen modern e-ticaret tasarımından esinlenerek Next.js 14 App Router, TypeScript, Tailwind CSS kullanılarak geliştirilmiş modern bir ayakkabı e-ticaret sitesidir.

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler
- **Modern UI Tasarım**: Görseldeki minimalist ve şık tasarım anlayışı
- **Responsive Design**: Mobil ve desktop uyumlu tasarım
- **Header Navigasyon**: Logo, menü ve kullanıcı işlemleri
- **Ürün Kartları**: Hover efektleri ve renk seçenekleri
- **Ürün Detay Sayfası**: Görseldeki tasarıma uygun detay sayfası
- **Beden ve Renk Seçimi**: İnteraktif ürün seçenekleri
- **Fiyat Gösterimi**: İndirimli fiyat ve orijinal fiyat
- **Sepet Yönetimi**: Zustand ile state management
- **Sepet Drawer**: Yan panelde sepet görüntüleme ve düzenleme
- **NextAuth Entegrasyonu**: Credentials provider ile kullanıcı sistemi
- **MongoDB Bağlantısı**: Veritabanı hazır altyapı
- **Geliştirilmiş Renk Tonları**: Stone/warm gray tonları ve premium görünüm

### 🔧 Teknoloji Stack
- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **İkonlar**: React Icons (Feather Icons)
- **Animasyonlar**: CSS transitions ve transforms
- **Şifreleme**: bcryptjs

### 📋 Yapılacaklar
- **Giriş/Kayıt Sayfaları**: UI tasarımı ve işlevsellik
- **Ürün Filtreleme**: Kategori, fiyat, renk filtreleri
- **Arama Fonksiyonu**: Elasticsearch entegrasyonu
- **Ödeme Sistemi**: Stripe/Iyzico entegrasyonu
- **Admin Panel**: Ürün yönetimi
- **Kullanıcı Profili**: Sipariş geçmişi ve adres yönetimi
- **Wishlist**: Favori ürünler sistemi

## 🏃‍♂️ Başlangıç

### Gereksinimler
- Node.js 18+ 
- MongoDB (local veya Atlas)
- npm veya yarn

### Kurulum

1. Projeyi klonlayın veya indirin
2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables dosyasını oluşturun:
```bash
# .env.local dosyası oluşturun
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
MONGODB_URI=mongodb://localhost:27017/e-ticaret-modern
```

4. Development server'ı başlatın:
```bash
npm run dev
```

5. Tarayıcınızda `http://localhost:3000` adresini açın

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── layout.tsx              # Ana layout
│   ├── page.tsx                # Ana sayfa
│   ├── globals.css             # Global CSS ve custom styles
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts    # NextAuth API route
│   └── urun/
│       └── [id]/
│           └── page.tsx        # Ürün detay sayfası
├── components/
│   ├── Header.tsx              # Header komponenti
│   ├── ProductCard.tsx         # Ürün kartı komponenti
│   └── CartDrawer.tsx          # Sepet drawer komponenti
├── store/
│   └── cartStore.ts            # Zustand sepet store'u
└── lib/
    └── mongodb.ts              # MongoDB bağlantısı
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renk**: Stone/Warm Gray tonları (#fafaf9 - #1c1917)
- **Vurgu Renkleri**: Emerald (#10b981), Blue, Pink
- **Premium Görünüm**: Soft shadows ve glassmorphism efektleri

### Typography
- **Ana Font**: System UI/Segoe UI stack
- **Logo**: Bold, harfli aralık (letter-spacing)
- **Başlıklar**: Font-bold, stone-900
- **Fiyatlar**: Font-bold/semibold

### UI Bileşenleri
- **Butonlar**: Rounded-xl köşeler, hover efektleri
- **Kartlar**: Soft shadows, rounded-2xl
- **İkonlar**: Feather Icons seti
- **Grid**: Responsive grid sistem
- **Animasyonlar**: Smooth transitions ve hover efektleri

## 🛒 Sepet Sistemi

### Özellikler
- **Local Storage**: Zustand persist middleware
- **Ürün Varyantları**: Beden ve renk kombinasyonları
- **Miktar Yönetimi**: Artırma/azaltma ve silme
- **Drawer Interface**: Yan panelde sepet görüntüleme
- **Fiyat Hesaplama**: Otomatik toplam ve indirim hesabı

### Kullanım
```typescript
// Sepete ürün ekleme
const { addItem, openCart } = useCartStore();

addItem({
  id: 'product-id',
  name: 'Ürün Adı',
  price: 899.90,
  size: 38,
  color: 'Mavi',
  image: '/product.jpg'
});
```

## 🔐 Authentication

### Konfigürasyon
- **Provider**: Credentials (email/password)
- **Adapter**: MongoDB adapter
- **Session**: JWT strategy
- **Şifreleme**: bcryptjs hash

### Kullanım
```typescript
// pages/api/auth/[...nextauth].ts
// Credentials provider ile giriş
// MongoDB'de kullanıcı doğrulama
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection (gelecek)
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  images: [String],
  sizes: [Number],
  colors: [Object],
  category: String,
  stock: Number,
  createdAt: Date
}
```

## 📱 Responsive Tasarım

- **Mobile**: 320px+ (1 sütun)
- **Tablet**: 768px+ (2 sütun)
- **Desktop**: 1024px+ (3-4 sütun)
- **Large Desktop**: 1280px+ (4+ sütun)

## 🔧 Geliştirme Notları

### Environment Variables
```bash
# Gerekli environment variables
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/e-ticaret-modern
```

### Önemli Komutlar
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Linting
npm run lint
```

## 🚧 Gelecek Güncellemeler

1. **Authentication UI**: Giriş/kayıt sayfaları
2. **Product API**: CRUD operasyonları
3. **Search & Filter**: Elasticsearch
4. **Payment**: Stripe/Iyzico
5. **Admin Dashboard**: Yönetim paneli
6. **Email**: Transactional emails
7. **Analytics**: Google Analytics
8. **SEO**: Meta tags ve sitemap

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
