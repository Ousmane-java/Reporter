import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const featured = formData.get("featured") === "true";
    const thumbnail = formData.get("thumbnail") as string;
    const video = formData.get("video") as string;

    if (!title || !description || !category || !thumbnail || !video) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const content = await prisma.videoContent.create({
      data: {
        title,
        description,
        category,
        featured,
        thumbnail,
        video,
      },
    });

    return NextResponse.json(content, { status: 201 });
  } catch (err) {
    console.error("❌ Erreur API /publish :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
