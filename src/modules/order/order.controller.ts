import { Request, Response } from "express";
import orderService from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";


const orderController = {
    //  create new order by customer
    create: async (req: Request, res: Response) => {
        try {
            const customerId = req.user?.userId;
            const { items, shippingAddress } = req.body;

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: "Order items are required" });
            }
            if (!shippingAddress) return res.status(400).json({ error: "Shipping address is required" });

            const order = await orderService.create({ customerId, items, shippingAddress });
            res.status(201).json(order);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // get all orders of logged-in customer
    getMyOrders: async (req: Request, res: Response) => {
        try {
            const customerId = req.user?.userId;
            const orders = await orderService.getByCustomer(customerId);
            res.status(200).json(orders);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // get order by ID-customer
    getOrderById: async (req: Request, res: Response) => {
        try {
            const customerId = req.user?.userId;
            const orderId = req.params.id;
            if (!orderId || typeof orderId !== "string") {
                return res.status(400).json({ error: "Order ID is required" });
            }
            const order = await orderService.getById(orderId, customerId);
            if (!order) return res.status(404).json({ error: "Order not found" });
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },


getSellerOrders: async (req: Request, res: Response) => {
  try {
    const sellerId = req.user?.userId;
    const orders = await orderService.getBySeller(sellerId);
    const result = orders.map(order => ({
      ...order,
      sellerName: order.items[0]?.medicine?.seller?.name || null,
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
},




    // SELLER: update order status
    updateOrderStatus: async (req: Request, res: Response) => {
        try {
            const orderId = req.params.id;
            const { status } = req.body;

            if (!orderId || typeof orderId !== "string") {
                return res.status(400).json({ error: "Order ID is required" });
            }
            if (!status || !(status in OrderStatus)) {
                return res.status(400).json({ error: "Invalid order status" });
            }

            const order = await orderService.updateStatus(orderId, status as OrderStatus);
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },
};

export default orderController;
