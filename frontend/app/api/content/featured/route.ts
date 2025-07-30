import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const video = await prisma.videoContent.findFirst({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });

    if (!video) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(video);
  } catch (err) {
    console.error("Erreur dans /api/content/featured :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
