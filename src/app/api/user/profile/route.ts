import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

// User profile interface
interface UserProfile {
  _id?: string;
  email: string;
  name: string;
  phone?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
  bio?: string;
  address?: {
    street?: string;
    city?: string;
    district?: string;
    postalCode?: string;
    country?: string;
  };
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  updatedAt: Date;
  createdAt: Date;
}

// GET - Kullanıcı profil bilgilerini getir
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Kullanıcı bilgilerini getir (şifre hariç)
    const user = await db.collection('users').findOne(
      { email: session.user.email },
      { 
        projection: { 
          password: 0 // Şifreyi döndürme
        } 
      }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { error: 'Profil bilgileri getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT - Kullanıcı profil bilgilerini güncelle
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      name, 
      phone, 
      birthDate, 
      gender, 
      avatar, 
      bio, 
      address, 
      socialMedia,
      currentPassword,
      newPassword 
    } = body;

    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Kullanıcıyı bul
    const user = await db.collection('users').findOne({ 
      email: session.user.email 
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Güncelleme için veri hazırla
    const updateData: any = {
      updatedAt: new Date()
    };

    // Temel bilgileri güncelle
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (birthDate !== undefined) updateData.birthDate = birthDate;
    if (gender !== undefined) updateData.gender = gender;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (bio !== undefined) updateData.bio = bio;
    if (address !== undefined) updateData.address = address;
    if (socialMedia !== undefined) updateData.socialMedia = socialMedia;

    // Şifre değişikliği varsa
    if (currentPassword && newPassword) {
      // Mevcut şifreyi kontrol et
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Mevcut şifreniz hatalı' },
          { status: 400 }
        );
      }

      // Yeni şifreyi hash'le
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      updateData.password = hashedNewPassword;
    }

    // E-posta değişikliği kontrolü
    if (body.email && body.email !== session.user.email) {
      // E-posta zaten kullanılıyor mu kontrol et
      const existingUser = await db.collection('users').findOne({ 
        email: body.email,
        _id: { $ne: user._id }
      });
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Bu e-posta adresi zaten kullanılıyor' },
          { status: 400 }
        );
      }
      
      updateData.email = body.email;
      updateData.emailVerified = false; // E-posta değiştiğinde doğrulama sıfırla
    }

    // Profili güncelle
    const result = await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Profil güncellenemedi' },
        { status: 400 }
      );
    }

    // Güncellenmiş profili getir (şifre hariç)
    const updatedUser = await db.collection('users').findOne(
      { email: updateData.email || session.user.email },
      { 
        projection: { 
          password: 0 
        } 
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      data: updatedUser
    });

  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json(
      { error: 'Profil güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - Avatar yükleme
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Dosya boyutu çok büyük (max 5MB)' },
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Sadece resim dosyaları yüklenebilir' },
        { status: 400 }
      );
    }

    // TODO: Burada dosyayı bir storage servisine (AWS S3, Cloudinary vs.) yükleyin
    // Şimdilik base64 olarak kaydediyoruz (production için önerilmez)
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const avatarUrl = `data:${file.type};base64,${base64}`;

    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Avatar URL'ini güncelle
    const result = await db.collection('users').updateOne(
      { email: session.user.email },
      { 
        $set: { 
          avatar: avatarUrl,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Avatar güncellenemedi' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Avatar başarıyla güncellendi',
      avatarUrl
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json(
      { error: 'Avatar yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
} 