import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password, newsletter } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json("Champs requis manquants", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json("Cet email est déjà utilisé", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        newsletter,
      },
    });

    return NextResponse.json("Utilisateur créé", { status: 201 });
  } catch (err) {
    console.error("Erreur registre:", err);
    return NextResponse.json("Erreur interne du serveur", { status: 500 });
  }
}
