import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { verifyResetToken, invalidateResetToken } from '@/lib/tokens';

// Regex de validation mot de passe (même que ton signup)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    // Validations
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      return NextResponse.json(
        { error: 'Le mot de passe ne respecte pas les critères de sécurité' },
        { status: 400 }
      );
    }

    // Vérifie le token
    const verification = await verifyResetToken(token);
    
    if (!verification.valid || !verification.userId) {
      return NextResponse.json(
        { error: verification.error || 'Token invalide' },
        { status: 400 }
      );
    }

    // Hash le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update en base
    await prisma.user.update({
      where: { id: verification.userId },
      data: { password: hashedPassword }
    });

    // Invalide le token
    await invalidateResetToken(token);

    return NextResponse.json({
      message: 'Mot de passe réinitialisé avec succès'
    });

  } catch (error) {
    console.error('Erreur reset-password:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}