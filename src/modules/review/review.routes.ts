import { Router } from "express";
import reviewController from "./review.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/index.js";


const router = Router();
router.get("/", reviewController.getByMedicine);

router.post(
  "/",
  authMiddleware([Role.CUSTOMER]), reviewController.create
);

router.patch(
  "/:id", authMiddleware([Role.ADMIN]), reviewController.updateStatus
);


export const reviewRoutes = router;
