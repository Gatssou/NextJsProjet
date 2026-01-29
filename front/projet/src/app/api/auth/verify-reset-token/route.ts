import { NextRequest, NextResponse } from 'next/server';
import { verifyResetToken } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'Token manquant' },
        { status: 400 }
      );
    }

    const result = await verifyResetToken(token);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur verify-token:', error);
    return NextResponse.json(
      { valid: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}