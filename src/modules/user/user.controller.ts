import { Request, Response } from "express";
import userService from "./user.service";

const userController = {
    // GET /api/admin/users
    getAllUsers: async (_req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },

    // PATCH /api/admin/users/:id
    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: "User ID is required" });
                return;
            }
            if (Array.isArray(id)) {
                res.status(400).json({ error: "Invalid User ID format" });
                return;
            }
            const { status, role } = req.body;
            const updatedUser = await userService.updateUser(id, { status, role });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    },
};

export default userController;
