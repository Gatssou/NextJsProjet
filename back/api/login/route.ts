import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let users: { username: string; password: string }[] = []; // Doit être partagé ou DB
const SECRET = process.env.JWT_SECRET || "SUPER_SECRET";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });

  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: "1h" });

  const res = NextResponse.json({ message: "Connecté !" });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true, // HTTPS obligatoire sur Vercel
    sameSite: "lax",
    maxAge: 3600,
    path: "/"
  });
  return res;
}
