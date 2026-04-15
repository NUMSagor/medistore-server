import { Router } from "express";
import userController from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/index.js";




const router = Router();

// ── Customer/Seller self-service routes ─────
router.patch('/profile', authMiddleware([Role.ADMIN, Role.SELLER, Role.CUSTOMER]), userController.updateProfile);
router.patch('/password', authMiddleware([Role.ADMIN, Role.SELLER, Role.CUSTOMER]), userController.updatePassword);



// Admin-only routes
router.get("/", authMiddleware([Role.ADMIN]), userController.getAllUsers);
router.patch("/:id", authMiddleware([Role.ADMIN]), userController.updateUser);


export const userRoutes = router;
