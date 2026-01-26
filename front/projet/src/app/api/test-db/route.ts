import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("DB TEST ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
