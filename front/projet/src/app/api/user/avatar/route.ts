// src/app/api/user/avatar/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { uploadAvatar, validateImageFile, deleteAvatar } from '@/lib/avatar';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt';
const AUTH_COOKIE = 'token';

interface JWTPayload {
  id: number;
  username?: string;
}

// ------------------------
// Helper : JSON safe
function safeJson(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

// ------------------------
// Helper : récupérer l'utilisateur
async function getAuthenticatedUser(req: NextRequest) {
  try {
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    if (!token) return null;
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ------------------------
// POST : upload avatar
export async function POST(req: NextRequest) {
  const decoded = await getAuthenticatedUser(req);
  if (!decoded) return safeJson({ error: 'Non authentifié' }, 401);

  try {
    const formData = await req.formData();
    const file = formData.get('avatar') as File | null;
    if (!file) return safeJson({ error: 'Aucun fichier fourni' }, 400);

    const validation = validateImageFile(file);
    if (!validation.valid) return safeJson({ error: validation.error }, 400);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, avatarUrl: true }
    });
    if (!user) return safeJson({ error: 'Utilisateur introuvable' }, 404);

    // Supprimer l'ancien avatar si existe
    if (user.avatarUrl) await deleteAvatar(user.avatarUrl);

    // Upload nouveau avatar
    const uploadResult = await uploadAvatar(decoded.id, file);
    if (!uploadResult.success) return safeJson({ error: uploadResult.error }, 500);

    // Mettre à jour DB
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { avatarUrl: uploadResult.url },
      select: { id: true, username: true, email: true, avatarUrl: true, createdAt: true }
    });

    return safeJson({
      success: true,
      message: 'Avatar mis à jour avec succès',
      user: updatedUser
    });
  } catch (err) {
    console.error('Erreur POST avatar:', err);
    return safeJson({ error: 'Erreur serveur' }, 500);
  }
}

// ------------------------
// DELETE : supprimer avatar
export async function DELETE(req: NextRequest) {
  const decoded = await getAuthenticatedUser(req);
  if (!decoded) return safeJson({ error: 'Non authentifié' }, 401);

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, avatarUrl: true }
    });
    if (!user) return safeJson({ error: 'Utilisateur introuvable' }, 404);

    if (user.avatarUrl) await deleteAvatar(user.avatarUrl);

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { avatarUrl: null },
      select: { id: true, username: true, email: true, avatarUrl: true, createdAt: true }
    });

    return safeJson({
      success: true,
      message: 'Avatar supprimé avec succès',
      user: updatedUser
    });
  } catch (err) {
    console.error('Erreur DELETE avatar:', err);
    return safeJson({ error: 'Erreur serveur' }, 500);
  }
}
