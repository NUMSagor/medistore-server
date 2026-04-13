import { Request, Response } from "express";
import medicineService, { MedicineInput } from "./medicine.service";

const medicineController = {
    // CREATE
    create: async (req: Request, res: Response) => {
        try {
            const sellerId = req.user?.id;
            const data: MedicineInput = { ...req.body, sellerId };
            const medicine = await medicineService.create(data);
            res.status(201).json(medicine);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // GET ALL
    // getAll: async (req: Request, res: Response) => {
    //     try {
    //         const { categoryId, minPrice, maxPrice } = req.query;
    //         const filters = {
    //             ...(categoryId && { categoryId: categoryId as string }),
    //             ...(minPrice && { minPrice: Number(minPrice) }),
    //             ...(maxPrice && { maxPrice: Number(maxPrice) }),
    //         };
    //         const medicines = await medicineService.getAll(filters);
    //         res.status(200).json(medicines);
    //     } catch (err) {
    //         res.status(400).json({ error: (err as Error).message });
    //     }
    // },
    getAll: async (req: Request, res: Response) => {
        try {
            const { categoryId, minPrice, maxPrice, search, sort } = req.query;
            const filters = {
                ...(categoryId && { categoryId: categoryId as string }),
                ...(minPrice && { minPrice: Number(minPrice) }),
                ...(maxPrice && { maxPrice: Number(maxPrice) }),
                ...(search && { search: search as string }),
                ...(sort && { sort: sort as string }),
            };
            const medicines = await medicineService.getAll(filters);
            res.status(200).json(medicines);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },


    // GET BY ID
    getById: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!id) return res.status(400).json({ error: "Invalid medicine ID" });
            const medicine = await medicineService.getById(id);
            if (!medicine) return res.status(404).json({ error: "Medicine not found" });
            res.status(200).json(medicine);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // UPDATE
    // update: async (req: Request, res: Response) => {
    //     try {
    //         const id = req.params.id as string;
    //         if (!id) return res.status(400).json({ error: "Invalid medicine ID" });
    //         const sellerId = req.user?.id;
    //         const medicine = await medicineService.update(id, sellerId as string, req.body);
    //         res.status(200).json(medicine);
    //     } catch (err) {
    //         res.status(400).json({ error: (err as Error).message });
    //     }
    // },

    update: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!id) return res.status(400).json({ error: "Invalid medicine ID" });
            const sellerId = req.user?.id as string;
            const role = req.user?.role as string; // ← add
            const medicine = await medicineService.update(id, sellerId, role, req.body); // ← role pass
            res.status(200).json(medicine);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },


    // DELETE
    delete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            if (!id) return res.status(400).json({ error: "Invalid medicine ID" });
            const sellerId = req.user?.id;
            const medicine = await medicineService.delete(id, sellerId as string);
            res.status(200).json(medicine);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },
};

export default medicineController;
