import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (allowedRoles: Role[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
        

        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ error: "Unauthorized" });



        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);
            if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ error: "Forbidden" });
            }
            req.user = decoded;
            next();
        } catch {
            res.status(401).json({ error: "Invalid token" });
        }
    };
};
