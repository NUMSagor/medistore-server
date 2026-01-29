import { Router } from "express";
import reviewController from "./review.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.get("/", reviewController.getByMedicine);

router.post(
  "/",
  authMiddleware([Role.CUSTOMER]),reviewController.create
);

router.patch(
  "/:id",authMiddleware([Role.ADMIN]),reviewController.updateStatus
);


export const reviewRoutes = router;
