// src/app/api/signup/route.ts
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Vérifie que la variable JWT_SECRET existe
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.error("JWT_SECRET non défini !");
}

export async function POST(req: NextRequest) {
  try {
    // Récupération des données envoyées depuis le frontend
    const body = await req.json();
    console.log("BODY RECUE:", body);

    const { username, password } = body;

    if (!username || !password) {
      console.warn("Champs manquants");
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.warn("Utilisateur existant:", username);
      return NextResponse.json(
        { error: "Ce nom d'utilisateur existe déjà" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    console.log("Utilisateur créé:", user);

    // Création du token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);

    // Vérification des erreurs Prisma
    if (err.code) {
      console.error("Erreur Prisma Code:", err.code);
    }

    return NextResponse.json(
      { error: "Erreur lors de l'inscription. Vérifie les logs serveur." },
      { status: 500 }
    );
  }
}
