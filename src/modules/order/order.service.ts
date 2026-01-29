import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../generated/prisma/enums";

interface OrderItemInput {
    medicineId: string;
    quantity: number;
}

interface OrderInput {
    customerId: string;
    items: OrderItemInput[];
    shippingAddress: string;
}

const orderService = {
    create: async (data: OrderInput) => {
        // calculate total price
        let totalPrice = 0;
        const itemsData = await Promise.all(
            data.items.map(async (item) => {
                const medicine = await prisma.medicine.findUnique({ where: { id: item.medicineId } });
                if (!medicine) throw new Error("Medicine not found");
                if (medicine.stock < item.quantity) throw new Error(`Not enough stock for ${medicine.name}`);
                totalPrice += medicine.price * item.quantity;
                return {
                    medicineId: item.medicineId,
                    quantity: item.quantity,
                    price: medicine.price,
                };
            })
        );

        // create order

        const order = await prisma.order.create({
            data: {
                customerId: data.customerId,
                shippingAddress: data.shippingAddress,
                items: { create: itemsData },
            },
            include: {
                customer: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        medicine: true,
                    },
                },
            },
        });

        await Promise.all(
            itemsData.map((item) =>
                prisma.medicine.update({
                    where: { id: item.medicineId },
                    data: { stock: { decrement: item.quantity } },
                })
            )
        );

        return order;
    },

    getByCustomer: async (customerId: string) => {
        return prisma.order.findMany({
            where: { customerId },
            include: { items: { include: { medicine: true } } },
            orderBy: { createdAt: "desc" },
        });
    },

    getById: async (orderId: string, customerId: string) => {
        return prisma.order.findFirst({
            where: { id: orderId, customerId },
            include: { items: { include: { medicine: true } } },
        });
    },

    getBySeller: async (sellerId: string) => {
        return prisma.order.findMany({
            where: {
                items: { some: { medicine: { sellerId } } },
            },
            include: {
                items: {
                    include: {
                        medicine: {
                            include: {
                                seller: { select: { name: true } }, // ✅ include seller name
                            },
                        },
                    },
                },
                customer: true,
            },
            orderBy: { createdAt: "desc" },
        });
    },

    updateStatus: async (orderId: string, status: OrderStatus) => {
        return prisma.order.update({
            where: { id: orderId },
            data: { status },
            include: { items: { include: { medicine: true } }, customer: true },
        });
    },
};

export default orderService;
