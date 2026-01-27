import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (err) {
    console.error("TEST DB ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}