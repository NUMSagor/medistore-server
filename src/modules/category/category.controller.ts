import { Request, Response } from "express";
import categoryService from "./category.service";

const categoryController = {
    // POST /api/categories
    create: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: "Category name is required" });
            }

            const result = await categoryService.create(name);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // GET /api/categories
    getAll: async (_req: Request, res: Response) => {
        try {
            const result = await categoryService.getAll();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // PATCH /api/categories/:id
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ error: "Category ID is required" });
            }

            if (!name) {
                return res.status(400).json({ error: "Category name is required" });
            }

            const result = await categoryService.update(id, name);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // DELETE /api/categories/:id
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ error: "Category ID is required" });
            }

            const result = await categoryService.delete(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },
};

export default categoryController;
