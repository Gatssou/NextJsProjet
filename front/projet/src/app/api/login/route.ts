import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET";
let users: { username: string; password: string }[] = [];

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });

  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: "1h" });

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}
