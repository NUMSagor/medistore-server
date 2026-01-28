import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";


async function seedAdmin() {
  try {
    const email = "smadmin@gmail.com";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("sagor123450", 10);

    await prisma.user.create({
      data: {
        name: "Sagor Mahmud",
        email,
        password: hashedPassword,
        role: Role.ADMIN,
        status: "ACTIVE",
      },
    });

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Admin seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
