import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const users: { username: string; password: string }[] = [];

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

    const exists = users.find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    if (exists) {
      return NextResponse.json(
        { error: "Nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    users.push({ username, password: hashed });

    return NextResponse.json({ message: "Utilisateur créé !" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
