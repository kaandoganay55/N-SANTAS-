import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// User settings interface
interface UserSettings {
  userId: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
    orderUpdates: boolean;
    stockAlerts: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    dataCollection: boolean;
    cookieConsent: boolean;
    analyticsTracking: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
    loginAlerts: boolean;
    deviceTracking: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
  };
  updatedAt: Date;
  createdAt: Date;
}

// GET - Kullanıcı ayarlarını getir
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
    
    // Kullanıcının ID'sini bul
    const user = await db.collection('users').findOne({ 
      email: session.user.email 
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Kullanıcı ayarlarını getir
    let settings = await db.collection('userSettings').findOne({ 
      userId: user._id.toString() 
    });

    // Eğer ayarlar yoksa varsayılan ayarları oluştur
    if (!settings) {
      const defaultSettings: Omit<UserSettings, '_id'> = {
        userId: user._id.toString(),
        notifications: {
          email: true,
          sms: false,
          push: true,
          marketing: true,
          orderUpdates: true,
          stockAlerts: false
        },
        privacy: {
          profileVisibility: 'public',
          dataCollection: true,
          cookieConsent: true,
          analyticsTracking: true
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: '30',
          loginAlerts: true,
          deviceTracking: true
        },
        preferences: {
          language: 'tr',
          currency: 'TRY',
          timezone: 'Europe/Istanbul',
          theme: 'light'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await db.collection('userSettings').insertOne(defaultSettings);
      settings = { _id: result.insertedId, ...defaultSettings };
    }

    return NextResponse.json({
      success: true,
      data: settings
    });

  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { error: 'Ayarlar getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}

// PUT - Kullanıcı ayarlarını güncelle
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
    const { notifications, privacy, security, preferences } = body;

    const client = await clientPromise;
    const db = client.db('e-ticaret');
    
    // Kullanıcının ID'sini bul
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

    if (notifications) updateData.notifications = notifications;
    if (privacy) updateData.privacy = privacy;
    if (security) updateData.security = security;
    if (preferences) updateData.preferences = preferences;

    // Ayarları güncelle
    const result = await db.collection('userSettings').updateOne(
      { userId: user._id.toString() },
      { $set: updateData },
      { upsert: true }
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return NextResponse.json(
        { error: 'Ayarlar güncellenemedi' },
        { status: 400 }
      );
    }

    // Güncellenmiş ayarları getir
    const updatedSettings = await db.collection('userSettings').findOne({ 
      userId: user._id.toString() 
    });

    return NextResponse.json({
      success: true,
      message: 'Ayarlar başarıyla güncellendi',
      data: updatedSettings
    });

  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json(
      { error: 'Ayarlar güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// DELETE - Kullanıcı ayarlarını sıfırla (varsayılana döndür)
export async function DELETE(request: NextRequest) {
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
    
    // Kullanıcının ID'sini bul
    const user = await db.collection('users').findOne({ 
      email: session.user.email 
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Ayarları sil
    await db.collection('userSettings').deleteOne({ 
      userId: user._id.toString() 
    });

    return NextResponse.json({
      success: true,
      message: 'Ayarlar başarıyla sıfırlandı'
    });

  } catch (error) {
    console.error('Settings DELETE error:', error);
    return NextResponse.json(
      { error: 'Ayarlar sıfırlanırken hata oluştu' },
      { status: 500 }
    );
  }
} 