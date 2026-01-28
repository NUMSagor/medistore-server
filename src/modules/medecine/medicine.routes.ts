import { Router } from "express";
import medicineController from "./medicine.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// PUBLIC routes
router.get("/", medicineController.getAll);
router.get("/:id", medicineController.getById);

// SELLER routes
router.post("/", authMiddleware([Role.SELLER]), medicineController.create);
router.put("/:id", authMiddleware([Role.SELLER]), medicineController.update);
router.delete("/:id", authMiddleware([Role.SELLER]), medicineController.delete);

export const medicineRoutes = router;
