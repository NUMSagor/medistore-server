import { Router } from "express";
import userController from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";



const router = Router();

// Admin-only routes
router.get("/", authMiddleware([Role.ADMIN]), userController.getAllUsers);
router.patch("/:id", authMiddleware([Role.ADMIN]), userController.updateUser);

export const userRoutes = router;
