import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const featured = formData.get("featured") === "true";
    const thumbnail = formData.get("thumbnail") as string; // URL Cloudinary
    const video = formData.get("video") as string;         // URL Cloudinary

    if (!title || !description || !category || !thumbnail || !video) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const created = await prisma.videoContent.create({
      data: {
        title,
        description,
        category,
        featured,
        thumbnail,
        video,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Erreur /api/admin/publish :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
