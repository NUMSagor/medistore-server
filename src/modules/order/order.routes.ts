import { Router } from "express";
import orderController from "./order.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Role } from "../../generated/prisma/index.js";


const router = Router();

// ADMIN
router.get("/admin/all", authMiddleware([Role.ADMIN]), orderController.getAll);


// seller routes 
router.get("/seller", authMiddleware([Role.SELLER]), orderController.getSellerOrders);
router.patch("/seller/:id", authMiddleware([Role.SELLER]), orderController.updateOrderStatus);

//customer routes
router.post("/", authMiddleware([Role.CUSTOMER]), orderController.create);
router.get("/", authMiddleware([Role.CUSTOMER]), orderController.getMyOrders);

// customer dynamic route 
router.get("/:id", authMiddleware([Role.CUSTOMER]), orderController.getOrderById);



export const orderRoutes = router;
