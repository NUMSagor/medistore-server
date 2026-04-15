import { prisma } from "../../lib/prisma.js";

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
    imageUrl?: string;
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
                imageUrl: data.imageUrl ?? "",
            },
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
        });
    },


    // getAll: async (filters?: { categoryId?: string; minPrice?: number; maxPrice?: number }) => {
    //     const medicines = await prisma.medicine.findMany({
    //         where: {
    //             isActive: true,
    //             ...(filters?.categoryId && { categoryId: filters.categoryId }),
    //             ...(filters?.minPrice !== undefined && { price: { gte: filters.minPrice } }),
    //             ...(filters?.maxPrice !== undefined && { price: { lte: filters.maxPrice } }),
    //         },
    //         include: {
    //             category: true,
    //             seller: { select: { id: true, name: true } },
    //         },
    //         orderBy: { createdAt: "desc" },
    //     });

    //     return medicines; // return full array
    // },


    // GET BY ID


    getAll: async (filters?: {
        categoryId?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        sort?: string;
    }) => {
        return prisma.medicine.findMany({
            where: {
                isActive: true,
                ...(filters?.categoryId && { categoryId: filters.categoryId }),
                ...(filters?.minPrice !== undefined && { price: { gte: filters.minPrice } }),
                ...(filters?.maxPrice !== undefined && { price: { lte: filters.maxPrice } }),
                ...(filters?.search && {
                    OR: [
                        { name: { contains: filters.search, mode: "insensitive" } },
                        { genericName: { contains: filters.search, mode: "insensitive" } },
                    ],
                }),
            },
            include: {
                category: true,
                seller: { select: { id: true, name: true } },
            },
            orderBy:
                filters?.sort === "price_asc" ? { price: "asc" } :
                    filters?.sort === "price_desc" ? { price: "desc" } :
                        filters?.sort === "name_asc" ? { name: "asc" } :
                            filters?.sort === "newest" ? { createdAt: "desc" } :
                                { createdAt: "desc" },
        });
    },






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
    // update: async (id: string, sellerId: string, data: Partial<MedicineInput>) => {
    //     const existing = await prisma.medicine.findUnique({ where: { id } });
    //     if (!existing) throw new Error("Medicine not found");
    //     if (existing.sellerId !== sellerId) throw new Error("Unauthorized");

    //     return prisma.medicine.update({
    //         where: { id },
    //         data,
    //         include: {
    //             category: true,
    //             seller: { select: { id: true, name: true } },
    //         },
    //     });
    // },


    update: async (id: string, sellerId: string, role: string, data: Partial<MedicineInput>) => {
        const existing = await prisma.medicine.findUnique({ where: { id } });
        if (!existing) throw new Error("Medicine not found");

        // Admin হলে ownership check skip
        if (role !== 'ADMIN' && existing.sellerId !== sellerId) {
            throw new Error("Unauthorized");
        }

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
