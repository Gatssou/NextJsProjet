import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateResetToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Cherche l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    // SÉCURITÉ : Ne jamais révéler si l'email existe ou non
    // Toujours renvoyer le même message
    if (!user) {
      return NextResponse.json({
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
      });
    }

    // Génère le token
    const token = await generateResetToken(user.id);

    // Envoie l'email
    await sendPasswordResetEmail(user.email, token);

    return NextResponse.json({
      message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
    });

  } catch (error) {
    console.error('Erreur forgot-password:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}