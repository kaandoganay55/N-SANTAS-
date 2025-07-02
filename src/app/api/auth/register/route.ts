import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, acceptMarketing } = await request.json();

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: 'Lütfen tüm zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      );
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi ile zaten bir hesap bulunmaktadır' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika

    // Create user
    const user = {
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phone: phone || '',
      password: hashedPassword,
      acceptMarketing: acceptMarketing || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: null,
      verificationCode,
      verificationCodeExpiry,
      lastVerificationSent: new Date(),
      role: 'user',
      orders: [],
      favorites: [],
      addresses: []
    };

    const result = await db.collection('users').insertOne(user);

    if (result.insertedId) {
      // Send verification email
      try {
        const emailResult = await sendVerificationEmail(email, verificationCode, `${firstName} ${lastName}`);
        
        if (emailResult.success) {
          // Remove password and verification info from response
          const { password: _, verificationCode: __, verificationCodeExpiry: ___, ...userWithoutSensitiveData } = user;
          
          return NextResponse.json(
            { 
              message: 'Hesap başarıyla oluşturuldu. E-posta adresinize doğrulama kodu gönderildi.',
              user: { ...userWithoutSensitiveData, _id: result.insertedId },
              emailSent: true
            },
            { status: 201 }
          );
        } else {
          // Email gönderilemedi ama hesap oluşturuldu
          const { password: _, verificationCode: __, verificationCodeExpiry: ___, ...userWithoutSensitiveData } = user;
          
          return NextResponse.json(
            { 
              message: 'Hesap oluşturuldu ancak doğrulama e-postası gönderilemedi. Daha sonra tekrar deneyebilirsiniz.',
              user: { ...userWithoutSensitiveData, _id: result.insertedId },
              emailSent: false,
              warning: 'E-posta gönderilirken bir sorun oluştu'
            },
            { status: 201 }
          );
        }
      } catch (emailError) {
        console.error('Email sending error during registration:', emailError);
        
        // Remove password and verification info from response
        const { password: _, verificationCode: __, verificationCodeExpiry: ___, ...userWithoutSensitiveData } = user;
        
        return NextResponse.json(
          { 
            message: 'Hesap oluşturuldu ancak doğrulama e-postası gönderilemedi.',
            user: { ...userWithoutSensitiveData, _id: result.insertedId },
            emailSent: false,
            warning: 'E-posta servisi geçici olarak kullanılamıyor'
          },
          { status: 201 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Hesap oluşturulurken bir hata oluştu' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 