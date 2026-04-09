import { Request, Response } from "express";
import orderService from "./order.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const orderController = {

    create: async (req: Request, res: Response) => {
        try {

            if (!req.user) {
                return res.status(401).json({
                    error: "Unauthorized: User not found",
                });
            }

            const customerId = req.user.id;
            const { items, shippingAddress } = req.body;

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    error: "Order items are required",
                });
            }

            if (!shippingAddress) {
                return res.status(400).json({
                    error: "Shipping address is required",
                });
            }

            const order = await orderService.create({
                customerId,
                items,
                shippingAddress,
            });

            res.status(201).json(order);

        } catch (err) {
            res.status(400).json({
                error: (err as Error).message,
            });
        }
    },


    
    getMyOrders: async (req: Request, res: Response) => {
        try {

            if (!req.user) {
                return res.status(401).json({
                    error: "Unauthorized",
                });
            }

            const customerId = req.user.id;

            const orders = await orderService.getByCustomer(customerId);

            res.status(200).json(orders);

        } catch (err) {
            res.status(400).json({
                error: (err as Error).message,
            });
        }
    },



    getOrderById: async (req: Request, res: Response) => {
        try {

            if (!req.user) {
                return res.status(401).json({
                    error: "Unauthorized",
                });
            }

            const customerId = req.user.id;
            const orderId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

            if (!orderId) {
                return res.status(400).json({
                    error: "Order ID is required",
                });
            }

            const order = await orderService.getById(orderId, customerId);

            if (!order) {
                return res.status(404).json({
                    error: "Order not found",
                });
            }

            res.status(200).json(order);

        } catch (err) {
            res.status(400).json({
                error: (err as Error).message,
            });
        }
    },


    
    getSellerOrders: async (req: Request, res: Response) => {
        try {

            if (!req.user) {
                return res.status(401).json({
                    error: "Unauthorized",
                });
            }

            const sellerId = req.user.id;

            const orders = await orderService.getBySeller(sellerId);

            const result = orders.map(order => ({
                ...order,
                sellerName: order.items[0]?.medicine?.seller?.name || null,
            }));

            res.status(200).json(result);

        } catch (err) {
            res.status(400).json({
                error: (err as Error).message,
            });
        }
    },


   
    updateOrderStatus: async (req: Request, res: Response) => {
        try {

            const orderId = req.params.id as string;
            const { status } = req.body;

            if (!orderId) {
                return res.status(400).json({
                    error: "Order ID is required",
                });
            }

            if (!status || !(status in OrderStatus)) {
                return res.status(400).json({
                    error: "Invalid order status",
                });
            }

            const order = await orderService.updateStatus(
                orderId,
                status as OrderStatus
            );

            res.status(200).json(order);

        } catch (err) {
            res.status(400).json({
                error: (err as Error).message,
            });
        }
    },
};

export default orderController;