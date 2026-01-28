import { prisma } from "../../lib/prisma";

export interface MedicineInput {
    name: string;
    genericName: string;
    manufacturer: string;
    description?: string;
    price?: number;
    discountPercent?: number;
    stock?: number;
    isActive?: boolean;
    categoryId?: string;
    sellerId: string;
}

const medicineService = {
    // CREATE
    create: async (data: MedicineInput) => {
        if (!data.sellerId) throw new Error("sellerId is required");
        if (!data.categoryId) throw new Error("categoryId is required");
        if (!data.name) throw new Error("name is required");
        if (data.price === undefined) throw new Error("price is required");
        if (data.stock === undefined) throw new Error("stock is required");

        return prisma.medicine.create({
            data: {
                name: data.name,
                genericName: data.genericName ?? "",
                manufacturer: data.manufacturer ?? "",
                description: data.description ?? "",
                price: data.price,
                discountPercent: data.discountPercent ?? 0,
                stock: data.stock,
                isActive: data.isActive ?? true,
                categoryId: data.categoryId,
                sellerId: data.sellerId!, 
            },
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
        });
    },

    // GET ALL
    getAll: async (filters?: { categoryId?: string; minPrice?: number; maxPrice?: number }) => {
        return prisma.medicine.findMany({
            where: {
                isActive: true,
                ...(filters?.categoryId && { categoryId: filters.categoryId }),
                ...(filters?.minPrice && { price: { gte: filters.minPrice } }),
                ...(filters?.maxPrice && { price: { lte: filters.maxPrice } }),
            },
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: "desc" },
        });
    },

    // GET BY ID
    getById: async (id: string) => {
        return prisma.medicine.findUnique({
            where: { id },
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
        });
    },

    // UPDATE
    update: async (id: string, sellerId: string, data: Partial<MedicineInput>) => {
        const existing = await prisma.medicine.findUnique({ where: { id } });
        if (!existing) throw new Error("Medicine not found");
        if (existing.sellerId !== sellerId) throw new Error("Unauthorized");

        return prisma.medicine.update({
            where: { id },
            data,
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
        });
    },

    // DELETE
    delete: async (id: string, sellerId: string) => {
        const existing = await prisma.medicine.findUnique({ where: { id } });
        if (!existing) throw new Error("Medicine not found");
        if (existing.sellerId !== sellerId) throw new Error("Unauthorized");

        return prisma.medicine.delete({
            where: { id },
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
        });
    },
};

export default medicineService;
