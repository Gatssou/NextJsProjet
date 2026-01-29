import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const TOKEN_EXPIRY_MINUTES = 30;

/**
 * Génère un token de réinitialisation sécurisé
 */
export async function generateResetToken(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  
  await prisma.passwordResetToken.updateMany({
    where: { 
      userId,
      used: false 
    },
    data: { used: true }
  });

  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_MINUTES * 60 * 1000);
  
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    }
  });

  return token;
}

/**
 * Vérifie la validité d'un token
 */
export async function verifyResetToken(token: string): Promise<{ 
  valid: boolean; 
  userId?: number; // ⬅️ ATTENTION : doit être number
  error?: string 
}> {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!resetToken) {
    return { valid: false, error: 'Token invalide' };
  }

  if (resetToken.used) {
    return { valid: false, error: 'Token déjà utilisé' };
  }

  if (new Date() > resetToken.expiresAt) {
    return { valid: false, error: 'Token expiré' };
  }

  return { valid: true, userId: resetToken.userId };
}

/**
 * Marque un token comme utilisé
 */
export async function invalidateResetToken(token: string): Promise<void> {
  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true }
  });
}