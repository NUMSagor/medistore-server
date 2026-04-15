import { Router } from "express";
import categoryController from "./category.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/index.js";


const router = Router();

// PUBLIC
router.get("/", categoryController.getAll);

// ADMIN
router.post("/", authMiddleware([Role.ADMIN]), categoryController.create);
router.patch("/:id", authMiddleware([Role.ADMIN]), categoryController.update);
router.delete("/:id", authMiddleware([Role.ADMIN]), categoryController.delete);

export const categoryRoutes = router;
