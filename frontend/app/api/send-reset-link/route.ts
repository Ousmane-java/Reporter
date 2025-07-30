// ✅ app/api/send-reset-link/route.ts
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: "Email requis" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: "Si l'email existe, un lien a été envoyé." });

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 5 * 60 * 1000); // expire dans 5 minutes

    await prisma.passwordResetToken.create({ data: { email, token, expires } });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Reporter" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <p>Bonjour,</p>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Ce lien est valable pendant 5 minutes.</p>
      `,
    });

    return NextResponse.json({ message: "Lien de réinitialisation envoyé" });
  } catch (error) {
    console.error("❌ Erreur dans /api/send-reset-link :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
