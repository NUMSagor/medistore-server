import { Router } from "express";
import medicineController from "./medicine.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/index.js";


const router = Router();

// PUBLIC routes
router.get("/", medicineController.getAll);
router.get("/:id", medicineController.getById);

// SELLER routes
router.post("/", authMiddleware([Role.SELLER, Role.ADMIN]), medicineController.create);
router.put("/:id", authMiddleware([Role.SELLER, Role.ADMIN]), medicineController.update);
router.delete("/:id", authMiddleware([Role.SELLER, Role.ADMIN]), medicineController.delete);

export const medicineRoutes = router;
