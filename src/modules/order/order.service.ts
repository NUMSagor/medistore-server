import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../generated/prisma";

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

        return await prisma.$transaction(async (tx) => {
            const itemsData = [];


            for (const item of data.items) {
                const medicine = await tx.medicine.findUnique({
                    where: { id: item.medicineId }
                });

                if (!medicine) throw new Error(`Medicine with ID ${item.medicineId} not found`);
                if (medicine.stock < item.quantity) {
                    throw new Error(`Not enough stock for ${medicine.name}. Available: ${medicine.stock}`);
                }


                await tx.medicine.update({
                    where: { id: item.medicineId },
                    data: { stock: { decrement: item.quantity } },
                });

                itemsData.push({
                    medicineId: item.medicineId,
                    quantity: item.quantity,
                    price: medicine.price,
                });
            }


            return await tx.order.create({
                data: {
                    customerId: data.customerId,
                    shippingAddress: data.shippingAddress,
                    items: {
                        create: itemsData,
                    },
                },
                include: {
                    customer: {
                        select: { name: true, email: true },
                    },
                    items: {
                        include: { medicine: true },
                    },
                },
            });
        });
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
                                seller: { select: { name: true } },
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

