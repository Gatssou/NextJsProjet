import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("TEST DB: process.env.DATABASE_URL =", process.env.DATABASE_URL);
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (err) {
    console.error("TEST DB ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}