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

    // Ne jamais révéler si l'email existe ou non
    if (!user) {
      return NextResponse.json({
        message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
      });
    }

    // Génère le token
    const token = await generateResetToken(user.id);

    // ✅ Correction TypeScript : email peut être null selon Prisma
    if (user.email) {
      await sendPasswordResetEmail(user.email, token);
    } else {
      console.error('Impossible d’envoyer l’email : email manquant pour l’utilisateur', user);
    }

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
