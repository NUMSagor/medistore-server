import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (allowedRoles: Role[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: Invalid token format",
      });
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      // console.log("Decoded token:", decoded);

      req.user = {
        id: decoded.id, 
        role: decoded.role,
      };

      if (
        allowedRoles.length &&
        !allowedRoles.includes(req.user.role)
      ) {
        return res.status(403).json({
          error: "Forbidden: Access denied",
        });
      }

      next();
    } catch {
      return res.status(401).json({
        error: "Unauthorized: Invalid token",
      });
    }
  };
};