import { Request, Response } from "express";
import { authService } from "./auth.service";


 const authController = {
  register: async (req: Request, res: Response) => {
    try {

      const { name, email, password, role } = req.body;
      const result = await authService.register({ name, email, password, role });
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

  me: async (req: Request, res: Response) => 
    { res.status(200).json(req.user); },

};


export default authController;