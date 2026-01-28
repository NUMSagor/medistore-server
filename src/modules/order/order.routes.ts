import { Router } from "express";
import orderController from "./order.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


// CUSTOMER routes
router.post("/", authMiddleware([Role.CUSTOMER]), orderController.create);
router.get("/", authMiddleware([Role.CUSTOMER]), orderController.getMyOrders);

// SELLER routes 
router.get("/seller", authMiddleware([Role.SELLER]), orderController.getSellerOrders);
router.patch("/seller/:id", authMiddleware([Role.SELLER]), orderController.updateOrderStatus);

// CUSTOMER dynamic route LAST
router.get("/:id", authMiddleware([Role.CUSTOMER]), orderController.getOrderById);


export const orderRoutes = router;
