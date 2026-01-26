import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    // Force mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: "Mot de passe trop faible" },
        { status: 400 }
      );
    }

    // Vérifie si utilisateur existe déjà
    const exists = await prisma.user.findUnique({
      where: { username },
    });
    if (exists) {
      return NextResponse.json(
        { error: "Nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    // Hash du mot de passe et création utilisateur
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { username, password: hashed },
    });

    return NextResponse.json({ message: "Utilisateur créé !" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
