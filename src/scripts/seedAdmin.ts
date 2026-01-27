
import { PrismaClient } from "@prisma/client/extension";
import { Role } from "../../generated/prisma/enums";


const prisma = new PrismaClient();


async function seedAdmin() {
    try {
        const adminData = {
            name: "Sagor Mahmud",
            email: "smadmin@gmail.com",
            role: Role.ADMIN,
            password: "sagor123450",
        };



        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: adminData.email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }


        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminData),
        });

        if (signUpAdmin.ok) {
            console.log("Admin is created ");

            // update email verification status
            await prisma.user.update({
                where: { email: adminData.email },
                data: { emailVerified: true },
            });

            console.log(" Email verification status updated!");

        } else {
            throw new Error("Failed to create admin");
        }

        console.log("******* SUCCESS *******");

    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin();

