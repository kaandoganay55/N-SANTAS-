import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

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
      role: 'user',
      orders: [],
      favorites: [],
      addresses: []
    };

    const result = await db.collection('users').insertOne(user);

    if (result.insertedId) {
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return NextResponse.json(
        { 
          message: 'Hesap başarıyla oluşturuldu',
          user: { ...userWithoutPassword, _id: result.insertedId }
        },
        { status: 201 }
      );
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