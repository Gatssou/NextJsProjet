import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET";

export async function GET() {
  // ⬇️ cookies() EST ASYNC → await obligatoire
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return NextResponse.json({
      authenticated: true,
      user: decoded,
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
