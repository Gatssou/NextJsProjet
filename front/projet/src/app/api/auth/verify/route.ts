import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Assure-toi que prisma est bien importé

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    // 1️⃣ Vérifier et décoder le token
    const decoded: any = jwt.verify(token, SECRET);

    // 2️⃣ Récupérer l'utilisateur complet dans la DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }, // ou decoded.userId selon ton payload
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true, // <- important pour ton problème d'avatar
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 404 });
    }

    // 3️⃣ Retourner les infos utilisateur
    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (err) {
    console.error("Erreur verify auth:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
