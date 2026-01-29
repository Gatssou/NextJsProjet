import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET";

export async function POST(req: NextRequest) {
  try {
    console.log("SIGNUP: body reçu");
    const { username, password, email } = await req.json(); // ✅ Ajout email
    console.log("SIGNUP: username=", username, "email=", email);

    // Vérification champs obligatoires
    if (!username || !password || !email) {
      console.log("SIGNUP: champs manquants");
      return NextResponse.json(
        { error: "Tous les champs sont requis (username, password, email)" },
        { status: 400 }
      );
    }

    // Vérifier si username ou email existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      console.log("SIGNUP: utilisateur existe déjà");
      return NextResponse.json(
        { error: "Ce nom d'utilisateur ou cet email existe déjà" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("SIGNUP: mot de passe hashé");

    // Création user en base
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, email },
    });

    // Génération JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: "7d",
    });

    console.log("SIGNUP: utilisateur créé", user);

    return NextResponse.json({
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
