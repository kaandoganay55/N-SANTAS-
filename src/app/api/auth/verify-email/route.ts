import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// POST - Doğrulama kodunu kontrol et
export async function POST(request: NextRequest) {
  try {
    const { email, verificationCode } = await request.json();

    if (!email || !verificationCode) {
      return NextResponse.json(
        { error: 'E-posta ve doğrulama kodu gerekli' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Kullanıcıyı bul
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Doğrulama kodu kontrolü
    if (!user.verificationCode || !user.verificationCodeExpiry) {
      return NextResponse.json(
        { error: 'Doğrulama kodu bulunamadı veya süresi dolmuş' },
        { status: 400 }
      );
    }

    // Kod süresi kontrol et
    if (new Date() > new Date(user.verificationCodeExpiry)) {
      return NextResponse.json(
        { error: 'Doğrulama kodunun süresi dolmuş. Yeni kod talep edin.' },
        { status: 400 }
      );
    }

    // Kod eşleşme kontrolü
    if (user.verificationCode !== verificationCode) {
      return NextResponse.json(
        { error: 'Doğrulama kodu hatalı' },
        { status: 400 }
      );
    }

    // E-postayı doğrulanmış olarak işaretle
    await db.collection('users').updateOne(
      { email },
      { 
        $set: { 
          emailVerified: new Date(),
          updatedAt: new Date()
        },
        $unset: { 
          verificationCode: "",
          verificationCodeExpiry: ""
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'E-posta başarıyla doğrulandı'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Doğrulama işlemi sırasında hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT - Yeni doğrulama kodu gönder
export async function PUT(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'E-posta adresi gerekli' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Kullanıcıyı bul
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Zaten doğrulanmışsa
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'E-posta adresi zaten doğrulanmış' },
        { status: 400 }
      );
    }

    // Son kod gönderme zamanını kontrol et (rate limiting)
    if (user.lastVerificationSent) {
      const timeDiff = Date.now() - new Date(user.lastVerificationSent).getTime();
      if (timeDiff < 60000) { // 1 dakika
        return NextResponse.json(
          { error: 'Yeni kod için 1 dakika beklemelisiniz' },
          { status: 429 }
        );
      }
    }

    // Yeni doğrulama kodu oluştur
    const { generateVerificationCode, sendVerificationEmail } = await import('@/lib/email');
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika

    // E-posta gönder
    const emailResult = await sendVerificationEmail(email, verificationCode, user.name);
    
    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'E-posta gönderilirken hata oluştu' },
        { status: 500 }
      );
    }

    // Veritabanında güncelle
    await db.collection('users').updateOne(
      { email },
      { 
        $set: {
          verificationCode,
          verificationCodeExpiry,
          lastVerificationSent: new Date(),
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Yeni doğrulama kodu e-posta adresinize gönderildi'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Kod gönderme işlemi sırasında hata oluştu' },
      { status: 500 }
    );
  }
} 