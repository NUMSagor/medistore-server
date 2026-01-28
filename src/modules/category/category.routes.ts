import { Router } from "express";
import categoryController from "./category.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// PUBLIC
router.get("/", categoryController.getAll);

// ADMIN
router.post("/", authMiddleware([Role.ADMIN]), categoryController.create);
router.patch("/:id", authMiddleware([Role.ADMIN]), categoryController.update);
router.delete("/:id", authMiddleware([Role.ADMIN]), categoryController.delete);

export const categoryRoutes = router;
