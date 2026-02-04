// src/app/api/user/avatar/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { uploadAvatar, validateImageFile, deleteAvatar } from '@/lib/avatar';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt';
const AUTH_COOKIE = 'token'; // même cookie partout

interface JWTPayload {
  id: number;
  username: string;
}

// ------------------------
// Helper pour récupérer l'utilisateur authentifié
async function getAuthUser(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ------------------------
// Upload d'avatar
export async function POST(request: NextRequest) {
  const decoded = await getAuthUser(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Récupérer le fichier
    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;
    if (!file) return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });

    // Valider le fichier
    const validation = validateImageFile(file);
    if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, avatarUrl: true }
    });
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });

    // Supprimer ancien avatar si existant
    if (user.avatarUrl) await deleteAvatar(user.avatarUrl);

    // Upload nouveau avatar
    const uploadResult = await uploadAvatar(decoded.id, file);
    if (!uploadResult.success) return NextResponse.json({ error: uploadResult.error }, { status: 500 });

    // Update DB
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { avatarUrl: uploadResult.url },
      select: { id: true, username: true, email: true, avatarUrl: true, createdAt: true }
    });

    return NextResponse.json({ success: true, message: 'Avatar mis à jour', user: updatedUser });
  } catch (error) {
    console.error('Erreur API upload avatar:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ------------------------
// Supprimer avatar
export async function DELETE(request: NextRequest) {
  const decoded = await getAuthUser(request);
  if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, avatarUrl: true }
    });
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });

    if (user.avatarUrl) await deleteAvatar(user.avatarUrl);

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { avatarUrl: null },
      select: { id: true, username: true, email: true, avatarUrl: true, createdAt: true }
    });

    return NextResponse.json({ success: true, message: 'Avatar supprimé', user: updatedUser });
  } catch (error) {
    console.error('Erreur API delete avatar:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
