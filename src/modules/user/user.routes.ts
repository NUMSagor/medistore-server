import { Router } from "express";
import userController from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../generated/prisma";



const router = Router();

// Admin-only routes
router.get("/", authMiddleware([Role.ADMIN]), userController.getAllUsers);
router.patch("/:id", authMiddleware([Role.ADMIN]), userController.updateUser);

// ── Customer/Seller self-service routes ─────
// router.patch('/profile',  authMiddleware([Role.ADMIN, Role.SELLER, Role.CUSTOMER]), userController.updateProfile);
// router.patch('/password', authMiddleware([Role.ADMIN, Role.SELLER, Role.CUSTOMER]), userController.updatePassword);

export const userRoutes = router;
