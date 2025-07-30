import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin2@reporter.com";
  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (existing) {
    console.log("✅ Admin déjà existant :", existing.email);
    return;
  }

  const password = await bcrypt.hash("supermotdepasse", 10);
  const admin = await prisma.adminUser.create({
    data: {
      email,
      name: "Super Admin",
      password,
    },
  });

  console.log("✅ Admin créé :", admin);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
