// src/app/api/signup/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// ⚡ Crée un client Prisma global pour éviter les problèmes en production
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validation basique
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Champs manquants" }),
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Nom d'utilisateur déjà pris" }),
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // ⚡ Log pour débug production
    console.log("Nouvel utilisateur créé :", newUser);

    return new Response(
      JSON.stringify({ user: { id: newUser.id, username: newUser.username } }),
      { status: 200 }
    );
  } catch (err: any) {
    // ⚡ Log complet pour voir l'erreur dans Vercel
    console.error("SIGNUP ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message || "Erreur serveur" }),
      { status: 500 }
    );
  }
}
