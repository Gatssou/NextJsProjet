import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Champs requis" },
        { status: 400 }
      );
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: "Mot de passe trop faible" },
        { status: 400 }
      );
    }

    // 🔍 Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    // 🔐 Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // 💾 Création en base
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Utilisateur créé !" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
