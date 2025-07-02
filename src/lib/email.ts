import nodemailer from 'nodemailer';

// E-posta transporter yapılandırması
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Doğrulama kodu oluştur (6 haneli)
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Doğrulama e-postası gönder
export const sendVerificationEmail = async (
  email: string, 
  code: string, 
  name: string = 'Değerli Kullanıcı'
) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; background: #1f2937; color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; border: 2px dashed #1f2937; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
          .code { font-size: 32px; font-weight: bold; color: #1f2937; letter-spacing: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #1f2937; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NiSANTASI</h1>
            <h2>E-posta Doğrulama</h2>
          </div>
          <div class="content">
            <h3>Merhaba ${name}!</h3>
            <p>NiSANTASI'ye hoş geldiniz! Hesabınızı doğrulamak için aşağıdaki 6 haneli kodu kullanın:</p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <p><strong>Önemli Notlar:</strong></p>
            <ul>
              <li>Bu kod 15 dakika geçerlidir</li>
              <li>Kodu kimseyle paylaşmayın</li>
              <li>Bu e-postayı siz istemediyseniz dikkate almayın</li>
            </ul>
            
            <p>Sorularınız için bize ulaşabilirsiniz.</p>
            
            <div class="footer">
              <p>Bu e-posta NiSANTASI güvenlik sistemi tarafından otomatik olarak gönderilmiştir.</p>
              <p>&copy; 2024 NiSANTASI - Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"NiSANTASI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'NiSANTASI - E-posta Doğrulama Kodu',
      html: htmlContent,
      text: `Merhaba ${name}! NiSANTASI hesabınızı doğrulamak için şu kodu kullanın: ${code}. Bu kod 15 dakika geçerlidir.`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error };
  }
};

// Şifre sıfırlama e-postası gönder
export const sendPasswordResetEmail = async (
  email: string, 
  resetToken: string, 
  name: string = 'Değerli Kullanıcı'
) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.NEXTAUTH_URL}/sifremi-unuttum/reset?token=${resetToken}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; background: #1f2937; color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #1f2937; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NiSANTASI</h1>
            <h2>Şifre Sıfırlama</h2>
          </div>
          <div class="content">
            <h3>Merhaba ${name}!</h3>
            <p>Şifrenizi sıfırlamak için bir talepte bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" class="button">Şifremi Sıfırla</a>
            </div>
            
            <p><strong>Önemli:</strong> Bu link 1 saat geçerlidir ve sadece bir kez kullanılabilir.</p>
            <p>Eğer şifre sıfırlama talebinde bulunmadıysanız, bu e-postayı dikkate almayın.</p>
            
            <div class="footer">
              <p>Bu e-posta NiSANTASI güvenlik sistemi tarafından otomatik olarak gönderilmiştir.</p>
              <p>&copy; 2024 NiSANTASI - Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"NiSANTASI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'NiSANTASI - Şifre Sıfırlama',
      html: htmlContent,
      text: `Merhaba ${name}! Şifrenizi sıfırlamak için şu linke tıklayın: ${resetUrl} Bu link 1 saat geçerlidir.`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Password reset email error:', error);
    return { success: false, error: error };
  }
}; 