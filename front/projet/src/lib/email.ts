// Option 1 : Avec Resend (recommandé, gratuit jusqu'à 3000 emails/mois)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: 'noreply@tondomaine.com',
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Réinitialisation de mot de passe</h2>
              <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
              <p>Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #2563eb; color: white; padding: 12px 30px; 
                          text-decoration: none; border-radius: 5px; display: inline-block;">
                  Réinitialiser mon mot de passe
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                Ce lien expirera dans 30 minutes.<br>
                Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px;">
                Si le bouton ne fonctionne pas, copiez ce lien :<br>
                <a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
              </p>
            </div>
          </body>
        </html>
      `
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}

// Option 2 : Avec Nodemailer (si tu as ton propre SMTP)
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
  try {
    await transporter.sendMail({
      from: '"Ton App" <noreply@tonapp.com>',
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: // ... même HTML que ci-dessus
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error };
  }
}
*/