
import { Role } from "../../../generated/prisma/enums";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";




const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authService = {
    register: async ({ name, email, password, role }: { name: string; email: string; password: string; role: Role }) => {
        
        // Only allow CUSTOMER or SELLER to sign up manually

        if (![Role.CUSTOMER, Role.SELLER].includes(role as typeof Role.CUSTOMER | typeof Role.SELLER)) {
            throw new Error("Invalid role for signup");
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role, status: "ACTIVE" },
        });

        const token = jwt.sign({ userId: user.id,name: user.name, role: user.role }, JWT_SECRET, { expiresIn: "20d" });
        return { user, token };
    },

    login: async ({ email, password }: { email: string; password: string }) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid credentials");

        const token = jwt.sign({ userId: user.id, name:user.name, role: user.role }, JWT_SECRET, { expiresIn: "20d" });
        return { user, token };
    },

    verifyToken: (token: string) => {
        return jwt.verify(token, JWT_SECRET);
    },
};
