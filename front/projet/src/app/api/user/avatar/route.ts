import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { uploadAvatar, validateImageFile, deleteAvatar } from '@/lib/avatar';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt';

interface JWTPayload {
  userId: number;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Vérifier l'authentificationa
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    let decoded: JWTPayload;
    try {
      decoded = verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // 2. Récupérer le fichier depuis FormData
    const formData = await request.formData();
    const file = formData.get('avatar') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // 3. Valider le fichier
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 4. Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, avatarUrl: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    // 5. Supprimer l'ancien avatar s'il existe
    if (user.avatarUrl) {
      await deleteAvatar(user.avatarUrl);
    }

    // 6. Upload du nouveau fichier
    const uploadResult = await uploadAvatar(decoded.userId, file);

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error },
        { status: 500 }
      );
    }

    // 7. Mettre à jour la base de données
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatarUrl: uploadResult.url },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Avatar mis à jour avec succès',
      user: updatedUser
    });

  } catch (error) {
    console.error('Erreur API upload avatar:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Route pour supprimer l'avatar
export async function DELETE(request: NextRequest) {
  try {
    // 1. Vérifier l'authentification
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    let decoded: JWTPayload;
    try {
      decoded = verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // 2. Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, avatarUrl: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    // 3. Supprimer l'avatar
    if (user.avatarUrl) {
      await deleteAvatar(user.avatarUrl);
    }

    // 4. Mettre à jour la base de données
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatarUrl: null },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Avatar supprimé avec succès',
      user: updatedUser
    });

  } catch (error) {
    console.error('Erreur API delete avatar:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
