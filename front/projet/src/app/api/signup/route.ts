import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET";

export async function POST(req: NextRequest) {
  try {
    console.log("SIGNUP: DATABASE_URL =", process.env.DATABASE_URL);
    console.log("SIGNUP: body reçu");
    const { username, password } = await req.json();
    console.log("SIGNUP: username=", username);

    if (!username || !password) {
      console.log("SIGNUP: champs manquants");
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.log("SIGNUP: utilisateur existe déjà");
      return NextResponse.json(
        { error: "Ce nom d'utilisateur existe déjà" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("SIGNUP: mot de passe hashé");

    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: "7d",
    });

    console.log("SIGNUP: utilisateur créé", user);

    return NextResponse.json({ user: { id: user.id, username: user.username }, token });
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
  }
}
