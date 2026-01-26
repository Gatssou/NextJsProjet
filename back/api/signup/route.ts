import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

let users: { username: string; password: string }[] = []; // Remplacer par DB en prod

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Champs requis" }, { status: 400 });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      { error: "Mot de passe trop faible : min 8 caractères, 1 majuscule, 1 chiffre" },
      { status: 400 }
    );
  }

  const userExists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (userExists) {
    return NextResponse.json({ error: "Nom d'utilisateur déjà utilisé." }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  users.push({ username, password: hashed });

  return NextResponse.json({ message: "Utilisateur créé !" });
}
