// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { Role } from "../generated/prisma";
// import { auth } from "../lib/auth";
// import { fromNodeHeaders } from "better-auth/node";


// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         role: Role;
//       };
//     }
//   }
// }

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// export  const  authMiddleware = (allowedRoles: Role[] = []) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     const session = await auth.api.getSession({
//       headers:fromNodeHeaders(req.headers),
//     })

//     if (!authHeader) {
//       return res.status(401).json({
//         error: "Unauthorized: No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         error: "Unauthorized: Invalid token format",
//       });
//     }

//     try {
//       const decoded: any = jwt.verify(token, JWT_SECRET);

//       // console.log("Decoded token:", decoded);

//       req.user = {
//         id: decoded.id, 
//         role: decoded.role,
//       };

//       if (
//         allowedRoles.length &&
//         !allowedRoles.includes(req.user.role)
//       ) {
//         return res.status(403).json({
//           error: "Forbidden: Access denied",
//         });
//       }

//       next();
//     } catch {
//       return res.status(401).json({
//         error: "Unauthorized: Invalid token",
//       });
//     }
//   };
// };



import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getAuth } from "../lib/auth.js"; // ✅ auth এর বদলে getAuth
import { fromNodeHeaders } from "better-auth/node";
import { Role } from "../generated/prisma/index.js";

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

// ✅ JWT based middleware — আগের মতোই
export const authMiddleware = (allowedRoles: Role[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized: Invalid token format" });
      return;
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        res.status(403).json({ error: "Forbidden: Access denied" });
        return;
      }

      next();
    } catch {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
};

// ✅ Better Auth session based middleware
export const sessionMiddleware = (allowedRoles: Role[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await getAuth(); 
      
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        res.status(401).json({ error: "Unauthorized: No session found" });
        return;
      }

      req.user = {
        id: session.user.id,
        role: (session.user as any).role ?? Role.CUSTOMER,
      };

      if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        res.status(403).json({ error: "Forbidden: Access denied" });
        return;
      }

      next();
    } catch {
      res.status(401).json({ error: "Unauthorized: Invalid session" });
    }
  };
};