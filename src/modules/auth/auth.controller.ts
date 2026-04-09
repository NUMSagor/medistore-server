import { Request, Response } from "express";
import { authService } from "./auth.service";
import { prisma } from "../../lib/prisma";


const authController = {
  register: async (req: Request, res: Response) => {
    try {

      const { name, email, phone, password, role } = req.body;
      const result = await authService.register({ name, email, phone, password, role });
      res.status(201).json(result);

    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  },

  // me: async (req: Request, res: Response) => {
  //   const { name, role } = req.body;
  //   res.status(200).json({ name, role });
  // },

  //  me: async (req: Request, res: Response) => {
  //    if (!req.user) {
  //      return res.status(401).json({ error: "Unauthorized" });
  //    }

  //    const { userId,name, role } = req.user;
  //    res.status(200).json({ userId,name, role });
  //  },

  // me: async (req: Request, res: Response) => 
  //   { res.status(200).json(req.user); },

 me: async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req.user as any).id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
    if (!user) return res.status(401).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
},
};


export default authController;
